//Michael Stager
//2/3/2026
//TITLE HERE





let config = {
    type: Phaser.AUTO,
    width: 1920, //720
    height: 1080, //1280
    backgroundColor: '#ffffff',
    scale: {
    mode: Phaser.Scale.FIT,          // fit inside available space
    autoCenter: Phaser.Scale.CENTER_BOTH
    },
     physics: {
        default: 'arcade',
        arcade:{
            debug: true
        },
    },
    scene: [Press,Menu,Play]
}
let game = new Phaser.Game(config); 
const {width,height} = game.config

