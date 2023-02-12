<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli('localhost', 'root', '"#%56+1yyuRRt12345', 'deft-game');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getMessages($conn);
        break;
    case 'POST':
        sendMessage($conn);
        break;
    default:
        echo json_encode(array("status" => 404, "message" => "Invalid request method."));
        break;
}

function getMessages($conn) {
    $id_game = $_GET['id_game'];
    $result = $conn->query("SELECT * FROM messages WHERE id_sala = $id_game ORDER BY id DESC");
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

function sendMessage($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $sender = $data['sender'];
    $id_sala = $data['id_sala'];
    $message = $conn->real_escape_string($data['message']);
    $sql = "INSERT INTO messages (sender, message, id_sala) VALUES ('$sender', '$message', '$id_sala')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("status" => 200, "message" => "Message sent successfully."));
    } else {
        echo json_encode(array("status" => 500, "message" => "Error sending message."));
    }
}

$conn->close();