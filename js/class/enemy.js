(function() {
	'use strict';


	function Enemy(state, image) {


		window['firsttry'].Mob.call(this, state, image);

		this.shootDelay = 1000;
		this.speed = 50;
		this.points = 100;
		this.bulletType = 0;
		this.bulletSpeed = 100;
		this.bulletCancel = false;

		this.lootProbability = 0.2;
		this.lootType = 1;

		this.shootConfig = {};
		this.shoots = [];
	}

	Enemy.prototype = Object.create(window['firsttry'].Mob.prototype);
	Enemy.prototype.constructor = Enemy;

	Enemy.prototype.update = function () {


		window['firsttry'].Mob.prototype.update.call(this);


		if (this.alive && 
				this.state.player.alive && 	
				this.y < this.state.player.y - 100 * CONFIG.PIXEL_RATIO && 

				this.state.time.now > this.nextShotAt && 
				this.state.bulletPoolsMob[this.bulletType].countDead() > 0
				) {
			this.shoot(this.shootConfig);
		}
	};

	Enemy.prototype.shoot = function (shootConfig) {

		this.shoots.push(new window['firsttry'].Shoot(this.state, this, shootConfig));

		this.nextShotAt = this.state.time.now + this.shootDelay;
	};

	Enemy.prototype.die = function () {


		window['firsttry'].Mob.prototype.die.call(this);


		var bulletCancel = this.bulletCancel;
		this.shoots.forEach(function(shoot) {
			shoot.die(bulletCancel);
		});

	
		if (this.state.rnd.realInRange(0, 1) < this.lootProbability) {
			this.loot(this.lootType);
		}

		var s = this.maxHealth,
				f;

		if (s < 80 ) { f = 1; }
			else if (s < 200 ) { f = 2; }
			else if (s < 500 ) { f = 3; }
			else { f = 4; }

		this.game.sound['explosion_' + f].play();
	};

	Enemy.prototype.revive = function () {

		if (! this.isPinnedToGround) {


			this.reset( this.game.rnd.between(16, CONFIG.WORLD_WIDTH * 24 * CONFIG.PIXEL_RATIO - 16), - 32);
			this.body.velocity.y = (this.speed + this.state.scrollSpeed) * CONFIG.PIXEL_RATIO;

		} else {

			this.reset( (this.game.rnd.integerInRange(1, CONFIG.WORLD_WIDTH) - 0.5) * 24 * CONFIG.PIXEL_RATIO, - 32);
			this.body.velocity.y = this.state.scrollSpeed * CONFIG.PIXEL_RATIO;
		}

		this.nextShotAt = this.game.rnd.integerInRange(0, this.shootDelay);

		window['firsttry'].Mob.prototype.revive.call(this);
	};

	Enemy.prototype.loot = function (type) {

		var bonus = this.state.bonusPool.getFirstExists(false);
		bonus.updateClass();
		bonus.reset(this.x, this.y);
		bonus.body.velocity.y = 40 * CONFIG.PIXEL_RATIO;
		bonus.body.angularVelocity = 30;

		type = type;
	};

	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Enemy = Enemy;
}());