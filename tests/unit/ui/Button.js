import test from 'ava';
import td from 'testdouble';

import Button from '../../../src/ui/Button';
import Text from '../../../src/ui/Text';


test.beforeEach((ava) => {
    ava.context.button = new Button('phaser', 'text', 'x', 'y', 'style');
});


test('the Button class', (ava) => {
    ava.true(Button.prototype instanceof Text);
});


test('the Button constructor', (ava) => {
    const button = ava.context.button;
    ava.is(button.phaser, 'phaser');
    ava.is(button.text, 'text');
    ava.is(button.x, 'x');
    ava.is(button.y, 'y');
    ava.is(button.style, 'style');
    ava.deepEqual(button.options, { interactive: true });
});
