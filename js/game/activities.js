var Game = Game || {};

/*
*   Function gets records from database and display in table
*/
loadScoresRecords = function()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) 
            try
            {			    	
                var response = JSON.parse( xmlhttp.responseText);

                if ( response.status == 0 )
                {
                    $( "#content #scoreBoard tbody").html("");
                    for ( var i = 0; i < response.message.length; i++)
                    {
                        $( "#content #scoreBoard tbody").append("<tr>\n<td>" + (i + 1) + "</td><td>" + response.message[i].userName + "</td><td>" + response.message[i].scores + "</td></tr>\n");
                    }
                }
            }
            catch(e)
            {
                alert("Problem z połączeniem do bazy danych\n" + xmlhttp.responseText);
            }
    };
    
    xmlhttp.open("POST", "./scripts/getRecords.php", true);
    xmlhttp.send();
};

/*
*   Function checked letters in password from clicked letter on letter bar form container
*/
$( document ).on( "ready",
    // function click must be delegatet, becouse this function works only for existing elements in document
    $( "body").on( "click", "#content .letters span", function()
    {
        if ( Game.Player.chances && !Game.Player.win )
        {
            var aCode = 'A'.charCodeAt( 0 );
            var latinLR = 'Z'.charCodeAt( 0 ) - aCode; // latin letters range
            var letterOffset = parseInt( $( this ).attr( "value" ) );
            
            if( letterOffset > latinLR )
                Game.Password.checkLetter( true, Game.specialLetters[ letterOffset - latinLR - 1 ]);
            else
                Game.Password.checkLetter( false, String.fromCharCode( aCode + letterOffset ));
        }
    })
);

$( window ).on( "ready", 
    $( window ).on( "keydown", function( event )
    {
        if ( location.hash == "#game" || location.hash == "")
        {
            event.preventDefault();
            
            if ( Game.Player.chances && !Game.Player.win )
            //event = event || window.event;
                if ( event.altKey && event.keyCode != 17 && event.keyCode != 18)
                    Game.Password.checkLetter( true, event.key.toUpperCase());
                //console.log(event.key.toUpperCase() +" = " + event.key.toUpperCase().charCodeAt(0));
                else if( event.keyCode >= 65 &&  event.keyCode <= 90 )
                    Game.Password.checkLetter( false, event.key.toUpperCase());
        }
    })
);

$( window ).on( "ready", 
    $( "#wrapper" ).on( "click", "a", function()
    {
        if ( !$( this ).children( "span" ).hasClass( "fa-gamepad" ) && ( location.hash == "#game" || location.hash == ""))
        {
            Game.Visual.clearAnimate();

            if (Game.Password.pass != "" )
               Game.saveSession();
        }

        if ( $( this ).children( "span" ).hasClass( "fa-refresh" ) )
        {
            Game.Player.scores = 0;
            Game.Player.chances = 10;
            Game.Player.win = false;

            if ( sessionStorage.getItem( "gameSession" ) != null )
                sessionStorage.removeItem( "gameSession" );

            Game.restartGame();

            if ( location.hash == "#game" || location.hash == "")
                Game.Visual.setAnimate(-1);
        }
    })
);

checkLocation = function( hashLocation )
{
    switch( hashLocation )
    {
        case "#game":       $("#content").load( "content/game.html", function()
                            {
                                if ( !Game.restoreSession() )
                                    Game.restartGame();

                                Game.Visual.setAnimate( 9 - Game.Player.chances );
                            });
                            break;
        
        case "#scoreboard": $( "#content" ).load( "content/scoreBoard.html", function()
                            {
                                loadScoresRecords();
                            });
                            break;

        case "#editor":     $( "#content" ).load( "content/editor.html",function()
                            {
                                Editor.loadPasswords();
                            });
                            break;

        default:            $("#content").load( "content/game.html", function()
                            {
                                if ( !Game.restoreSession() )
                                    Game.restartGame();

                                Game.Visual.setAnimate( 9 - Game.Player.chances );
                            });
                            break;
    }
};

$(window).on( "hashchange", function()
{
    checkLocation( location.hash );
});