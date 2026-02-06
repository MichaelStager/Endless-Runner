class Obstical extends Phaser.GameObjects.Image
{
    constructor(scene,x,y,texture,frame,speed)
    {
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        this.moveSpeed = speed 
        this.setScale(0.1,0.1)
    }

        //scale the object up to a set size and move it down the screen, so it looks like it's coming toward the player
    moveObstical()
    {
        
        this.y += this.moveSpeed
        if(this.scaleX < 3){
        console.log(this.scaleX)
        this.setScale(this.scaleX + 0.1, this.scaleY + 0.01)
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