//Michael Stager
//2/3/2026
//HELLTER SKELLTER
// For my coding technically interesting topic I couldnt think off anything else besides the example altice did, with a highscore that saves to local storage.
// For the Artistic intresting topic it should be clear. The Game revolves around layered asetics stacking effects. I Want it to show chaos and resembles that of jumpstyle art
// The game itself has a underlying tone of testing faith, you are tasked with making it to the top of the tower, something you can never reach, resembing the inability to make it to heaven, and thats why the game gets scarier and scarier the more you progress 





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
    scene: [Press,Menu,Play,Credits]
}
let game = new Phaser.Game(config); 
const {width,height} = game.config

