class Item {
    /* Represent an item or object that has an image and
       some properties. */
    constructor(phaser, name, options) {
        this.phaser = phaser;
        this.name = name;
        this.options = options;
    }

    setSize(width, height) {
        if (width !== null && width !== undefined) {
            this.item.displayWidth = width;
        }
        if (height !== null && height !== undefined) {
            this.item.displayHeight = height;
        }
    }

    creationContext() {
        /* Get the creation context of an item, that is whether it has
           physics enabled or not */
        if (this.options) {
            if (this.options.physics) {
                return this.phaser.physics;
            }
        }
        return this.phaser;
    }

    preload() {
        /* Preloads the image during the preload phase */
        this.phaser.load.image(this.name, `assets/${this.name}.png`);
    }

    create(x, y, width, height) {
        /* Create the item during the create phase */
        const context = this.creationContext();
        this.item = context.add.image(x, y, this.name);
        this.item.name = this.name;
        this.setSize(width, height);
    }
}


export default Item;
