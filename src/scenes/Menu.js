class Menu extends Phaser.Scene
{
    constructor()
    {
        super('menuScene')
    }

    create()
    {
        this.nextKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
         this.add.image(width/2,height/2,'grassbg').setOrigin(.5,.5)
         this.add.image(width/2,300,'titleart').setOrigin(0.5,0.5)
        //making a text config for uniform text
        let textConfig = {
           fontFamily: 'roman',
            fontSize: 40,
            bold:true,
            fill: '#000000',
            stroke: '#ffffff',
            strokeThickness: 8
            
        }

        //display text to screen
    this.add.text(width/2,height - 200,"Press Space To Start",textConfig).setOrigin(0.5,0.5)
    this.add.text(width/2,height - 250,"Controls: A & D",textConfig).setOrigin(0.5,0.5)
    //go to next scene when screen is pressed
        this.nextKey.on('down',() =>{
            this.scene.start('playScene')
            
        })
       
    }

    update()
    {
        
    }



}