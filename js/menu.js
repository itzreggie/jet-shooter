(function() {

	function Menu() {

		this.titleTxt = null;
		this.startTxt = null;
	}

	Menu.prototype = {

		create: function () {

			var x = this.game.width / 2
				, y = this.game.height / 2;


			this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Jet Shooter' );
			this.titleTxt.align = 'center';
			this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;
			this.titleTxt.y = this.titleTxt.y - this.titleTxt.height * 2 + 5;

			y = y + this.titleTxt.height + 5;
			this.startTxt = this.add.bitmapText(x, y, 'minecraftia', '_______________\nControls\nEnter : Start\nS : Shoot\nArrows : move\n_______________');
			this.startTxt.align = 'center';
			this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

			this.input.mouse.enabled = false;

		},

		update: function () {

			var keyboard = this.input.keyboard;

			if (keyboard.isDown(Phaser.Keyboard.ENTER)) {
				this.game.state.start('game');
			}
		},


	};

	window['firsttry'] = window['firsttry'] || {};
	window['firsttry'].Menu = Menu;

}());
