import Phaser from 'phaser';


class Rectangle {

    constructor(phaser, x, y, width, height, style) {
        this.phaser = phaser;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = style;
    }

    shape(x, y, width, height) {
        return new Phaser.Geom.Rectangle(x, y, width, height);
    }

    create() {
        const graphics = this.phaser.add.graphics(this.style);
        graphics.strokeRectShape(this.shape(x, y, width, height));
    }

}


export default Rectangle;
