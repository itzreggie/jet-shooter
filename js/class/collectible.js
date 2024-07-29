(function() {
	'use strict';


	function Collectible(state, image) {

		window['firsttry'].Actor.call(this, state, image);
	
		this.alive = true;
		this.updateClass();
	}

	Collectible.prototype = Object.create(window['firsttry'].Actor.prototype);
	Collectible.prototype.constructor = Collectible;

	Collectible.prototype.update = function () {

		window['firsttry'].Actor.prototype.update.call(this);

		if (this.y > CONFIG.GAME_HEIGHT * CONFIG.PIXEL_RATIO + 200) {
			this.kill();
			return;
		}
	};

	Collectible.prototype.updateClass = function () {

		this.bonusClass = this.state.rnd.integerInRange(0, 3);


		var fakeClass = this.bonusClass;
		if (fakeClass === 3) { fakeClass = 4; }

		var offset = fakeClass * 3;

		this.animations.add('idle', [0 + offset, 1 + offset, 2 + offset, 1 + offset], 15, true);
		this.play('idle');
	};



	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Collectible = Collectible;
}());