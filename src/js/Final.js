var cont;
var Final = {

    create: function () {
      this.musica2 = this.game.add.audio('finalmusic');
      this.musica2.loopFull();
    	this.game.stage.backgroundColor = "#ffffff";
    	cont = 0;
        console.log("Final");
        controls ={
            avanza: this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
        };

        var goText = this.game.add.text(10, 0, "Tras una épica batalla contra su alter ego Dark Timothy,\n Timothy por fin era capaz de conocer a su ídolo, pero...");
        this._timothy1 = this.game.add.sprite(150,450,'timothy');
        this._timothy1.animations.add('despedida', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 2, false);
        this._timothy1.animations.play ('despedida');
        this._timothy2 = this.game.add.sprite(370,450,'timothy');
        this._timothy2.scale.setTo(-1,1);
    },

    update: function (){
      //var cont  = 0
        controls.avanza.onDown.add(this.apareceTexto,this);
        

    },
    
    //TODO 7 declarar el callback del boton.
    apareceTexto: function(){
        cont = cont + 1;
        console.log(cont);
        if(cont === 1){
          var gText = this.game.add.text(10, 100, "¡QUÉ SORPRESA! Su ídolo era él mismo, pero si él mismo\n era su ídolo, ¿quién era el Timothy que había viajado por todo\n su subconsciente?");
        }
        if(cont === 2){
          var gext = this.game.add.text(10, 233, "Antes de darle tiempo para asumirlo, Timothy o quién quiera\n que fuese comenzó a desaparecer, contemplando su mismo\n rostro feliz frente a él.");
        }
        if(cont === 3){
          var gxt = this.game.add.text(10, 366, "Y así, Timothy desapareció para siempre aun con una gran\n sonrisa en su cara.");
        }
        if (cont === 4) {
          var button2 = this.game.add.button(650, 500, 
                                            'button', 
                                            this.actionOnClick2, 
                                            this, 2, 1, 0);
          button2.anchor.set(0.5);
          var texto = this.game.add.text(0, 0, "Menu");
          texto.anchor.set(0.5);
          button2.addChild(texto);
        }
    },

    actionOnClick2: function(){
        this.game.state.start('menu');
        this.musica2.pause();
    }

};

module.exports = Final;