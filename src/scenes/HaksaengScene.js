import { CST } from "../CST.js";

export class HaksaengScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.HAKSAENG
    })

    this.ingameMusic;
    
    this.player;
    this.playerSpeed;

    this.foodList = ["apple", "rice", "soup", "drink"];
    this.foodSpeed = [300, 500, 400, 250];
    
    this.second;  // 시간
    this.score;   // 먹은 음식 수
    this.life;    // 생명: 2개(드링크 개수)

    this.textScore;
    this.textLife;
  }
  
  init(data) {
    this.data = data;
  }

  preload() {
    this.score = 0;
    this.life = 2;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    // 배경 이미지
    this.add.image(0, 0, "mibaek_bg").setOrigin(0).setDepth(0);
    // 텍스트 객체 생성 - 먹은 음식 수 (점수)
    this.textScore = this.add.text(10, 40, "", { fontSize: "25px", fontFamily: "Malang", fill: "#000000"});
    // 텍스트 객체 생성 - 남은 생명
    this.textLife = this.add.text(this.game.renderer.width-80, 10, "", { fontSize: "25px", fontFamily: "Malang" , fill: "#000000"});
    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    this.drawTimer();
    this.drawApple();   // 사과 그리기
    this.drawRice();    // 밥 그리기
    this.drawSoup();    // 국 그리기
    this.drawDrink1();   // 드링크 그리기
    this.drawDrink2();
  }

  update() {
    this.textTime.setText("Time : "+ this.second) ; //시간 출력
    this.textScore.setText("Score: "+ this.score); // 점수 출력
    this.textLife.setText("Life : "+ this.life) ; //남은 생명 출력

    // 게임 종료 판정
    if (this.score < 0 || this.life <= 0 || this.second < 0) {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.CHEONOVER, this.data);
    }
    else if (this.score >= 30) {
      this.ingameMusic.destroy();
        this.data.cleared[0] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);
    }
  }

  drawTimer() {
    this.second = 15;
    this.textTime = this.add.text(10, 10, "", { fontSize: "25px", fontFamily: "Malang" , fill: "#FFFFFF"}); // 텍스트 객체 생성 - 시간
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second--,
      callbackScope: this,
      loop: true, 
    }); //시간 받아오는 타이머 함수
  }

  drawApple() {
    this.apple_Speed = this.foodSpeed[0]; //사과 속도 설정
    this.apple_x = Phaser.Math.Between(100, 600);  // 사과 위치 랜덤
    this.apple_y = Phaser.Math.Between(100, 800);

    // 그림 띄우기
    this.apple = this.physics.add.sprite(this.apple_x, this.apple_y, this.foodList[0]).setOrigin(0).setDepth(1).setScale(1.5);

    // 사과 버튼화
    this.apple.setInteractive({ draggable: false, cursor: "pointer" });
    this.apple.on("pointerup", ()=>{
      this.button_click.play();
      this.score += 3;
      this.apple.x = Phaser.Math.Between(100, 600);  // 사과 위치 재설정
      this.apple.y = Phaser.Math.Between(100, 800);
    })
    
    this.apple.setVelocityX(this.apple_Speed);
    this.apple.setVelocityY(this.apple_Speed); // 사과 움직이기
    this.apple.setBounce(1); // 사과 탄성 활성화
    
    this.apple.enableBody=true; // 사과 충돌속성 설정
    this.apple.body.immovable = true; // 충돌해도 사과 안움직이게 설정
    this.apple.setCollideWorldBounds(true); // 월드 바깥 이동 제한
  }

  drawRice() {
    this.rice_Speed = this.foodSpeed[1]; // 밥 속도 설정
    this.rice_x = Phaser.Math.Between(100, 600);  // 밥 위치 랜덤
    this.rice_y = Phaser.Math.Between(100, 800);

    // 그림 띄우기
    this.rice = this.physics.add.sprite(this.rice_x, this.rice_y, this.foodList[1]).setOrigin(0).setDepth(1).setScale(1.5);

    // 밥 버튼화
    this.rice.setInteractive({ draggable: false, cursor: "pointer" });
    this.rice.on("pointerup", ()=>{
      this.button_click.play();
      this.score += 5;
      this.rice.x = Phaser.Math.Between(100, 600);  // 밥 위치 재설정
      this.rice.y = Phaser.Math.Between(100, 800);
    })
    
    this.rice.setVelocityX(this.rice_Speed);
    this.rice.setVelocityY(this.rice_Speed); // 밥 움직이기
    this.rice.setBounce(1); // 밥 탄성 활성화
    
    this.rice.enableBody=true; // 밥 충돌속성 설정
    this.rice.body.immovable = true; // 충돌해도 밥 안움직이게 설정
    this.rice.setCollideWorldBounds(true); // 월드 바깥 이동 제한
  }

  drawSoup() {
    this.soup_Speed = this.foodSpeed[2]; // 국 속도 설정
    this.soup_x = Phaser.Math.Between(100, 600);  // 국 위치 랜덤
    this.soup_y = Phaser.Math.Between(100, 800);

    // 그림 띄우기
    this.soup = this.physics.add.sprite(this.soup_x, this.soup_y, this.foodList[2]).setOrigin(0).setDepth(1).setScale(1.5);

    // 국 버튼화
    this.soup.setInteractive({ draggable: false, cursor: "pointer" });
    this.soup.on("pointerup", ()=>{
      this.button_click.play();
      this.score += 7;
      this.soup.x = Phaser.Math.Between(100, 600);  // 국 위치 재설정
      this.soup.y = Phaser.Math.Between(100, 800);
    })
    
    this.soup.setVelocityX(this.soup_Speed);
    this.soup.setVelocityY(this.soup_Speed); // 국 움직이기
    this.soup.setBounce(1); // 국 탄성 활성화
    
    this.soup.enableBody=true; // 국 충돌속성 설정
    this.soup.body.immovable = true; // 충돌해도 국 안움직이게 설정
    this.soup.setCollideWorldBounds(true); // 월드 바깥 이동 제한
  }

  drawDrink1() {
    this.drink1_Speed = this.foodSpeed[3]; // 드링크 속도 설정
    this.drink1_x = Phaser.Math.Between(100, 600);  // 드링크 위치 랜덤
    this.drink1_y = Phaser.Math.Between(100, 800);

    // 그림 띄우기
    this.drink1 = this.physics.add.sprite(this.drink1_x, this.drink1_y, this.foodList[3]).setOrigin(0).setDepth(1).setScale(1.5);

    // 드링크 버튼화
    this.drink1.setInteractive({ draggable: false, cursor: "pointer" });
    this.drink1.on("pointerup", ()=>{
      this.button_click.play();
      this.life--;

      this.drink1.destroy();
    })
    
    this.drink1.setVelocityX(this.drink1_Speed);
    this.drink1.setVelocityY(this.drink1_Speed); // 드링크 움직이기
    this.drink1.setBounce(1); // 드링크 탄성 활성화
    
    this.drink1.enableBody=true; // 드링크 충돌속성 설정
    this.drink1.body.immovable = true; // 충돌해도 드링크 안움직이게 설정
    this.drink1.setCollideWorldBounds(true); // 월드 바깥 이동 제한
  }

  drawDrink2() {
    this.drink2_Speed = this.foodSpeed[3]; // 드링크 속도 설정
    this.drink2_x = Phaser.Math.Between(100, 600);  // 드링크 위치 랜덤
    this.drink2_y = Phaser.Math.Between(100, 800);

    this.drink2 = this.physics.add.sprite(this.drink2_x, this.drink2_y, this.foodList[3]).setOrigin(0).setDepth(1).setScale(1.5);

    // 드링크 버튼화
    this.drink2.setInteractive({ draggable: false, cursor: "pointer" });
    this.drink2.on("pointerup", ()=>{
      this.button_click.play();
      this.life--;
      
      this.drink2.destroy();
    })
    
    this.drink2.setVelocityX(this.drink2_Speed);
    this.drink2.setVelocityY(this.drink2_Speed); // 드링크 움직이기
    this.drink2.setBounce(1); // 드링크 탄성 활성화
    
    this.drink2.enableBody=true; // 드링크 충돌속성 설정
    this.drink2.body.immovable = true; // 충돌해도 드링크 안움직이게 설정
    this.drink2.setCollideWorldBounds(true); // 월드 바깥 이동 제한
  }
}
