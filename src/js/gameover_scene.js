var GameOver = {
    create: function () {
        console.log("Game Over");
        this.musica3 = this.game.add.audio('gameovermusic');
        this.musica3.play();
        var button = this.game.add.button(400, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.

        var button2 = this.game.add.button(400, 450, 
                                          'button', 
                                          this.actionOnClick2, 
                                          this, 2, 1, 0);
        button2.anchor.set(0.5);
        var texto = this.game.add.text(0, 0, "Menu");
        texto.anchor.set(0.5);
        button2.addChild(texto);
    },
    
    //TODO 7 declarar el callback del boton.
    actionOnClick: function(){
        this.game.state.start('play');
        this.musica3.pause();
    },

    actionOnClick2: function(){
        this.game.state.start('menu');
        this.musica3.pause();
    }

};

module.exports = GameOver;