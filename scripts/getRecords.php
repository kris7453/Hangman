<?php

if( $_SERVER['REQUEST_METHOD'] == "POST" )
{
    include_once 'connectDb.php';
    
    //pobranie danych z 'posta' i rozkodowanie do notacji PHP
    //$content = file_get_contents("php://input");
    
    $mysqli->query("SET NAMES utf8");
    $mysqli->query("CHARACTER_SET utf8_unicode_ci");

    $query = "SELECT user_name, scores FROM scores_board ORDER BY scores DESC";
    $result = $mysqli->query( $query ); 
    
    if ( $result )
    {
        if ( $result->num_rows > 0 )
        {
            $records = array();
            while ( $row = $result->fetch_object() )
                array_push( $records, array( 'userName' => $row->user_name, 'scores' => $row->scores));
            echo json_encode( array( 'status' => 0, 'message' => $records ) );
        }
        else
            echo json_encode( array( 'status' => 1,'message'=> 'Brak haseł w bazie danych!') );
    }
    else 
        echo $mysqli->error;
    
    $mysqli->close();
}


?>