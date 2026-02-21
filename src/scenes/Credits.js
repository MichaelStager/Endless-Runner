class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }
    preload() {
        this.load.image("michael",'./assets/Michael.png')
    }
    create()
    {
        this.backHomeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.textConfig = {
            fontSize: '40px',
            fontFamily: 'roman',
            color: '#ffffff'
        }
        
        this.cameras.main.setBackgroundColor('#5c0000');
        this.add.image(width/2,height/2 +200 ,'michael' ).setScale(.1)
        this.creditsText = this.add.text(width/2,height/2 - 200,"CREDITS: \n MICHAEL STAGER- EVERYTHING (MUSIC ART PROGRAMMING) ",this.textConfig).setOrigin(0.5,0.5)
        this.backText = this.add.text(width/2 + 300 ,height/2 + 350,"Press C To Go \nBack To Menu ",this.textConfig).setOrigin(0.5,0.5)


        this.backHomeKey.on('down',()=>{
            this.scene.start('menuScene')
        })
    }
    

}