var Game = Game || {};

Game.Visual =
{
    animation:
    {
        frame: 0,
        step: 0,
        time: 0,
        lastTime: 0,
        gibbetImage: null,
        manImage: null,
        // clouds: [],
        interval: null
    },

    /*
    *   Function refresh visual representation of letters in html container
    */
    refreshLetterBar: function()
    {
        $( "#content .letters" ).html( "" );
    
        for ( var letter = 'A'.charCodeAt( 0 ), i = 0, j = 'Z'.charCodeAt( 0 ) - letter + 1; i < j; i++)
            $( "#content .letters" ).append('<span value="'+i+'">'+ String.fromCharCode( letter + i ) +'</span>');
    
        for ( var offset = 'Z'.charCodeAt( 0 ) - 'A'.charCodeAt(0) + 1, i = 0, j = Game.specialLetters.length; i < j; i++)
            $( "#content .letters" ).append( '<span value="' + ( offset + i ) + '">' + Game.specialLetters[ i ]  + '</span>');
    },

    /*
    *
    */
    animationNextStep: function()
    {
        this.setAnimationStep( ++(this.animation.step) );
    },

    /*
    *   Function set animate step and equivalent images
    */
    setAnimationStep: function( step )
    {
        this.animation.step = step;
        switch ( step )
        {
            case -1:this.animation.gibbetImage = null;
                    this.animation.manImage = null;
                    break;

            case 0: 
            case 1:
            case 2: this.animation.gibbetImage = $("#gibbet ." + step);
                    this.animation.manImage = null;
                    break;

            case 3: 
            case 4:
            case 5: 
            case 6:
            case 7:
            case 8: 
            case 9: this.animation.gibbetImage = $("#gibbet .2");
                    this.animation.manImage = $("#gibbet ." + step);
                    break;
        }
        console.log(this.animation.step + " " + step);
    },

    /*
    *   Function set animate interval
    */
    setAnimate: function( step )
    {
        $("#canvas")[0].width = $("#gibbet .back").width();
        $("#canvas")[0].height = $("#gibbet .back").height();
        var d = new Date();

        // this.animation.clouds = [];
        // this.animation.clouds.push( {img: $( "#gibbet .cloud" + Math.round(Math.random()) ),
        //                             x: -300,
        //                             y: Math.floor(Math.random() * 31) - 50,
        //                             speed: Math.floor(Math.random() * 31) + 30} );

        // for ( var i = 1; i < 10; i++)
        //     this.animation.clouds.push( {img: $("#gibbet .cloud"+Math.round(Math.random())),
        //                                 x: this.animation.clouds[i-1].x - Math.round((Math.random() + 0.5) * 300),
        //                                 y: Math.floor(Math.random() * 31) -  50,
        //                                 speed: Math.floor(Math.random() * 31) + 30} );

                                        //x : 300 * <0.5, 1.5> 
                                        //y : <-20, 20> 

        console.log(this.animation.clouds);
        this.animation.frame = this.animation.time = 0;
        this.animation.lastTime = d.getTime();
        this.animation.step = step;
        this.setAnimationStep( step );
        this.animation.interval = setInterval( this.animate, 1000/30);
        console.log("Aniamtion "+this.animation.interval+"was set to step " + step);
    },

    /*
    *   Function clear animate interval
    */
    clearAnimate: function()
    {
        if ( this.animation.interval != null )
        {
            clearInterval( this.animation.interval );
            this.animation.interval = null;
        }
    },

    /*
    *   Function animate gibbet with hanged man
    */
    animate: function()
    {
        if ( location.hash == "#game" || location.hash == "")
        {
            var ctx = $("#canvas")[0].getContext("2d");
            ctx.clearRect(0,0,$("#canvas")[0].width, $("#canvas")[0].height);

            var d = new Date();
            var delta = (d.getTime() - Game.Visual.animation.lastTime) / 1000;
            Game.Visual.animation.lastTime = d.getTime();
            Game.Visual.animation.time += delta;

            // var clouds = Game.Visual.animation.clouds;
            
            // for ( var i = 0; i < clouds.length; i++)
            // {
            //     ctx.drawImage( clouds[i].img[0], clouds[i].x, clouds[i].y);
            //     clouds[i].x += clouds[i].speed * delta;

            //     if ( clouds[i].x > $("#canvas")[0].width )
            //         clouds[i].x = -clouds[i].img[0].width;
            // }

            if ( (gibbet = Game.Visual.animation.gibbetImage) != null )
            {
                ctx.translate( 329, 91); // default y = 71
                ctx.drawImage( gibbet[0], 0, 0, gibbet.width(), gibbet.height());
                ctx.setTransform(1,0,0,1,0,0);
                
                if ( (man = Game.Visual.animation.manImage) != null )
                {
                    ctx.translate( 464, 115); // default y = 95
                    ctx.rotate( (15 * Math.PI/180) * Math.sin(Game.Visual.animation.time) );
                    ctx.drawImage( man[0], -26, 0, man.width(), man.height());
                    ctx.setTransform(1,0,0,1,0,0);
                }
            }
        }
    }
};