import { CST } from "../CST.js";

export class MibaekScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MIBAEK
    })

    this.ingameMusic;

    this.player;
    this.playerSpeed;

    this.cursorKeys; //**키보드 변수 추가
    
    this.foodList = ["apple", "rice", "soup", "drink"];
    this.whichFood;
    this.food;
    this.foodSpeedY;

    this.wallCeiling;
    this.wallFloor;

    this.getting;   // 먹은 음식 수
    this.life       // 체력 (놓쳐도 되는 음식 수)

    this.textGetting;
    this.textLife;
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.getting = 0;
    this.life = 3;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    // 배경 이미지
    this.add.image(0, 0, "mibaek_bg").setOrigin(0).setDepth(0);
    // 텍스트 객체 생성 - 먹은 음식 수
    this.textGetting = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});
    // 텍스트 객체 생성 - 체력 출력
    this.textLife = this.add.text(this.game.renderer.width-80,10,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#000000"});
    //**키보드 입력 설정
    this.cursorKeys=this.input.keyboard.createCursorKeys();

    this.drawPlayer();

    this.drawCollider();

    this.drawFood();
    
    this.addEvents();
  }

  update() {
    this.textGetting.setText("Getting: "+ this.getting); // 먹은 음식 수 출력
    this.textLife.setText("Life: "+ this.life); // 남은 체력 출력  

    this.player.setVelocity(0); //**키를 누를 동안만 움직이도록 하기 위해 평소엔 0만큼 이동
    if(this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);    
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    }
  }
  
  // 함수 선언
  
  // 플레이어 그리기
  drawPlayer() {
    this.playerSpeed = 750; //**플레이어 스피드
    this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height - 55, "bullet_player"); // 위치 선정
    this.player.setCollideWorldBounds(true);  // 월드 바깥 이동 제한
    
    this.player.body.immovable = true   // 충돌해도 움직이지 않게 하기
  }

  // 천장, 바닥 충돌 콜라이더 그리기
  drawCollider() {
    // 천장 콜라이더 스프라이트 그리기
    this.wallCeiling = this.physics.add.sprite(0, -45, "collider").setOrigin(0);
    this.wallCeiling.enableBody = true;     // 충돌 속성 설정
    this.wallCeiling.body.immovable = true; //충돌해도 움직이지 않게 하기
    this.wallCeiling.setVisible(false);     // 비가시화
    
    // 바닥 콜라이더 스프라이트 그리기
    this.wallFloor = this.physics.add.sprite(0, this.game.renderer.height - 15, "collider").setOrigin(0);
    this.wallFloor.enableBody = true;     // 충돌 속성 설정
    this.wallFloor.body.immovable = true; // 충돌해도 움직이지 않게 하기
    this.wallFloor.setVisible(false);     // 비가시화
  }

  // 음식 그리고 이동하기
  drawFood() {
    if (this.getting < 30 && this.life > 0) {
      // 음식 나타날 위치 설정
      this.foodX = Phaser.Math.Between(20, 680);
      this.foodY = 0;

      // 떨어지는 속도 랜덤 설정
      if (this.getting < 5) {
        this.foodSpeedY = Phaser.Math.Between(500, 700);
      } else if (this.getting < 10) {
        this.foodSpeedY = Phaser.Math.Between(500, 900);
      } else if (this.getting < 15) {
        this.foodSpeedY = Phaser.Math.Between(700, 1000);
      } else if (this.getting < 20) {
        this.foodSpeedY = Phaser.Math.Between(700, 1200);
      } else if (this.getting < 25) {
        this.foodSpeedY = Phaser.Math.Between(900, 1400);
      } else {
        this.foodSpeedY = Phaser.Math.Between(1000, 1500);
      }

      // 음식 종류 고르기
      this.whichFood = this.foodList[Phaser.Math.Between(0, 3)]
      this.food = this.physics.add.sprite(this.foodX, this.foodY, this.whichFood);

      this.food.setVelocityY(this.foodSpeedY);  // 수직으로 움직이기
      this.food.enableBody = true;      // 음식에 충돌 속성 설정
      this.food.body.immovable = true;  // 충돌해도 움직이지 않게 하기

      // 플레이어 충돌
      this.physics.add.collider(this.food, this.player, this.collisionDetectionFood, null, this); // 충돌 설정
      // 바닥 충돌
      this.physics.add.collider(this.food, this.wallFloor, this.collisionDetectionFloor, null, this); // 충돌 설정
    }
    else if (this.life <= 0) {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.SEOULOVER, this.data);
    }
    else if (this.getting >= 30) {
      this.ingameMusic.destroy();
        this.data.cleared[0] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);
    }
  }

  // (음식, 플레이어) 충돌 시 호출되는 함수
  collisionDetectionFood(food, player) {
    food.destroy();
    if (this.whichFood == "drink") {
      this.life--;
    }
    this.getting++;
    this.drawFood();
  }
  // 바닥 충돌 시 호출되는 함수
  collisionDetectionFloor(food, floor) {
    food.destroy();
    if (this.whichFood != "drink") {
      this.life--;
    }
    this.drawFood();
  }

  // 플레이어 이동
  addEvents() {   // 마우스로 이동하기
    this.input.on('pointermove', (pointer) => {
      this.player.x = pointer.x;
    });
  }
}
