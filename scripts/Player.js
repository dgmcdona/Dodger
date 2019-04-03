class Player extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene)
	{
		super(scene, 300, 200, 'player');
		this.depth = 1;
		this.speed = 500;
		this.scene = scene;
		this.projectiles = [];
		this.last_fired = 0;

		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.setCollideWorldBounds(true);
		this.body.setSize(this.width=16, this.height=16);

		this.arrowKeys = scene.input.keyboard.addKeys('w,s,a,d,space')
	}

	move()
	{

		this.body.acceleration.x = 0;
		this.body.acceleration.y = 0;
		if (this.arrowKeys.w.isDown){
			this.body.acceleration.y = -this.speed; 
			//console.log("w");
		}
		if (this.arrowKeys.s.isDown){
			this.body.acceleration.y = this.speed;
		}
		if (this.arrowKeys.a.isDown){
			this.body.acceleration.x = -this.speed;
		}
		if (this.arrowKeys.d.isDown){
			this.body.acceleration.x = this.speed;
		}
		
	}

	attack(time)
	{
		if (this.arrowKeys.space.isDown && time - this.last_fired > 400)
		{
			let position = new Object();
			position.x = this.x;
			position.y = this.y;

			let laser = new Projectile(this.scene, position);
			this.projectiles.push(laser);
			this.last_fired = time;
		}
		if (this.arrowKeys.space.isUp)
		{
			this.last_fired = 0;
		}
	}
	
}