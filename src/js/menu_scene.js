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