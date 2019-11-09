var Editor =
{
    /*
    *   Function gets passwords from database
    */
    loadPasswords: function()
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() 
        {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                try
                {			    	
                    var response = JSON.parse( xmlhttp.responseText);
                    if(response.status == 0)
                    {
                        var m = response.message;
                        $( "#content #passwords tbody").html("");
                        for ( var i = 0; i < response.message.length; i++)
                        {
                            $( "#content #passwords tbody").append( "<tr value='" + m[i].id + "'>\n<td>" + m[i].password + "</td><td><span class='fa fa-edit'></span></td><td><span class='fa fa-remove'></span></td></tr>\n");
                        }
                    }
                }
                catch(e)
                {
                    alert("Problem z połączeniem do bazy danych lub brak haseł w bazie\n" + xmlhttp.responseText);
                }
        };
        
        xmlhttp.open("POST", "./scripts/getPasswords.php", true);
        xmlhttp.send();
    },

    /*
    *   Function insert password to database
    */
    insertPassword: function()
    {
        if ( (inputPassword = $("#content div input").val().trim()) != "" )
        {
            /*
            *   Checking if password not contains other symbols than polish letters
            */
            if ( !(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/.test( inputPassword )) )
            {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() 
                {
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
                        try
                        {	
                            var response = JSON.parse( xmlhttp.responseText);
                            if(response.status == 0)
                                alert("Rekord dodany do bazy!");
                            else
                                alert( response.message );

                            Editor.loadPasswords();
                        }
                        catch(e)
                        {
                            alert("Problem z połączeniem do bazy danych\n" + xmlhttp.responseText);
                        }
                };
                
                xmlhttp.open("POST", "./scripts/insertPassword.php", true);
                xmlhttp.send( JSON.stringify( { password: inputPassword.substr( 0, 50)} ));
            }
            else
               alert("Hasło może zawierać tylko polskie znaki!");
        }
        else
            alert("Musisz wpisać hasło do odgadnięcia!");
    },

    /*
    *   Function delete password with given id from database
    */
    deletePassword: function( id )
    {
        if ( confirm( "Czy na pewno chcesz usunąć te hasło?" ))
        {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() 
            {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
                try
                {			    	
                    var response = JSON.parse( xmlhttp.responseText);
                    if(response.status == 0)
                    {
                        alert( response.message );

                        Editor.loadPasswords();
                    }
                    else
                    alert("Nie można usunąć hasła z bazy danych!");
                }
                catch(e)
                {
                    alert("Problem z połączeniem do bazy danych lub brak haseł w bazie\n" + xmlhttp.responseText);
                }
            };
            
            xmlhttp.open("POST", "./scripts/deletePassword.php", true);
            xmlhttp.send( JSON.stringify({id: id}));
        }
    },

    /*
    *   Function update password on database
    */
    updatePassword: function( id, password)
    {
        /*
        *   Checking if password not contains other symbols than polish letters
        */
        if ( (password = password.trim()) != "" )
        {
            if ( !(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/.test( password )) )
            {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() 
                {
                    if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
                        try
                        {			    	
                            var response = JSON.parse( xmlhttp.responseText);
                            if(response.status == 0)
                                alert("Hasło zaktualizowane!");
                            else
                                alert( response.message );

                            Editor.loadPasswords();
                        }
                        catch(e)
                        {
                            alert("Problem z połączeniem do bazy danych\n" + xmlhttp.responseText);
                        }
                };
                
                xmlhttp.open("POST", "./scripts/updatePassword.php", true);
                xmlhttp.send( JSON.stringify( { id: id,password: password.substr( 0, 50)} ));
            }
            else
                alert("Hasło może zawierać tylko polskie znaki!");
        }
        else
            alert("Musisz wpisać hasło do odgadnięcia!");
    }
};

$( document ).on( "ready", 
    $( "body").on( "click", "#content #addPassword", function()
    {
        Editor.insertPassword();
    })
);

$( document ).on( "ready", 
    $( "#wrapper" ).on( "click", "#passwords span", function()
    {
        if ( $( this ).hasClass("fa-edit"))
        {
            var password = prompt("Podaj nowe hasło (max 50 znaków):","Hasło");
            
            if ( password != null )
                Editor.updatePassword( $(this).parent().parent().attr('value'), password );
        }
        else if ( $( this ).hasClass("fa-remove"))
            Editor.deletePassword( $(this).parent().parent().attr('value') );
    })
);