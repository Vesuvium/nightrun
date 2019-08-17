import test from 'ava';

import Item from '../../src/Item';


test.beforeEach((ava) => {
	ava.context.item = new Item('phaser', 'name', {});
});

test('the Item constructor', (ava) => {
    const item = ava.context.item;
    ava.is(item.phaser, 'phaser');
    ava.is(item.name, 'name');
    ava.deepEqual(item.options, {});
});

test('the setSpawn method', (ava) => {
    const item = ava.context.item;
    item.setSpawn(1, 2);
    ava.deepEqual(item.spawn, { x: 1, y: 2 });
});

test('the creationContext method', (ava) => {
    const item = ava.context.item;
    ava.is(item.creationContext(), item.phaser);
});

test('the creationContext with options', (ava) => {
    const item = ava.context.item;
    item.options.physics = true;
    item.phaser = { physics: 'physics' };
    ava.is(item.creationContext(), 'physics');
});
