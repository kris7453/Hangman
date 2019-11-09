var Game = Game || {};

Game.specialLetters = ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ż', 'Ź' ];

Game.Player =
{
    chances: 10,
    scores: 0,
    win: false
};

// ----------------------------------------------------------------------------------

/*
*   Function save player record to database
*/
Game.saveRecord = function( playerName, scores)
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
            }
            catch(e)
            {
                alert("Problem z połączeniem do bazy danych\n" + xmlhttp.responseText);
            }
    };
    
    xmlhttp.open("POST", "./scripts/insertRecord.php", true);
    xmlhttp.send( JSON.stringify( { name: playerName.substr( 0, 20), scores: scores} ));
};

/*
*   Function restore saved session and return true or false if session doesn't exist
*/
Game.restoreSession = function()
{
    var game = JSON.parse( sessionStorage.getItem( "gameSession" ));
    if ( game != null )
    {
        if ( game.password.pass != "" )
        {
            $( "#content .letters").html( game.htmlLetters );
            $( "#content .password").html( game.htmlPassword );
            Game.Password.data = game.password;
            Game.Player = game.player;
            console.log("session restored");
            return true;
        }
        else
            alert("Wystąpił błąd podczas przywracania sesji!");
    }
    console.log("session not restored");
    return false;
};

/*
*   Function save actual session with html password content
*/
Game.saveSession = function()
{
    var game = 
    {
        htmlLetters: $( "#content .letters").html(),
        htmlPassword: $( "#content .password").html(),
        password: Game.Password.data,
        player: Game.Player
    }
    sessionStorage.setItem( "gameSession", JSON.stringify( game ));
    console.log("session saved");
};

/*
*   Function is called if player win ( password.passLetters.length == 0 )
*/
Game.win = function()
{
    this.Player.win = true;
    this.Player.scores += this.Player.chances;

    if ( !confirm( "Czy chcesz kontynuować grę?" ) )
    {
        var nick = prompt("Wpisz nazwę gracza to tabel wyników ( max 20 znaków ):","Anonymouse");
        if ( nick != null && nick != "" )
            Game.saveRecord( nick, Game.Player.scores);

        this.Player.scores = 0;
    }

    this.Player.chances = 10;
    this.Player.win = false;
    this.restartGame();
    this.Visual.setAnimationStep( -1 );
    
    console.log( "Congratulations you win with " + Game.Player.scores + " scores!");
};

/*
*   Function is called if player lose ( player.chances == 0 )
*/
Game.lose = function()
{
    console.log( "Sorry you lose " + Game.Player.scores + " scores!");
    var nick = prompt("Wpisz nazwę gracza to tabel wyników:","Anonymouse");
    if ( nick != "null" )
        Game.saveRecord( nick, Game.Player.scores);
};

/*
*   Function is called if letter choosen by player exist in password
*/
Game.correctLetter = function()
{
    if ( !Game.Password.data.passLetters.length )
        Game.win();

    console.log( "Correct letter!" );
};

/*
*   Function is called if letter choosen by player doesn't exist in password
*/
Game.incorrectLetter = function()
{
    Game.Player.chances--;
    Game.Visual.animationNextStep();
    
    if ( !Game.Player.chances )
        Game.lose();

    console.log( "Incorrect letter, you have " + Game.Player.chances + " chances!");
};

/*
*   Function restart game state
*/
Game.restartGame = function()
{
    Game.Visual.refreshLetterBar();
    Game.Password.getPassword();
};