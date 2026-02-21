class Obstical extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame,speed)
    {
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.moveSpeed = speed 
        this.setScale(0.1,0.1)
       
        this.anims.create({
        key: 'enemyAnim',
        frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        repeat: -1,
        frameRate: 6
        })

        this.anims.play('enemyAnim')
    }

        //scale the object up to a set size and move it down the screen, so it looks like it's coming toward the player
    moveObstical()
    {
        
        this.y += this.moveSpeed
        if(this.scaleX < 1.5){
        this.setScale(this.scaleX + (0.01 * this.moveSpeed), this.scaleY + (0.01 * this.moveSpeed))
        }


    }

    respawnObstical(lanePostion,speed)
        {
            this.y = 0
            this.x = lanePostion
            this.setScale(0.1,0.1)
            this.moveSpeed = speed
        }

    
    


}