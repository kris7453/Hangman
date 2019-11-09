<?php

if( $_SERVER['REQUEST_METHOD'] == "POST" )
{
    include_once 'connectDb.php';
    
    //pobranie danych z 'posta' i rozkodowanie do notacji PHP
    //$content = file_get_contents("php://input");
    
    $mysqli->query("SET NAMES utf8");
    $mysqli->query("CHARACTER_SET utf8_unicode_ci");

    $query = "SELECT password FROM passwords order by rand() LIMIT 1";
    $result = $mysqli->query( $query ); 
    
    if ( $result )
    {
        if ( $result->num_rows > 0 )
        {
            $row = $result->fetch_object();
            echo json_encode( array( 'status' => 0, 'message' => $row->password ) );
        }
        else
            echo json_encode( array( 'status' => 1,'message'=> 'Brak haseł w bazie danych!') );
    }
    else 
        echo $mysqli->error;
    
    $mysqli->close();
}


?>