//Michael Stager
//2/3/2026
//TITLE HERE

let config = {
    type: Phaser.AUTO,
    width: 1920, //720
    height: 1080, //1280
    backgroundColor: '#ff0000',
    scene: [Press, Play]
    
}
let game = new Phaser.Game(config); 
const {width,height} = game.config

