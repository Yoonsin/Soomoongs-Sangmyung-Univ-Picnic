import { CST } from "../CST.js";

export class InsaScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.INSA
    })

    this.ingameMusic;

     this.player; //플레이어 변수 추가
     this.playerSpeed;//플레이어 스피드 변수 추가
     this.keys; //**키 플러그인 변수 추가 
     this.cursorKeys; //키보드 변수 추가
     
    
     this.second; //시간 받아오는 변수 추가
     this.textTime; //시간 변수 추가

     this.life; //생명 받아오는 변수 추가
     this.textLife; //생명 변수 추가

     this.score; //점수 받아오는변수 추가  
     this.textScore //점수 변수 추가
    
     this.laserGroup; //총알 변수 추가

     this.enemy; //적의 속성 지정   
     this.enemySpeedY; //적의 스피드Y 변수 
     this.enemyDelay; //적이 나오는 간격 지정

     this.wallCeiling; //맨 윗 천장
     this.wallFloor; //맨 아랫 바닥
    
  }

  init(data) {
    this.data = data;
  }

  preload() {
    
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화

    //this.add.image(0, 0, "shooting_bg").setOrigin(0).setDepth(0);
    this.add.image(0, 0, "bullet_bg_cloudless").setOrigin(0).setDepth(0); //배경 불러오기
    this.add.image(0, 780, "bullet_line").setOrigin(0).setDepth(0); //경계선 불러오기
    
    this.ballDelay = 300; //공 나오는 간격 지정 (*1000 == 1초)
    this.enemyDelay = 800; //적 나오는 간격 지정

    this.laserGroup = new LaserGroup(this); //총알 그룹 객체 생성

    this.keys= this.input.keyboard; //**키 플러그인 설정
    this.cursorKeys=this.input.keyboard.createCursorKeys(); //키보드 입력 설정

    this.drawPlayer(); //플레이어 그리기
    this.drawEnemy(); //적 그리기
    this.drawCollider(); //위,아래 콜라이더 그리기   
    this.drawTime(); //시간 그리기  
    this.drawLife(); //남은 체력 그리기   
    this.drawScore(); //점수 그리기
    this.addEvents(); //마우스에 따라 플레이어 이동

    //타이머로 0.2초 간격으로 적이 나오도록 설정하기
    this.time.addEvent({
      delay: this.enemyDelay, //0.2초당 1발 발사
      callback: () => this.drawEnemy(), 
      callbackScope: this,
      loop: true, 
    }); 

  }

  drawPlayer() {
    
    this.playerSpeed=600;//**플레이어 스피드 설정
    this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height - 55 ,"bullet_player");//플레이어 이미지 위치 설정
    this.player.setCollideWorldBounds(true); //월드 바깥 이동 제한 (해상도 자체로 적용되기 때문에 투명도도 적용 된다. 최대한 오브제에 캔버스를 맞출 것.)

    this.player.body.immovable = true; //공이랑 부딫혔을 때 못 움직이도록 하기
      
  }

  drawCollider() {
    
    this.wallCeiling = this.physics.add.sprite(0, -45, "collider").setOrigin(0); //맨 윗 천장
    this.wallCeiling.enableBody=true; //충돌속성 설정
    this.wallCeiling.body.immovable = true; //충돌해도 안움직이게 설정
    this.wallCeiling.setVisible(false); //일단 안보이게
    
    this.wallFloor = this.physics.add.sprite(0, this.game.renderer.height-15, "collider").setOrigin(0); //맨 아랫 바닥
    this.wallFloor.enableBody=true; //충돌속성 설정
    this.wallFloor.body.immovable = true; //충돌해도 안움직이게 설정
    this.wallFloor.setVisible(false); //일단 안보이게
    


  }  
  
  drawEnemy() {

    this.enemy=this.add.group(); //공 모두에 적용되게 그룹으로 묶기
    this.enemy.x = Phaser.Math.Between(20,680);
    this.enemy.y = Phaser.Math.Between(0,30); //적이 나타날 위치 랜덤으로 설정        
    
    this.enemySpeedY = Phaser.Math.Between(100,200); //공의 스피드 랜덤설정
    this.enemy=this.physics.add.sprite(this.enemy.x, this.enemy.y, "bullet_book").setScale(2);

    this.enemy.setVelocityY(this.enemySpeedY); //적 움직이기
    this.enemy.enableBody=true; //적에 충돌속성 설정
    this.enemy.body.immovable = true; //충돌해도 공 안움직이게 설정

    this.physics.add.collider(this.enemy,  this.laserGroup, this.collisionDetectionEnemy, null, this); //적,레이저 충돌 설정 
    this.physics.add.collider(this.enemy,  this.wallFloor, this.collisionDetectionFloor, null, this); //적,아래 충돌 설정 
  }

  //마우스 이동
  addEvents() {
	  this.input.on('pointermove', (pointer) => {
		this.player.x = pointer.x;
	  });

   //클릭하면 총알 발사
    this.input.on('pointerdown', pointer => {
		this.shootLaser();
	  });
    }

  drawTime() {
    this.second = 0;
    this.textTime = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"}); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second++,
      callbackScope: this,
      loop: true, 
    }); //시간 받아오는 타이머 함수
    
  } 

  drawLife() {

    this.life = 3; //목숨 초기화
    this.textLife = this.add.text(this.game.renderer.width-80,10,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});
    
  }

  drawScore() {

    this.score = 0; //점수 초기화
    this.textScore = this.add.text(10,50,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});
    
  }  


  collisionDetectionFloor(enemy,wallFloor) {

    enemy.destroy(); //바닥에 적이 부딫히면 사라지고
    this.life--; //생명이 하나 깎임
  }

  collisionDetectionEnemy(enemy,laserGroup) {

    
    enemy.destroy(); //계속 프레임마다 실행될 순 없으니 적은 아예 없애주고
    laserGroup.setActive(false); //총알은 무한대로 계속 생성해야 하니
		laserGroup.setVisible(false); //비활성화만
    this.score++; //점수가 하나 오름
    
  }

  shootLaser() {
    // 사운드 설정 - 수정1
    this.shot = this.sound.add("gunshot", { volume: 0.5, loop: false });
    this.shot.play();  // 수정2
	  this.laserGroup.fireLaser(this.player.x, this.player.y - 20);
}

   
  //바닥에 닿으면 파괴&생명 깎임
  
  update() {
    //플레이어 이동
    this.player.setVelocity(0); //키를 누를 동안만 움직이도록 하기 위해 평소엔 0만큼 이동
    
    this.textTime.setText("Time : "+ this.second); //시간 설정
    this.textLife.setText("Life : "+ this.life); //남은 체력 설정    
    this.textScore.setText("Score : "+ this.score); //점수 설정    
    
    //X축 이동
    if(this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    }
    
    if(this.cursorKeys.space.isDown) {
      if(this.keys.checkDown(this.cursorKeys.space, 100)) //**0.1초 간격으로 발사됨
      {
        this.shootLaser();
      }
      
    }
    

  
    if(this.second == 20 && this.score >= 5) //만약 20초 지나면 && 점수가 5점을 넘으면
    {
      this.ingameMusic.destroy();
        this.data.cleared[2] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);//게임 클리어
      
    }

    if(this.life<=0) //만약 체력 다 떨어지면
    {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.SEOULOVER, this.data);//게임오버
    }
    
    

  }
  
}

//총알 담는 그룹 클래스
class LaserGroup extends Phaser.Physics.Arcade.Group
  {
    constructor(scene) {

      super(scene.physics.world, scene);
      this.createMultiple({
			classType: Laser, // 총알 클래스 
			frameQuantity: 30, // 만들 인스턴스의 갯수는 총 30개 
			active: false,
			visible: false,
			key: 'bullet' //총알 이미지로 설정
		  })
      
    }

    fireLaser(x, y) {
		//클래스에 첫번째 인스턴스 가져오기 
		const laser = this.getFirstDead(false);
		if (laser) {
			laser.fire(x, y);
		}
	  }

    

    
  }

//총알 속성 설정하는 클래스
class Laser extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet');
	}

  
    preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0) { //화면 바깥으로 나가면 없애주기
			this.setActive(false);
			this.setVisible(false);
		}
      
	 }

    fire(x, y) {
		this.body.reset(x, y);
 
		this.setActive(true);
		this.setVisible(true);
 
		this.setVelocityY(-600);
	  }

}

