class Player extends Phaser.GameObjects.Image
{
    constructor(scene,texture)
    {
        super(scene,(width/3)+(width/3)/2,height-200,texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.lanePos = 2
        // use the scene's input manager (keyboard is lowercase) and register handlers once
        this.keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.keyLeft.on('down', () => {
            if (this.lanePos > 1) {
                this.lanePos -= 1
                
            }
        })

        this.keyRight.on('down', () => {
            if (this.lanePos < 3) {
                this.lanePos += 1
                
            }
        })
    }
    blockAnimation()
    {
        //Rotates the sheild to wiggle like it blocked, plays when the player collides with an enemy, might add a timer to make it so it only plays once every second or so, to prevent it from just vibrating when you get hit by an enemy
         this.scene.tweens.add({
            targets: this,
            angle: { from: -5, to: 5 },
            duration: 100,
            yoyo: true,
            
        });

    }
}