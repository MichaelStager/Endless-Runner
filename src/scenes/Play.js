class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene")
    }

    create()
    {
        //Make lane lines
        this.add.rectangle(width /3,height/2,10,height,0x0000f)
        this.add.rectangle((width/3) *2,height/2,10,height,0x0000f)
        

        //adding enemies to lanes to test positioning (should have a factory that produces these)
        this.enemy1 = new Obstical(this,(width/3)/2,50,'brick',0,20)
        this.enemy2 = new Obstical(this,(width/3)+(width/3)/2,50,'brick',0,20)
        this.enemy3 = new Obstical(this,(width/3)*2 +(width/3)/2,50,'brick',0,20)

        //add player
        this.player = new Player(this,'player')
    }

    update()
    {
    }
}