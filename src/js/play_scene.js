'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
//
var controls = {};
var button = {};
var button2 = {};
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _grupoguay:{},
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    create: function () {
        this.game.stage.backgroundColor = '#a9f0ff';

        this._grupoguay = this.game.add.group();
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('patrones','tiles');

        this.backgroundLayer = this.map.createLayer('BGLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        //this.death = this.map.createLayer('death');
        this._rush = this.game.add.sprite(100,10,'barritaRica');
        this.addPlankton(120,10,"enemy");
        this.addPlankton(130,10,"enemy"); 
        this.addPlankton(140,10,"enemy"); 

        this.map.setCollisionBetween(1, 5000, true, 'Death');
        this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
        this.death = this.map.createLayer('Death');
        this.death.visible = false;
        //this.groundLayer.resizeWorld();

        this.groundLayer.setScale(1.5,1.5);
        this.backgroundLayer.setScale(1.5,1.5);
        this.death.setScale(1.5,1.5);

        controls ={
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            jump: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            pausa: this.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
        };
        //this._rush.anchor.setTo(0, -5);
        this.configure();
    },
    addPlankton:function(posX,posY,asset){
        var plankton = this.game.add.sprite(posX,posY,asset);
        //plankton.anchor.setTo(0.5);
        this.game.physics.enable(plankton, Phaser.Physics.ARCADE);
        this._grupoguay.add(plankton);
         
    },
    update: function(){
        //var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        //var movement = this.GetMovement();

        this._rush.body.velocity.x = 0;
        if(controls.jump.isDown && (this._rush.body.blocked.down || this._rush.body.touching.down)){
            this._rush.body.velocity.y -= 800;
        }
        
        if(controls.right.isDown){
            
            this._rush.body.velocity.x += 800;
        }

        if(controls.left.isDown){
            this._rush.body.velocity.x -= 500;
        }
        if(controls.pausa.isDown){
            this.game.paused = true;
            
            var posx = 0;
            if (this._rush.body.x<400)
                posx = 400;
            else if (this._rush.body.x>7600)
                posx = 7600;
            else posx = this._rush.body.x;

            button = this.game.add.button(posx,
                                          200, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
            //button.anchor.set(0.5);
            var text = this.game.add.text(0, 0, "¡Vuelve Timothy!");
            //text.anchor.set(0.5);
            button.addChild(text);
            button2 = this.game.add.button(posx,
                                          400, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
            //button.anchor.set(0.5);
            var text2 = this.game.add.text(0, 0, "menú del día");
            //text.anchor.set(0.5);
            button2.addChild(text2);
        }
        /*if(this.game.physics.arcade.collide(this._rush, this.death)){
            this._rush.destroy();
            this.game.state.start('gameOver');
        }*/
        this.checkPlayerFell();

        this.game.input.onDown.add(unpause, this);
        function unpause(event){
            if (this.game.paused){
                //console.log (button.x);
                //console.log (event.x+button.x);
                if (event.x + button.x-400 > button.x && event.x +button.x-400  < button.x + 168 && event.y > 300 && event.y < 370){
                    this.game.paused = false;
                    button.destroy();
                    button2.destroy();
                }
                else if (event.x + button.x-400 > button.x && event.x +button.x-400  < button.x + 168 && event.y > 500 && event.y < 570){
                    this.game.paused = false;
                    this.destroy();
                    this.game.state.start('menu');
                }
            }
        };

    },

    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.destroy();
        this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 8000, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        
        //this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 2000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this.game.camera.follow(this._rush);
    },
    destroy: function(){
        this._rush.destroy();
        this.map.destroy();
        this.backgroundLayer.destroy();
        this.game.world.setBounds(0,0,800,600); 
    }
}

/*//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
      this._rush = this.game.add.sprite(10,10,'rush'); 
      //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones','tiles');
      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('BackgroundLayer');
      this.groundLayer = this.map.createLayer('GroundLayer');
      //plano de muerte
      this.death = this.map.createLayer('Death');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = false;
      //Cambia la escala a x3.
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      
      //this.groundLayer.resizeWorld(); //resize world and adjust to the screen
      
      //nombre de la animación, frames, framerate, isloop
      this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      this.configure();
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var movement = this.GetMovement();
        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;     
        }
        //States
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1; 
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();
    },
    
    
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.destroy();
        this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death))
            this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        
        this._rush.body.bounce.y = 0.2;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destroy: function(){
        this._rush.destroy();
        this.map.destroy();
        this.backgroundLayer.destroy();
        this.game.world.setBounds(0,0,800,600); 
    }
};*/

module.exports = PlayScene;
