class Item {
    /* Represent an item or object that has an image and
       some properties. */
    constructor(phaser, name, options) {
        this.phaser = phaser;
        this.name = name;
        this.options = options;
    }

    setSpawn(x, y) {
        /* Sets the spawn point of the item */
        this.spawn = {x: x, y: y};
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

    create() {
        /* Create the item during the create phase */
        const context = this.creationContext();
        const x = this.spawn.x;
        const y = this.spawn.y;
        this.item = context.add.image(x, y, this.name);
        this.item.name = this.name;
        //this.item.setData('x', 'magic');
    }
}


export default Item;
