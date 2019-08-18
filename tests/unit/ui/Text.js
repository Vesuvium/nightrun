import test from 'ava';
import td from 'testdouble';

import Text from '../../../src/ui/Text';


test.beforeEach((ava) => {
    ava.context.phaser = { add: td.object(['text']) };
});


test.serial.beforeEach((ava) => {
    const phaser = ava.context.phaser;
    ava.context.text = new Text(phaser, 'text', 'x', 'y', 'style', {});
});


test('the Text constructor', (ava) => {
    const phaser = ava.context.phaser;
    const text = ava.context.text;
    ava.is(text.phaser, phaser);
    ava.is(text.text, 'text');
    ava.is(text.x, 'x');
    ava.is(text.y, 'y');
    ava.is(text.style, 'style');
    ava.deepEqual(text.options, {});
});


test('the applyOptions method', (ava) => {
    const text = ava.context.text;
    ava.is(text.applyOptions(), undefined);
});


test('the applyOptions method with interactive enabled', (ava) => {
    const text = ava.context.text;
    text.options.interactive = true;
    text.widget = td.object();
    text.applyOptions();
    td.verify(text.widget.setInteractive());
    ava.pass();
});


test('the create method', (ava) => {
    const phaser = ava.context.phaser;
    const text = ava.context.text;
    text.applyOptions = td.func();
    text.create();
    td.verify(phaser.add.text('x', 'y', 'text', 'style'));
    td.verify(text.applyOptions());
    ava.is(text.widget, phaser.add.text());
});


test('the origin method', (ava) => {
    const text = ava.context.text;
    text.widget = td.object();
    text.origin(1, 2);
    td.verify(text.widget.setOrigin(1, 2));
    ava.pass();
});


test('the write method', (ava) => {
    const text = ava.context.text;
    text.widget = td.object();
    text.write('hello');
    td.verify(text.widget.setText('hello'));
    ava.pass();
});


test('the event method', (ava) => {
    const text = ava.context.text;
    text.widget = td.object();
    text.event('event', 'function');
    td.verify(text.widget.on('event', 'function'));
    ava.pass();
});


test('the destroy method', (ava) => {
    const text = ava.context.text;
    text.widget = td.object();
    text.destroy();
    td.verify(text.widget.destroy());
    ava.pass();
});


test.afterEach((ava) => {
    td.reset();
});
