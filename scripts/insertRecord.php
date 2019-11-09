<?php

if( $_SERVER['REQUEST_METHOD'] == "POST" )
{
    include_once 'connectDb.php';
    
    //pobranie danych z 'posta' i rozkodowanie do notacji PHP
    $content = file_get_contents("php://input");
    $decoded = json_decode( $content );
    $name = $decoded->name.substr(0,20);

    $query = "INSERT INTO scores_board ( user_name, scores) VALUES ( '$name', $decoded->scores)";
    $result = $mysqli->query( $query ); 
    
    if ( $result )
         echo json_encode( array( 'status' => 0, 'message' => "Pomyślnie dodano rekord!" ) );
    else 
        echo $mysqli->error;
    
    $mysqli->close();
}
?>