var Game = Game || {};

Game.Password =
{
    data:
    {
        pass: "",
        passLetters: [],
        used:
        {
            letters: [],
            specialLetters: []
        }
    },

    /*
    *   Function check if letter was used before and return true if was
    */
    letterUsed: function( special, letter )
    {
        var keyCode;
        
        if( !special )
        {
            keyCode = letter.charCodeAt( 0 ) - 'A'.charCodeAt( 0 );

            if ( !this.data.used.letters[ keyCode ] )
            {
                this.data.used.letters[ keyCode ] = true;
                $( "#content .letters [value='" + keyCode + "']").addClass( "used" );
                return false;
            }
        }
        else
        {
            switch ( letter )
            {
                case 'Ą': keyCode = 0; break;
                case 'Ć': keyCode = 1; break;
                case 'Ę': keyCode = 2; break;
                case 'Ł': keyCode = 3; break;
                case 'Ń': keyCode = 4; break;
                case 'Ó': keyCode = 5; break;
                case 'Ś': keyCode = 6; break;
                case 'Ż': keyCode = 7; break;
                case 'Ź': keyCode = 8; break;
            }
            
            if( !this.data.used.specialLetters[ keyCode ] )
            {
                this.data.used.specialLetters[ keyCode ] = true;
                $( "#content .letters [value='" + ( this.data.used.letters.length + keyCode ) + "']").addClass( "used" );
                return false;
            }
        }
        return true;
    },

    /*
    *   Function check if letter chosen by player exist in password letters or not and call
    *   equivalend function to state
    */
    checkLetter: function( special, letter)
    {
        if( !this.letterUsed( special, letter ) )
        {
            var letterExist = false;
            for ( var i = 0; i < this.data.passLetters.length; i++)
                if ( this.data.passLetters[ i ].toUpperCase() == letter)
                {
                    for ( var j = 0; j < this.data.pass.length; j++)
                    {
                        if( this.data.pass[ j ].toUpperCase() == letter)
                        $( "#content .password span." + j + "").html( this.data.pass[ j ] );
                    }
                    
                    this.data.passLetters.splice( i, 1);
                    letterExist = true;
                    break;
                }

            if ( letterExist )
                Game.correctLetter();
            else
                Game.incorrectLetter();
        }
    },

    /*
    *   Function refresh state of used letters in arrays
    */
    refreshUsed: function()
    {
        var azDifference = 'Z'.charCodeAt(0) - 'A'.charCodeAt(0);
        this.data.used.letters = new Array( azDifference + 1);
        this.data.used.letters.fill(false, 0, azDifference + 1);

        this.data.used.specialLetters = new Array(9);
        this.data.used.specialLetters.fill( false, 0, 9);
    },

    /*
    *   Function:
    *       generate mask of password with "_" sign for letters
    *       fill password.passLetters array with single letters that represents all letters in password
    *       put mask to html container
    */
    generateMask: function()
    {
        $( "#content .password").html( "" );
        this.data.passLetters = [];
        this.data.passLetters.push( this.data.pass.charAt( 0 ).toUpperCase());
        $( "#content .password").append( '<span class="0">_</span>' );

        for ( var i = 1; i < this.data.pass.length; i++)
        {
            var letter = this.data.pass.charAt( i ).toUpperCase();

            if( letter != " " )
            {
                $( "#content .password").append( '<span class="' + i + '">_</span>' );

                var foundLetter = false;
                for ( var j = 0; j < this.data.passLetters.length; j++)
                    if( this.data.passLetters[ j ] == letter )
                    {
                        foundLetter = true;
                        break;
                    }

                if( !foundLetter )
                    this.data.passLetters.push( letter );
            }
            else
                $( "#content .password").append( '<span class="' + i + '">&nbsp;</span>');
        }
    },

    /*
    *   Function get random password from database
    */
    getPassword: function()
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
                        Game.Password.data.pass = response.message;
                        Game.Password.generateMask();
                        Game.Password.refreshUsed();
                    }
                        console.log(Game.Password.data.pass);
                }
                catch(e)
                {
                    alert("Problem z połączeniem do bazy danych lub brak haseł w bazie\n" + xmlhttp.responseText);
                }
        };
        
        xmlhttp.open("POST", "./scripts/getRandomPassword.php", true);
        xmlhttp.send();
    }
};