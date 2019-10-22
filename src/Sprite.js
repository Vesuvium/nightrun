import Item from './Item';


class Sprite extends Item {
    constructor(phaser, name, spriteOptions, options) {
        super(phaser, name, options);
        this.spriteOptions = spriteOptions;
    }

    preload() {
        const asset = `assets/${this.name}.png`;
        this.phaser.load.spritesheet(this.name, asset, this.spriteOptions);
    }

    create(x, y, width, height) {
        const context = this.creationContext();
        this.sprite = context.add.sprite(x, y, this.name);
        this.setSize(width, height);
    }
}

export default Sprite;
