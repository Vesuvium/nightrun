import Text from './Text';


class Button extends Text {
    constructor(phaser, text, x, y, style) {
        super(phaser, text, x, y, style, { interactive: true });
    }

    go(currentScene, scenes) {
        this.event('pointerdown', () => {
            scenes.forEach((scene) => {
                currentScene.next(scene);
            });
        });
    }
}


export default Button;
