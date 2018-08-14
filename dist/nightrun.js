import Phaser from 'phaser';

var Item = function Item(phaser, name, options) {
    this.phaser = phaser;
    this.name = name;
    this.options = options;
};

Item.prototype.setSpawn = function setSpawn (x, y) {
    /* Sets the spawn point of the item */
    this.spawn = {x: x, y: y};
};

Item.prototype.creationContext = function creationContext () {
    /* Get the creation context of an item, that is whether it has
       physics enabled or not */
    if (this.options) {
        if (this.options.physics) {
            return this.phaser.physics;
        }
    }
    return this.phaser;
};

Item.prototype.preload = function preload () {
    /* Preloads the image during the preload phase */
    this.phaser.load.image(this.name, ("assets/" + (this.name) + ".png"));
};

Item.prototype.create = function create () {
    /* Create the item during the create phase */
    var context = this.creationContext();
    var x = this.spawn.x;
    var y = this.spawn.y;
    this.item = context.add.image(x, y, this.name);
    this.item.name = this.name;
    //this.item.setData('x', 'magic');
};

var Sprite = (function (Item$$1) {
    function Sprite(phaser, name, spriteOptions, options) {
        Item$$1.call(this, phaser, name, options);
        this.spriteOptions = spriteOptions;
    }

    if ( Item$$1 ) Sprite.__proto__ = Item$$1;
    Sprite.prototype = Object.create( Item$$1 && Item$$1.prototype );
    Sprite.prototype.constructor = Sprite;

    Sprite.prototype.preload = function preload () {
        var asset = "assets/" + (this.name) + ".png";
        this.phaser.load.spritesheet(this.name, asset, this.spriteOptions);
    };

    Sprite.prototype.create = function create () {
        var context = this.creationContext();
        var x = this.spawn.x;
        var y = this.spawn.y;
        this.sprite = context.add.sprite(x, y, this.name);
    };

    return Sprite;
}(Item));

var Monster = (function (Sprite$$1) {
    function Monster(phaser, name, monsterOptions) {
        monsterOptions.physics = true;
        Sprite$$1.call(this, phaser, name, {frameWidth: 16, frameHeight: 16}, monsterOptions);
    }

    if ( Sprite$$1 ) Monster.__proto__ = Sprite$$1;
    Monster.prototype = Object.create( Sprite$$1 && Sprite$$1.prototype );
    Monster.prototype.constructor = Monster;

    Monster.prototype.damage = function damage (damage$1) {
        /* Damages the monster */
        this.options.hp -= damage$1;
    };

    Monster.prototype.isAlive = function isAlive () {
        /* Whether the monster is alive */
        if (this.options.hp > 0) {
            return true;
        }
    };

    Monster.prototype.attack = function attack () {
        /* The attack value of the monster */
        return this.options.attack;
    };

    Monster.prototype.fight = function fight (target) {
        /* Fight against a target */
        target.damage(this.attack());
        if (target.isAlive()) {
            this.damage(target.attack());
        }
    };

    Monster.prototype.update = function update () {
        if (this.options.hp <= 0) {
            this.sprite.destroy();
        }
    };

    return Monster;
}(Sprite));

var Text = function Text(phaser, text, x, y, style, options) {
    this.phaser = phaser;
    this.create(text, x, y, style, options);
};

Text.prototype.create = function create (text, x, y, style, options) {
    this.text = this.phaser.add.text(x, y, text, style);
    if (options) {
        if (options.interactive) {
            this.text.setInteractive();
        }
    }
};

Text.prototype.origin = function origin (x, y) {
    this.text.setOrigin(x, y);
};

Text.prototype.write = function write (text) {
    this.text.setText(text);
};

Text.prototype.event = function event (event$1, f) {
    this.text.on(event$1, f);
};

Text.prototype.destroy = function destroy () {
    this.text.destroy();
};

var LoadingBar = function LoadingBar(game) {
    this.game = game;
    this.create();
};

LoadingBar.prototype.create = function create () {
    var width = this.game.cameras.main.width;
    var halfWidth = width / 2;
    var height = this.game.cameras.main.height;
    var style = {font: '18px monospace', fill: '#ffffff'};
    this.box = this.game.add.graphics();
    this.box.fillStyle(0x222222, 0.8);
    this.box.fillRect(240, 270, 320, 50);
    this.bar = this.game.add.graphics();
    this.loadingText = new Text(this.game, 'Loading...', halfWidth, (height/2-50), style);
    this.loadingText.origin(0.5, 0.5);
    style.fill = '#000';
    this.percentage = new Text(this.game, '0%', halfWidth, (height/2-5), style);
    this.percentage.origin(0.5, 0.5);
    this.game.load.on('progress', this.progress());
    this.game.load.on('complete', this.complete());
};

LoadingBar.prototype.progress = function progress () {
        var this$1 = this;

    return function (value) {
        this$1.bar.clear();
        this$1.bar.fillStyle(0xffffff, 1);
        this$1.bar.fillRect(250, 280, 300 * value, 30);
        var percentage = parseInt(value * 100);
        this$1.percentage.write((percentage + "%"));
    }
};

LoadingBar.prototype.complete = function complete () {
        var this$1 = this;

    return function (value) {
        this$1.bar.destroy();
        this$1.box.destroy();
        this$1.percentage.destroy();
        this$1.loadingText.destroy();
    }
};

var Scene = (function (superclass) {
    function Scene(config) {
        superclass.call(this, config);
    }

    if ( superclass ) Scene.__proto__ = superclass;
    Scene.prototype = Object.create( superclass && superclass.prototype );
    Scene.prototype.constructor = Scene;

    Scene.prototype.init = function init (phaser, options) {
        if (options) {
            this.loadingBar = options.loadingBar;
        }
    };

    Scene.prototype.initControls = function initControls () {
        this.keyboard = this.input.keyboard.createCursorKeys();
    };

    Scene.prototype.preload = function preload () {
        if (this.loadingBar) {
            new LoadingBar(this);
        }
        this.initControls();
    };

    Scene.prototype.create = function create () {

    };

    Scene.prototype.update = function update () {

    };

    Scene.prototype.next = function next (scene) {
        this.scene.start(scene);
    };

    return Scene;
}(Phaser.Scene));

export { Item, Monster, LoadingBar, Scene, Sprite, Text };
