//Michael Stager
//2/3/2026
//HELLTER SKELLTER
// For my coding technically interesting topic, I couldn’t think of anything else besides the example Altice did: a high score that saves to local storage.
// For the artistic interesting topic, it should be clear. The game revolves around layered aesthetics stacking effects. I want it to show chaos and resemble jumpstyle art.
// The game itself has an underlying tone of testing faith: you are tasked with making it to the top of the tower,something you can never reach,resembling the inability to make it to heaven. That’s why the game gets scarier and scarier the more you progress.
// This is also the reason for the Leviathan cross on the shield: this symbol represents self-guidance and self-fulfillment. There are many little details like that, but I will spare you the time.





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
        debug: false
        },
    },
    scene: [Press,Menu,Play,Credits]
}
let game = new Phaser.Game(config); 
const {width,height} = game.config

