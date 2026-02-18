class Press extends Phaser.Scene
{
    constructor()
    {
        super('pressScene')
    }

    preload()
    {
       // this.load.image('brick','./assets/testEnemy.png')
       // this.load.image('player','./assets/testPlayer.png')
        this.load.image('grassbg','./assets/StartTower.png')
        this.load.image('titleart','./assets/TitleArt.png')
       // this.load.image('longbg','./assets/longneck.png')
       this.load.font('roman','./assets/AUGUSTUS.TTF','truetype')
        
    }

    create()
    {
        //making a text config for uniform text
        let preTextConfig = {
            fontFamily: 'roman',
            fontSize: 100,
            bold:true,
            fill: '#ff0000'
        }

        //display text to screen
    this.add.text(width/2,height/2,"Click The Screen To Start",preTextConfig).setOrigin(0.5,0.5)

       
    }

    update()
    {
        //go to next scene when screen is pressed
        this.input.on('pointerdown',() =>{
            this.scene.start('menuScene')
        })
    }



}