<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
die("Brak danych");
}

$ip = $data['ip'];
$os = $data['os'];
$resolution = $data['resolution'];
$time = $data['time'];
$visits = $data['visits'];

$logEntry = "IP: $ip | OS: $os | Rozdzielczość: $resolution | Czas: $time | Wejść: $visits\n";

file_put_contents('log.txt', $logEntry, FILE_APPEND);
}
?>