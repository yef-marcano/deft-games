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
    $result = $conn->query("SELECT * FROM messages ORDER BY id DESC");
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

function sendMessage($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $sender = $data['sender'];
    $message = $conn->real_escape_string($data['message']);
    $sql = "INSERT INTO messages (sender, message) VALUES ('$sender', '$message')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("status" => 200, "message" => "Message sent successfully."));
    } else {
        echo json_encode(array("status" => 500, "message" => "Error sending message."));
    }
}

$conn->close();