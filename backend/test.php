<?php
  $host_name = 'db5011482015.hosting-data.io';
  $database = 'dbs9687018';
  $user_name = 'dbu5479830';
  $password = '<Enter your password here.>';

  $link = new mysqli($host_name, $user_name, $password, $database);

  if ($link->connect_error) {
    die('<p>Failed to connect to MySQL: '. $link->connect_error .'</p>');
  } else {
    echo '<p>Connection to MySQL server successfully established.</p>';
  }
?>