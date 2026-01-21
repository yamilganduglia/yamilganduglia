<?php
// Grupo SITACO - Endpoint para guardar consultas
// Devuelve JSON: { ok: true } o { ok: false, message: "..." }

declare(strict_types=1);
header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/config.php";

function clean(string $v): string {
  $v = trim($v);
  // Evita guardar HTML
  return strip_tags($v);
}

$nombre   = isset($_POST["nombre"]) ? clean($_POST["nombre"]) : "";
$telefono = isset($_POST["telefono"]) ? clean($_POST["telefono"]) : "";
$email    = isset($_POST["email"]) ? clean($_POST["email"]) : "";
$servicio = isset($_POST["servicio"]) ? clean($_POST["servicio"]) : "";
$mensaje  = isset($_POST["mensaje"]) ? clean($_POST["mensaje"]) : "";
$consent  = isset($_POST["consent"]) ? $_POST["consent"] : null;

// Validaciones básicas (además de las del front)
if (mb_strlen($nombre) < 3) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Nombre inválido."]);
  exit;
}
if (mb_strlen($telefono) < 6) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Teléfono inválido."]);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Email inválido."]);
  exit;
}
if ($servicio === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Seleccioná un tipo de servicio."]);
  exit;
}
if (mb_strlen($mensaje) < 10) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Mensaje demasiado corto."]);
  exit;
}
if ($consent === null) {
  http_response_code(400);
  echo json_encode(["ok" => false, "message" => "Debés aceptar el consentimiento."]);
  exit;
}

try {
  $stmt = $pdo->prepare("
    INSERT INTO consultas (nombre, telefono, email, servicio, mensaje, user_agent, ip)
    VALUES (:nombre, :telefono, :email, :servicio, :mensaje, :ua, :ip)
  ");

  $ua = $_SERVER["HTTP_USER_AGENT"] ?? "";
  $ip = $_SERVER["REMOTE_ADDR"] ?? "";

  $stmt->execute([
    ":nombre" => $nombre,
    ":telefono" => $telefono,
    ":email" => $email,
    ":servicio" => $servicio,
    ":mensaje" => $mensaje,
    ":ua" => $ua,
    ":ip" => $ip,
  ]);

  echo json_encode(["ok" => true]);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["ok" => false, "message" => "No se pudo guardar la consulta."]);
}
