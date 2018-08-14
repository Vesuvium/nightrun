# Nightrun

A Phaser3 library that provides better APIs and some out-of-the-box features:

- Loading bar for scenes
- Scenes
- Items
- Sprites
- Monsters

## Usage

Install with npm:

```
npm install nightrun
```

Nightrun is provided as es6 bundle, without Phaser in it. You can import
with:

```
import {Scene} from 'nightrun';
```


## Classes

### Scene

Scene inherits directly from Phaser.Scene, but comes with a loading bar and
preload/create/update methods already setup.


```js
import {Scene} from 'nightrun';


class MyScene extends Scene {
    init(phaser) {
        super.init(phaser, {loadingBar: true});
    }
}
```

### Item

A generic item (like a sword or a potion), created with `phaser.load.image`.

For example, let's say we want to have a sword in our scene:

```js
import {Item} from 'nightrun';

/* In your scene's init (or wherever you create items) */
const item = new Item(this, 'sword', {physics: true});

/* In your scene's preload */
item.preload();

/* In your scene's create */
item.create();

/* Anywhere before calling create
    (I put in in init usually but can be in create too)
*/
item.setSpawn(x, y);
```

Item will automatically look for `assets/sword.png` and the item will have
`this.name` set to 'sword'


### Sprite

Inherits from Item, but use `phaser.load.spritesheet` instead.

```js
const sprite = new Sprite(this, 'sword', {frameWidth: 16, frameHeight: 16}, {physics: true});
```

### Monster

Inherits from Sprite, assumes physics is enabled.

```js
const monster = new Monster(this, 'spider', {hp: 1, attack: 1});

/* Fight another Monster instance */
monster.fight(target);

/* Get the attack value */
monster.attack();

/* Checks whether the monster is alive (hp > 0) */
monster.isAlive();

/* In the scene's update, calls sprite.destroy() if dead */
monster.update();
```
