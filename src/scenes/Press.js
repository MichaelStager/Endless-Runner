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
        this.pressText = this.add.text
        this.enemy1 = new Obstical(this,50,50,'brick',0,20)
    }

}