class PlayScene extends Phaser.Scene
{
	//First four methods are guaranteed to be called in a scene.
	constructor()
	{
		super('play');
		this.top_score = 0;
		this.winner = 'Top Score';
	}

	preload()
	{
		this.load.path = 'assets/';
		this.load.image('background', 'background.png');
		this.load.image('player', 'player.png');
		this.load.image('enemy', 'enemy.png');
		this.load.image('projectile', 'projectile.png');
	}

	create()
	{
		this.create_map();
		this.player = new Player(this);
		this.create_objects();
		this.setup_physics();
		this.setup_hud();
	}

	update(time)
	{
		this.player.move();
		this.player.attack(time);
		this.scroll_background();
		this.update_score();
	}

	create_map()
	{
		//this.add.image(640/2, 480/2, 'background');
		this.background = this.add.tileSprite(640/2, 480/2, 640, 480, 'background');
	}
	create_objects()
	{
		this.enemies = [];

		let event = new Object();
		event.delay = 400;
		event.callback = this.spawn_enemy;
		event.callbackScope = this;
		event.loop = true;

		this.time.addEvent(event, this);
	}
	spawn_enemy()
	{
		let position = new Object();
		position.x = Phaser.Math.Between(0, 640);
		position.y = -32;

		let monster = new Enemy(this, position);
		this.enemies.push(monster);
		this.score += 1;
	}
	game_over()
	{
		if (this.score > this.top_score)
		{
			this.top_score = this.score;
			this.winner = prompt("Winner! Enter your name: ");
			this.input.keyboard.keys = [];
		}
		this.scene.restart();

	}
	setup_physics()
	{
		//this.physics.add.overlap(object1, object2, behavior, additional, scope);
		this.physics.add.overlap(this.player, this.enemies, this.game_over, null, this);
		this.physics.add.overlap(this.player.projectiles, this.enemies, this.slay_enemy, null, this);
	}

	scroll_background()
	{
		this.background.tilePositionX -= -3;
	}

	setup_hud()
	{
		this.score = 0;
		this.score_text = this.add.text(32, 32, "");
		this.score_text.depth = 2;
		this.score_text.setColor('rgb(255, 0, 0)');


		this.top_score_text = this.add.text(608, 32, "" );
		this.top_score_text.depth = 2;
		this.top_score_text.setColor('rgb(255, 0, 0)');
		this.top_score_text.setOrigin(1, 0);
	}

	update_score()
	{
		this.score_text.setText("Score: " + this.score);
		this.top_score_text.setText(this.winner + ": " + this.top_score);
	}

	slay_enemy(projectile, enemy)
	{
		enemy.destroy();
		projectile.destroy();
	}
}