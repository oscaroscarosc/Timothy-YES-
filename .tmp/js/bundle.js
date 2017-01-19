(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

var PlayScene = require('./play_scene.js');
var GameOver = require('./gameover_scene.js');
var MenuScene = require('./menu_scene.js');
var Final = require('./Final.js');
//  The Google WebFont Loader will look for this object, so create it before loading the script.




var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/TIMOTHYLOGO.png');
    this.game.load.audio('menumusic',  'sound/WeAreNumberOne.ogg');

  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
      this.game.load.tilemap('tilemap', 'images/mapaTimothy.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles','images/tileset-platformer.png');

      //this.game.load.atlas('rush','images/rush_spritesheet.png', 'images/rush_spritesheet.json');

      /*this.game.load.image('timothy', 'images/TimothyFinoOjosGordos.png');
      this.game.load.image('malo0', 'images/TimothyOsc.png');
      this.game.load.image('malo1', 'images/TimothyCorredor.png');
      this.game.load.image('malo2', 'images/TimothyEstupido.png');*/
      this.game.load.spritesheet('timothy', 'images/TimothyAnimation.png', 77, 100);
      this.game.load.spritesheet('malo1', 'images/TimothyCorredorAnime.png', 92, 100);
      this.game.load.spritesheet('malo2', 'images/TimothyEstupidoAnime.png', 77, 100);
      this.game.load.spritesheet('malo0', 'images/TimothyOscAnime.png', 100, 100);
      
      this.game.load.image('bala', 'images/bala.png');
      this.game.load.image('caja', 'images/caja.png');
      this.game.load.image('botoncito', 'images/boton.png');
      this.game.load.image('parajuego', 'images/pausa.png');

      this.game.load.audio('finalmusic',  'sound/byebyetimothy.ogg');
      this.game.load.audio('gameovermusic',  'sound/GameOver.ogg');
      this.game.load.audio('playmusic',  'sound/happysong.ogg');
      this.game.load.audio('soundjump',  'sound/Jump6.wav');
      this.game.load.audio('soundshoot',  'sound/Laser_Shoot.wav');
      this.game.load.audio('soundclick',  'sound/Blip_Select.wav');

      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
      this.game.load.onLoadComplete.add(this.loadComplete,this);

  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
    
    
     //TODO 2.2b function loadComplete()
    loadComplete: function(){
        this.game.state.start('play');
    },

    
    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};
 
//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().
function init(){
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
  game.state.add('boot', BootScene);
  game.state.add('menu', MenuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('gameOver', GameOver);
  game.state.add('final', Final);
//TODO 1.3 iniciar el state 'boot'. 
  game.state.start('boot');
}
window.onload = function () {
  WebFont.load(wfconfig);
};

},{"./Final.js":1,"./gameover_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.musica1 = this.game.add.audio('menumusic');
        this.musica1.loopFull();
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        200, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               450, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        this.game.stage.backgroundColor = '#000000';
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
        this.musica1.pause();
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
//
var controls = {};
var direccionBala;
var pausemenu = {};
var button = {};
var button2 = {};
var PlayScene = {
    _timothy: {}, //player
    //_speed: 300, //velocidad del player
    _grupoCorredor:{},
    _grupoIdiota:{},
    _grupocajas:{},
    _arrayEnePos:[],
    _grupobalas:{},
    //_bala:{},
    //_jumpSpeed: 600, //velocidad de salto
    //_jumpHight: 150, //altura máxima del salto.
    create: function () {
        this.game.stage.backgroundColor = '#a9f0ff';
        direccionBala = true;

        this.musica4 = this.game.add.audio('playmusic');
        this.musica4.loopFull();
        this.sonidosalto = this.game.add.audio('soundjump');
        this.sonidodisparo = this.game.add.audio('soundshoot');
        this.sonidoclick = this.game.add.audio('soundclick');

        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('patrones','tiles');

        this.backgroundLayer = this.map.createLayer('BGLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.plataforma = this.map.createLayer('Dark');
        this.muerteDT = this.map.createLayer('MuereDT');
        this._timothy = this.game.add.sprite(120,60,'timothy');
        this._timothy.animations.add('idle', [0], 1, true);
        this._timothy.animations.add('dispar', [6, 7], 5, false);
        this._timothy.animations.add('walk', [0, 1, 2, 3], 10, true);
        this._timothy.animations.add('jump', [4, 5], 5, false);
        //this._timothy = this.game.add.sprite(7400,430,'timothy');
        this._darkTimothy = this.game.add.sprite(7580,94,'malo0');
        this._darkTimothy.animations.add('caida', [0, 1, 2, 3], 7, true);
        this.boton = this.game.add.sprite(7465, 440,'botoncito');
        this._grupoCorredor = this.game.add.group();
        this._grupoIdiota = this.game.add.group();
        this._grupobalas = this.game.add.group();
        this._grupocajas = this.game.add.group();

        this.creaCorredores(1700,286);
        this.creaCorredores(700,334);
        this.creaIdiotas(260,334,true);
        this.creaIdiotas(810,334,true);
        this.creaIdiotas(1445,142,true);
        this.creaIdiotas(1495,142,true);
        this.creaIdiotas(1730,286,true);
        this.creaIdiotas(2250,286,true);
        this.creaIdiotas(2540,382,true);
        this.creaIdiotas(2740,286,true);
        this.creaIdiotas(3080,142,true);
        this.creaIdiotas(2840,286,true);
        this.creaIdiotas(3460,142,true);
        this.creaCorredores(3460,286);
        this.creaIdiotas(3265,290,false);
        this.creaIdiotas(3750,190,true);
        this.creaIdiotas(4130,286,true);
        this.creaIdiotas(4420,286,true);
        this.creaCorredores(5200,238);
        this.creaIdiotas(5771,382,true);
        this.creaCorredores(5675,430);
        this.creaIdiotas(5285,94,true);
        this.creaIdiotas(6151,334,true);
        this.creaIdiotas(6151,94,true);
        this.creaIdiotas(6386,238,true);
        this.creaIdiotas(6386,94,false);
        this.creaIdiotas(6536,334,true);
        this.creaIdiotas(6726,334,true);
        this.creaIdiotas(6821,142,true);
        this.creaIdiotas(6821,286,false);

        this.cajigroup(1070,286,"caja");
        this.cajigroup(1880,190,"caja");
        this.cajigroup(1880,130,"caja");
        this.cajigroup(4800,334,"caja");
        this.cajigroup(4800,274,"caja");

        this.map.setCollisionBetween(1, 5000, true, 'Death');
        this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
        this.map.setCollisionBetween(1, 5000, true, 'Dark');
        this.map.setCollisionBetween(1, 5000, true, 'MuereDT');
        this.death = this.map.createLayer('Death');
        this.death.visible = false;
        this.muerteDT.visible = false;
        //this.groundLayer.resizeWorld();

        this._timothy.anchor.setTo(0.5, 0.5);
        this._timothy.scale.setTo(0.5,0.5);

        this._darkTimothy.anchor.setTo(0.5, 0.5);
        this._darkTimothy.scale.setTo(0.5,0.5);

        this.boton.anchor.setTo(0.5, 0.5);
        this.boton.scale.setTo(1.5,1.5);
        //this._grupoCorredor.scale.setTo(0.5,0.5);
        this.groundLayer.setScale(1.5,1.5);
        this.plataforma.setScale(1.5,1.5);
        this.muerteDT.setScale(1.5,1.5);
        this.backgroundLayer.setScale(1.5,1.5);
        this.death.setScale(1.5,1.5);

        controls ={
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            jump: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            pausa: this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
            disparo: this.input.keyboard.addKey(Phaser.Keyboard.C),
            correr: this.input.keyboard.addKey(Phaser.Keyboard.X),
        };
        //this._timothy.anchor.setTo(0, -5);
        this.configure();
    },

    cajigroup:function(posX,posY,asset){
        var caja = this.game.add.sprite(posX,posY,asset);
        this.game.physics.enable(caja, Phaser.Physics.ARCADE);
        caja.scale.setTo(0.5,0.5);
        caja.body.gravity.y = 2000;
        //caja.body.moves = false 
        this._grupocajas.add(caja);

    },

    creaCorredores:function(posX,posY){
        var corredor = this.game.add.sprite(posX,posY,'malo1');
        corredor.animations.add('Tcorre', [0, 1, 2, 3], 15, true);
        corredor.animations.play ('Tcorre');
        this._arrayEnePos.push(posX);
        corredor.anchor.setTo(0.5, 0.5);
        corredor.scale.setTo(0.5,0.5);
        this.game.physics.enable(corredor, Phaser.Physics.ARCADE);
        corredor.body.gravity.y = 2000;
        corredor.body.gravity.x = 0;
        corredor.body.velocity.x = 150;
        this._grupoCorredor.add(corredor);
         
    },

    creaIdiotas:function(posX,posY,dir){
        var estupido = this.game.add.sprite(posX,posY,'malo2');
        estupido.animations.add('babea', [0, 1, 2, 3], 5, true);
        estupido.animations.play ('babea');
        //estupido.anchor.setTo(0.5, 0.5);
        if (!dir){
            //estupido.anchor.setTo(0.5, 0.5);
            estupido.scale.setTo(0.5,-0.5);
        }
        else estupido.scale.setTo(0.5,0.5);
        this.game.physics.enable(estupido, Phaser.Physics.ARCADE);
        /*estupido.body.gravity.y = 2000;
        estupido.body.gravity.x = 0;*/
        this._grupoIdiota.add(estupido);
         
    },
    update: function(){
        //var moveDirection = new Phaser.Point(0, 0);
        var collisionCajaBalaithTilemap = this.game.physics.arcade.collide(this._timothy, this.groundLayer);
        var collisionTimothyCaja = this.game.physics.arcade.collide(this._timothy, this._grupocajas);
        var collisionCajaCaja = this.game.physics.arcade.collide(this._grupocajas, this._grupocajas);
        var collisionTimothyCorredor = this.game.physics.arcade.collide(this._grupoCorredor, this._timothy);
        var collisionTimothyEstupido = this.game.physics.arcade.collide(this._timothy, this._grupoIdiota);
        var collisionCorredorSuelo = this.game.physics.arcade.collide(this._grupoCorredor, this.groundLayer);
        var collisionCajaSuelo = this.game.physics.arcade.collide(this._grupocajas, this.groundLayer);
        var collisionCajaBala = this.game.physics.arcade.collide(this._grupocajas, this._grupobalas);
        //var collisionDTMuerte = this.game.physics.arcade.collide(this._darkTimothy, this.muerteDT);
        var collisionDTPlataforma = this.game.physics.arcade.collide(this._darkTimothy, this.plataforma);
        var collisionTimothyBoton = this.game.physics.arcade.collide(this._timothy, this.boton);
        //var movement = this.GetMovement();

        this._timothy.body.velocity.x = 0;

        if(controls.jump.isDown && (this._timothy.body.blocked.down || this._timothy.body.touching.down)){
            this._timothy.body.velocity.y -= 800;
            //console.log(this._timothy.body.x, this._timothy.body.y);
            this.sonidosalto.play();
            //this._timothy.animations.stop ('walk');
            this._timothy.animations.play ('jump');
        }
        
        if(controls.right.isDown){
            
            this._timothy.body.velocity.x += 300;
            this._timothy.scale.setTo(0.5,0.5);
            direccionBala = true;
            if (this._timothy.body.blocked.down || this._timothy.body.touching.down)
                this._timothy.animations.play ('walk');
            else this._timothy.animations.stop ('walk');
        }

        if(controls.left.isDown){
            this._timothy.body.velocity.x -= 300;
            this._timothy.scale.setTo(-0.5,0.5);
            direccionBala = false;
            if (this._timothy.body.blocked.down || this._timothy.body.touching.down)
                this._timothy.animations.play ('walk');
            else this._timothy.animations.stop ('walk');
        }

        if(controls.correr.isDown){
            this._timothy.body.velocity.x *= 1.5;

        }

        if((this._timothy.body.velocity.x == 0 && this._timothy.body.velocity.y == 0) && !controls.disparo.isDown){
            this._timothy.animations.play ('idle');
        }

        controls.disparo.onDown.add(this.dispara,this);

        for(var i = 0; i < this._grupoCorredor.length ;++i){

            if((this._grupoCorredor.getChildAt(i).body.velocity.x > 0 && this._grupoCorredor.getChildAt(i).x>= this._arrayEnePos[i]) || (this._grupoCorredor.getChildAt(i).body.velocity.x < 0 && this._grupoCorredor.getChildAt(i).x < this._arrayEnePos[i] - 330)){
                this._grupoCorredor.getChildAt(i).body.velocity.x *= -1;
                this._grupoCorredor.getChildAt(i).scale.x *= -1;
            }

        }
        /*for(var i = 0; i < this._grupobalas.length ;++i){
            for(var j = 0; j < this._grupocajas.length ;++j){
                if (this.checkOverlap(this._grupocajas.getChildAt(j), this._grupobalas.getChildAt(i))){
                    this._grupocajas.getChildAt(j).destroy();
                    this._grupobalas.getChildAt(i).destroy();
                }
            }

        }*/
        for(var i = 0; i < this._grupocajas.length ;++i){
            for(var j = 0; j < this._grupobalas.length ;++j){
                if (this.checkOverlap(this._grupocajas.getChildAt(i), this._grupobalas.getChildAt(j))){
                    this._grupocajas.getChildAt(i).destroy();
                    this._grupobalas.getChildAt(j).destroy();
                }
            }

        }
        for(var i = 0; i < this._grupocajas.length ;++i){
            this._grupocajas.getChildAt(i).body.velocity.x = 0;
            this._grupocajas.getChildAt(i).body.velocity.x = 0;
        }

        /*if((this._grupoCorredor.getChildAt(0).body.velocity.x > 0 && this._grupoCorredor.getChildAt(0).x>600) || (this._grupoCorredor.getChildAt(0).body.velocity.x < 0 && this._grupoCorredor.getChildAt(0).x<400)){
            this._grupoCorredor.getChildAt(0).body.velocity.x *= -1;
        }*/
        if(controls.pausa.isDown){
            this.game.paused = true;
            
            var posx = 0;
            if (this._timothy.body.x<400)
                posx = 400;
            else if (this._timothy.body.x>7600)
                posx = 7600;
            else posx = this._timothy.body.x;

            pausemenu = this.game.add.sprite(posx, 
                                        275, 
                                        'parajuego');
            pausemenu.anchor.setTo(0.5, 0.5);
            button = this.game.add.button(posx,
                                          200, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
            button.anchor.set(0.5);
            var text = this.game.add.text(0, 0, "Continuar");
            text.anchor.set(0.5);
            button.addChild(text);
            button2 = this.game.add.button(posx,
                                          400, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
            button2.anchor.set(0.5);
            var text2 = this.game.add.text(0, 0, "Menú");
            text2.anchor.set(0.5);
            button2.addChild(text2);
        }
        if(collisionTimothyCorredor || collisionTimothyEstupido){
            this.Death();
        }
        /*if(collisionTimothyCorredor){
            this._grupobalas.body.moves = false 
        }*/
        /*if(this.game.physics.arcade.collide(this._timothy, this.death)){
            this._timothy.destroy();
            this.game.state.start('gameOver');
        }*/

        if (collisionTimothyBoton){
            this.sonidoclick.play();
            this.boton.destroy();
            this.plataforma.destroy();
            this._darkTimothy.animations.play ('caida');
        }

        
        this.EndOfGame();
        this.checkPlayerFell();

        this.game.input.onDown.add(unpause, this);
        function unpause(event){
            if (this.game.paused){
                //console.log (button.x);
                //console.log (event.x+button.x);
                if (event.x + button.x-316 > button.x && event.x +button.x-316  < button.x + 168 && event.y > button.y - 35 && event.y < button.y + 35){
                    this.game.paused = false;
                    button.destroy();
                    button2.destroy();
                    pausemenu.destroy();
                }
                else if (event.x + button.x-316 > button.x && event.x +button.x-316  < button.x + 168 && event.y > button2.y - 35 && event.y < button2.y + 35){
                    this.game.paused = false;
                    this.destroy();
                    this.game.state.start('menu');
                    this.musica4.pause();
                }
            }
        };

    },

    checkOverlap: function (spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },

    dispara: function(){
        var bala = this.game.add.sprite(this._timothy.body.x + 15,this._timothy.body.y,'bala');
        this.sonidodisparo.play();
        bala.anchor.setTo(0,0.2);
        this.game.physics.enable(bala, Phaser.Physics.ARCADE);
        this._timothy.animations.stop ('walk');
        this._timothy.animations.play ('dispar');
        if(direccionBala){
            bala.scale.setTo(0.5,0.5);
            bala.body.velocity.x += 400;
        }
        else{
            bala.scale.setTo(-0.5,0.5);
            bala.body.velocity.x -= 400;
        }
        this._grupobalas.add(bala);
        /*var collisionCajaBala = this.game.physics.arcade.collide(this._grupoCorredor, bala);
        if(collisionCajaBala){
            this.Death();
        }*/
    },

    Death: function(){
        //TODO 6 Carga de 'gameOver';
        this.destroy();
        this.game.state.start('gameOver');
        this.musica4.pause();
        //this.game.state.start('final');
    },

    EndOfGame: function(){
        if(this.game.physics.arcade.collide(this._darkTimothy, this.muerteDT)){
            this.finalizar();
        }
    },
    finalizar: function(){
        this.destroy();
        this.game.state.start('final');
        this.musica4.pause();
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._timothy, this.death))
            this.Death();
    },
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 8000, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._timothy);
        this.game.physics.arcade.enable(this.boton);
        this.game.physics.arcade.enable(this._darkTimothy);
        //this._timothy.body.bounce.y = 0.2;
        this._timothy.body.gravity.y = 2000;
        this._timothy.body.gravity.x = 0;
        this._timothy.body.velocity.x = 0;
        this.game.camera.follow(this._timothy);

        this._darkTimothy.body.gravity.y = 1500;
        this._darkTimothy.body.gravity.x = 0;
    },
    destroy: function(){
        this._timothy.destroy();
        this.map.destroy();
        this.backgroundLayer.destroy();
        this.game.world.setBounds(0,0,800,600); 
    }
}

module.exports = PlayScene;

},{}]},{},[3]);
