<?php

if( $_SERVER['REQUEST_METHOD'] == "POST" )
{
    include_once 'connectDb.php';
    
    //pobranie danych z 'posta' i rozkodowanie do notacji PHP
    $content = file_get_contents("php://input");
    $decoded = json_decode( $content );

    $query = "DELETE FROM passwords WHERE id=$decoded->id";
    $result = $mysqli->query( $query ); 
    
    if ( $result )
         echo json_encode( array( 'status' => 0, 'message' => "Pomyślnie usunięto hasło!" ) );
    else 
        echo $mysqli->error;
    
    $mysqli->close();
}
?>