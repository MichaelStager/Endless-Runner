class Player extends Phaser.GameObjects.Image
{
    constructor(scene,texture)
    {
        super(scene,(width/3)+(width/3)/2,height-200,texture)
        scene.add.existing(this)
        this.lanePos = 2
        // use the scene's input manager (keyboard is lowercase) and register handlers once
        this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.keyLeft.on('down', () => {
            if (this.lanePos > 1) {
                this.lanePos -= 1
                console.log(this.lanePos)
            }
        })

        this.keyRight.on('down', () => {
            if (this.lanePos < 3) {
                this.lanePos += 1
                console.log(this.lanePos)
            }
        })
    }
}