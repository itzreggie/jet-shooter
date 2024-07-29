var CONFIG = {
	GAME_WIDTH:   				320,
	GAME_HEIGHT:  				400,
	PIXEL_RATIO:  				2,

	WORLD_WIDTH: 					16,
	WORLD_HEIGHT: 				150,

	WORLD_SWAP_HEIGHT: 		8,

	MOBPOOL_SIZE: 				25,
	BULLETPOOL_SIZE: 			100,
	BULLETPOOL_SIZE_ENNEMY: 			100,
	BONUSPOOL_SIZE: 			20,

	CLOUDPOOL_SIZE: 			10,
	CLOUD_WIND_SPEED: 		20,

	SCROLL_SPEED: 				40,
	SCROLL_ACCEL: 				15,

	BLINK_DAMAGE_TIME: 		8,

	AUDIO_LEVEL: 					0.5,

	CLASS_STATS: 					[{	
		className: 					'Viper',
		health: 						360,
		speed: 							140,
		accel: 							8,
		strength: 					100,
		rate: 							8
	},{
		className: 					'Cobra',
		health: 						200,
		speed: 							160,
		accel: 							9,
		strength: 					80,
		rate: 							7
	},{
		className: 					'Anaconda',
		health: 						320,
		speed: 							140,
		accel: 							7,
		strength: 					100,
		rate: 							6
	},{
		className: 					'Boa',
		health: 						500,
		speed: 							100,
		accel: 							5,
		strength: 					150,
		rate: 							4
	}],

	DEBUG: {
		bottomInfos: 				true,
		tileset: 						false,
	},
};


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


(function () {
	'use strict';

	function Boot() {}

	Boot.prototype = {
		
		preload: function () {
			this.load.image('preloader', 'assets/preloader.gif');
		},
	
		create: function () {
			this.game.input.maxPointers = 1;
	
			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
			this.game.scale.refresh();
	
			this.game.state.start('preloader');
		}
	};

	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Boot = Boot;

}());

