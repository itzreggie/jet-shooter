(function() {
	'use strict';


	function Shoot(state, shooter, shootConfig) {

		this.state = state;
		this.game = state.game;

		this.shooter = shooter;
		this.shootConfig = shootConfig;


		this.bullets = [];

		this.t = [];

		for (var j = 0; j < shootConfig.nShoots; j++) {



			this.t[j] = window.setTimeout((function(that, x) { return function() {	

				var config = that.shootConfig;



				var shootAngle;

				if (config.shootAngle === 999) {	

					shootAngle = that.shooter.getAngleTo(that.state.player);

				} else if (config.shootAngle === -999) {	
					shootAngle = that.game.rnd.realInRange(0, 2 * Math.PI);

				} else {
					shootAngle = config.shootAngle;
				}


				shootAngle += x * config.shootRotationSpeed;


				var bulletAngleStep = 0;

				if (config.nBullets > 1) {

					if (config.bulletSpread === 0) { 
						bulletAngleStep = 2 * Math.PI / config.nBullets;

					} else {
						bulletAngleStep = config.bulletSpread;
					}
				}


				for (var i = 0; i < config.nBullets; i++) {

					if (that.state.bulletPoolsMob[config.bulletType].countDead() > 0) {

						that.bullets[i] = that.state.bulletPoolsMob[config.bulletType].getFirstExists(false);


						var angle;

						if (config.bulletSpread === 0) {
							angle = shootAngle + (i * bulletAngleStep);

						} else {
							angle = shootAngle + ((i - (config.nBullets - 1) / 2) * bulletAngleStep);
						}

						if (angle < 0 || angle >= 2 * Math.PI) {
							angle = angle % (2 * Math.PI);

						}

						that.bullets[i].revive(shooter, angle);
					}
				}
			}; })(this, j), j * shootConfig.shootDelay);
		}
	}

	Shoot.prototype.die = function (bulletCancel) {

		if (bulletCancel) {
			this.bullets.forEach(function(bullet) {
				bullet.kill();
			});
		}

		this.t.forEach(function(timer) {
			window.clearTimeout(timer);
		});
	};


	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Shoot = Shoot;
}());



