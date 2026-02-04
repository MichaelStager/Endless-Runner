class Press extends Phaser.Scene
{
    constructor()
    {
        super('pressScene')
    }

    preload()
    {
        this.load.image('brick','./assets/testBrick.png')
    }

    create()
    {
        //making a text config for uniform text
        let textConfig = {
            fontSize: 40,
            color: 0xffffff
        }

        //display text to screen
    this.add.text(width/2,height/6,"Click To Start",textConfig).setOrigin(0.5,0.5)
    this.add.text(width/2,height/5,"Controls: A & D",textConfig).setOrigin(0.5,0.5)
       
    }

    update()
    {
        //go to next scene when screen is pressed
        this.input.on('pointerdown',() =>{
            this.scene.start('playScene')
        })
    }



}