class Obstical extends Phaser.GameObjects.Image
{
    constructor(scene,x,y,texture,frame,speed)
    {
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        this.moveSpeed = speed 
    }

    


}