<?php

if( $_SERVER['REQUEST_METHOD'] == "POST" )
{
    
    //pobranie danych z 'posta' i rozkodowanie do notacji PHP
    $content = file_get_contents("php://input");
    $decoded = json_decode( $content );
    $pass = trim( $decoded->password).substr( 0, 50);
    
    if ( !preg_match("/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/", $pass) )
    {
        include_once 'connectDb.php';

        $mysqli->query("SET NAMES utf8");
        $mysqli->query("CHARACTER_SET utf8_unicode_ci");

        $query = "UPDATE passwords SET password='$pass' WHERE id=$decoded->id";
        $result = $mysqli->query( $query ); 
        
        if ( $result )
            echo json_encode( array( 'status' => 0, 'message' => "Pomyślnie zaktualizowano hasło!" ) );
        else 
            echo $mysqli->error;
        
        $mysqli->close();
    }
    else
        echo json_encode( array( 'status' => 1, 'message' => "Hasło może zawierać tylko polskie znaki!" ) );
}
?>