'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
//
var controls = {};
var direccionBala;
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

        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('patrones','tiles');

        this.backgroundLayer = this.map.createLayer('BGLayer');
        this.groundLayer = this.map.createLayer('GroundLayer');
        this.plataforma = this.map.createLayer('Dark');
        this.muerteDT = this.map.createLayer('MuereDT');
        this._timothy = this.game.add.sprite(120,60,'timothy');
        //this._timothy = this.game.add.sprite(7400,430,'timothy');
        this._darkTimothy = this.game.add.sprite(7580,94,'malo0');
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
            console.log(this._timothy.body.x, this._timothy.body.y);
        }
        
        if(controls.right.isDown){
            
            this._timothy.body.velocity.x += 300;
            this._timothy.scale.setTo(0.5,0.5);
            direccionBala = true;
        }

        if(controls.left.isDown){
            this._timothy.body.velocity.x -= 300;
            this._timothy.scale.setTo(-0.5,0.5);
            direccionBala = false;
        }

        if(controls.correr.isDown){
            this._timothy.body.velocity.x *= 1.5;
        }

        controls.disparo.onDown.add(this.dispara,this);

        for(var i = 0; i < this._grupoCorredor.length ;++i){
            //console.log('daaaaaaaaaaaaaaamn');

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
            this.boton.destroy();
            this.plataforma.destroy();
        }
        
        this.EndOfGame();
        this.checkPlayerFell();

        this.game.input.onDown.add(unpause, this);
        function unpause(event){
            if (this.game.paused){
                //console.log (button.x);
                //console.log (event.x+button.x);
                if (event.x + button.x-400 > button.x && event.x +button.x-400  < button.x + 168 && event.y > button.y && event.y < button.y + 70){
                    this.game.paused = false;
                    button.destroy();
                    button2.destroy();
                }
                else if (event.x + button.x-400 > button.x && event.x +button.x-400  < button.x + 168 && event.y > button2.y && event.y < button2.y + 70){
                    this.game.paused = false;
                    this.destroy();
                    this.game.state.start('menu');
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
        bala.anchor.setTo(0,0.2);
        this.game.physics.enable(bala, Phaser.Physics.ARCADE);
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

        this._darkTimothy.body.gravity.y = 2000;
        this._darkTimothy.body.gravity.x = 0;
    },
    destroy: function(){
        this._timothy.destroy();
        this.map.destroy();
        this.backgroundLayer.destroy();
        this.game.world.setBounds(0,0,800,600); 
    }
}

/*//Scena de juego.
var PlayScene = {
    _timothy: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
      this._timothy = this.game.add.sprite(10,10,'rush'); 
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
      this._timothy.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._timothy.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._timothy.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      this.configure();
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionCajaBalaithTilemap = this.game.physics.arcade.collide(this._timothy, this.groundLayer);
        var movement = this.GetMovement();
        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionCajaBalaithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._timothy.y;
                    this._timothy.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._timothy.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._timothy.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._timothy.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._timothy.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._timothy.animations.play('stop');
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
                    if(this._timothy.scale.x < 0)
                        this._timothy.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._timothy.scale.x > 0)
                        this._timothy.scale.x *= -1; 
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
    
    
    canJump: function(collisionCajaBalaithTilemap){
        return this.isStanding() && collisionCajaBalaithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.destroy();
        this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._timothy, this.death))
            this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._timothy.body.blocked.down || this._timothy.body.touching.down
    },
        
    isJumping: function(collisionCajaBalaithTilemap){
        return this.canJump(collisionCajaBalaithTilemap) && 
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
        this.game.physics.arcade.enable(this._timothy);
        
        this._timothy.body.bounce.y = 0.2;
        this._timothy.body.gravity.y = 20000;
        this._timothy.body.gravity.x = 0;
        this._timothy.body.velocity.x = 0;
        this.game.camera.follow(this._timothy);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._timothy.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._timothy.x < xMin && point.x < 0)|| (this._timothy.x > xMax && point.x > 0))
            this._timothy.body.velocity.x = 0;

    },
    
    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destroy: function(){
        this._timothy.destroy();
        this.map.destroy();
        this.backgroundLayer.destroy();
        this.game.world.setBounds(0,0,800,600); 
    }
};*/

module.exports = PlayScene;
