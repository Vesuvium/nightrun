import test from 'ava';
import td from 'testdouble';

import Phaser from 'phaser';
import Rectangle from '../../../src/geometry/Rectangle';


test.beforeEach((ava) => {
    ava.context.phaser = { add: td.object(['graphics']) };
});


test.serial.beforeEach((ava) => {
    const phaser = ava.context.phaser;
    ava.context.rectangle = new Rectangle(phaser, 'x', 'y', 'w', 'h', 'style');
});


test('the Rectangle constructor', (ava) => {
    const phaser = ava.context.phaser;
    const rectangle = ava.context.rectangle;
    ava.is(rectangle.phaser, phaser);
    ava.is(rectangle.x, 'x');
    ava.is(rectangle.y, 'y');
    ava.is(rectangle.width, 'w');
    ava.is(rectangle.height, 'h');
    ava.is(rectangle.style, 'style');
});


test('the shape method', (ava) => {
    const rectangle = ava.context.rectangle;
    const result = rectangle.shape(0, 1, 2, 3);
    ava.deepEqual(result, new Phaser.Geom.Rectangle(0, 1, 2, 3));
});
