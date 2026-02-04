class Player extends Phaser.GameObjects.Image
{
    constructor(scene,texture)
    {
        super(scene,(width/3)+(width/3)/2,height-100,texture)
        scene.add.existing(this)
        this.lanPos = 2
        // use the scene's input manager (keyboard is lowercase) and register handlers once
        this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.keyLeft.on('down', () => {
            if (this.lanPos > 1) {
                this.lanPos -= 1
                console.log(this.lanPos)
            }
        })

        this.keyRight.on('down', () => {
            if (this.lanPos < 3) {
                this.lanPos += 1
                console.log(this.lanPos)
            }
        })
    }
    

   
    
    update()
    {

        // position/animation updates go here

        switch(this.lanPos)
        {
            case 1:
                this.setX((width/3)/2)
                break
            case 2:
                this.setX((width/3)+(width/3)/2)
                break
            case 3:
                this.setX((width/3)*2 +(width/3)/2)
                break
        }

        

    }
}