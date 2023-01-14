<?php
  $host_name = 'localhost';
  $database = 'deft-game';
  $user_name = 'root';
  $password = '123456';

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    die('<p>Failed to connect to MySQL: '. $link->connect_error .'</p>');
  } else {
    echo '<p>Connection to MySQL server successfully established.</p>';
  }
?>