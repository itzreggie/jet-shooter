(function() {
	'use strict';



	function Actor(state, image) {

		this.state = state;
		this.game = state.game;


		window['firsttry'].Spriter.call(this, state, image);

		this.isPinnedToGround = false;
	}

	Actor.prototype = Object.create(window['firsttry'].Spriter.prototype);
	Actor.prototype.constructor = Actor;

	Actor.prototype.getAngleTo = function (target) {

		var angle;
		if (target.x || target.y) {

			angle = Math.atan2(target.x - this.x, target.y - this.y);
		}

		return angle;
	};



	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Actor = Actor;
}());