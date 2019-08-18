import Text from './Text';


class Button extends Text {
    constructor(phaser, text, x, y, style) {
        super(phaser, text, x, y, style, { interactive: true });
    }
}


export default Button;
