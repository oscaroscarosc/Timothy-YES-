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
