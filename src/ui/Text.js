import Phaser from 'phaser';


class Text {
    constructor(phaser, text, x, y, style, options) {
        this.phaser = phaser;
        this.text = text;
        this.x = x;
        this.y = y;
        this.style = style;
        this.options = options;
    }

    applyOptions() {
        if (this.options) {
            if (this.options.interactive) {
                this.widget.setInteractive();
            }
        }
    }

    create() {
        this.widget = this.phaser.add.text(this.x, this.y, this.text, this.style);
        this.applyOptions();
        this.origin(0.5, 0.5);
    }

    origin(x, y) {
        this.widget.setOrigin(x, y);
    }

    write(text) {
        this.widget.setText(text);
    }

    event(event, f) {
        this.widget.on(event, f);
    }

    color(color) {
        return new Phaser.Display.Color.ValueToColor(color);
    }

    destroy() {
        this.widget.destroy();
    }
}


export default Text;
