import { CST } from "../CST.js";

export class GeulinScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.GEULIN
    })
    
    this.player; //플레이어 변수 
    this.playerSpeed;//플레이어 스피드 변수 

    this.enemy; //적 변수    
    this.enemyDelay; //적 나오는 시간간격 변수
    
    this.second; //시간 받아오는 변수
    this.textTime; //시간 표시하는 변수

    this.score; //점수 받아오는 변수
    this.textScore; //점수 표시하는 변수

    this.upArrow; //위쪽 방향키
    this.downArrow; //아랫쪽 방향키
    this.rightArrow; //오른쪽 방향키
    this.leftArrow; //왼쪽 방향키
    
    this.cursorKeys; //키보드 변수 
    this.ArrowPressed = [false, false, false, false]; //방향키 눌렸는지 여부



    
  }

  init(data) {
    this.data = data;
  }

  
  preload() {
    this.load.image("arrow","./assets/img/arrow.png");
  }
  
  create() {
    
  // 인게임 음악 재생
  this.data.titleMusic.stop();
  this.ingameMusic = this.sound.add("ingame", {loop: true});
  this.ingameMusic.play();
  // 버튼 효과음
  this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

  this.add.image(0, 0, "yeahsool_bg").setOrigin(0).setDepth(0); //배경 불러오기

  this.enemyDelay = Phaser.Math.Between(800,1500); //적 나오는 간격 지정
  this.cursorKeys=this.input.keyboard.createCursorKeys(); //키보드 입력 설정
    
  this.drawArrow(); //이동버튼 그리기
  this.drawPlayer(); //플레이어 그리기
  this.drawEnemy(); //적 그리기  
  this.drawTime(); //시간 그리기 
  this.drawScore(); //점수 그리기  


  //타이머로 0.8초 간격으로 적이 나오도록 설정하기
    this.time.addEvent({
      delay: this.enemyDelay, //0.8초당 1발 발사
      callback: () => this.drawEnemy(), 
      callbackScope: this,
      loop: true, 
    }); 
  
  }

  drawArrow() {
    
    this.upArrow = this.add.image(600,700,"arrow").setDepth(3).setScale(1.2); //위쪽 방향키
    this.downArrow = this.add.image(600,800,"arrow").setRotation(Phaser.Math.DegToRad(180)).setDepth(3).setScale(1.2); //오른쪽 방향키
    this.rightArrow = this.add.image(650,750,"arrow").setRotation(Phaser.Math.DegToRad(90)).setDepth(3).setScale(1.2); //오른쪽 방향키
    this.leftArrow = this.add.image(550,750,"arrow").setRotation(Phaser.Math.DegToRad(270)).setDepth(3).setScale(1.2); //왼쪽 방향키
  
    this.upArrow.setInteractive(); //위쪽 방향키
    this.downArrow.setInteractive(); //아랫쪽 방향키
    this.rightArrow.setInteractive(); //오른쪽 방향키
    this.leftArrow.setInteractive(); //왼쪽 방향키

    this.upArrow.on("pointerdown", ()=>{
       this.ArrowPressed[0] = true;
    })
    this.downArrow.on("pointerdown", ()=>{
       this.ArrowPressed[1] = true;
    })
    this.leftArrow.on("pointerdown", ()=>{
       this.ArrowPressed[2] = true;
    })
    this.rightArrow.on("pointerdown", ()=>{
       this.ArrowPressed[3] = true;
    })

    this.upArrow.on("pointerup", ()=>{
       this.ArrowPressed[0] = false;
    })
    this.upArrow.on("pointerout", ()=>{
       this.ArrowPressed[0] = false;
    })
    this.downArrow.on("pointerup", ()=>{
       this.ArrowPressed[1] = false;
    })
    this.downArrow.on("pointerout", ()=>{
       this.ArrowPressed[1] = false;
    })
    this.leftArrow.on("pointerup", ()=>{
       this.ArrowPressed[2] = false;
    })
    this.leftArrow.on("pointerout", ()=>{
       this.ArrowPressed[2] = false;
    })
    this.rightArrow.on("pointerup", ()=>{
       this.ArrowPressed[3] = false;
    })
    this.rightArrow.on("pointerout", ()=>{
       this.ArrowPressed[3] = false;
    })

    
  }

  drawPlayer() {
    
    this.playerSpeed=400;//플레이어 스피드 설정
    this.player = this.physics.add.sprite(50,50,"bullet_player").setScale(1).setDepth(2);//플레이어 이미지 위치 설정
    this.player.setCollideWorldBounds(true); //월드 바깥 이동 제한 (해상도 자체로 적용되기 때문에 투명도도 적용 된다. 최대한 오브제에 캔버스를 맞출 것.)
    this.player.body.immovable = true; //적이랑 부딫혔을 때 못 움직이도록 하기
      
  }

  drawEnemy() {

    this.enemy = this.add.group(); //적 모두에게 적용되게 그룹으로 묶기
    this.enemy.x = Phaser.Math.Between(20,680);
    this.enemy.y = Phaser.Math.Between(30,870); //적이 나타날 위치 랜덤으로 설정
    this.enemy=this.physics.add.sprite(this.enemy.x, this.enemy.y, "bullet_book").setScale(2);

    this.enemy.enableBody=true; //적에 충돌속성 설정
    this.enemy.body.immovable = true; //충돌해도 적 안움직이게 설정
    this.enemy.setCollideWorldBounds(true); //월드 바깥 이동 제한
    this.physics.add.collider(this.enemy,  this.player, this.collisionDetectionEmeny, null, this); //플레이어, 적 충돌 설정 
    
  }

  collisionDetectionEmeny(enemy,player) {
    
    enemy.destroy(); //바닥에 적이 부딫히면 사라지고
    this.score++; //점수가 하나 플러스
    

 }
  
  drawTime() {
    
    this.second = 15;
    this.textTime = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang" , fill: "#0000FF"}).setDepth(4); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second--,
      callbackScope: this,
      loop: true, 
    }); //시간 받아오는 타이머 함수
  }

  drawScore() {

    this.score = 0; //점수 초기화
    this.textScore = this.add.text(10,50,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#0000FF"});
    
  }  

 



  update() {
    
    this.player.setVelocity(0); //키를 누를 동안만 움직이도록 하기 위해 평소엔 0만큼 이동
    this.textTime.setText("time : "+ this.second) ; //시간 설정
    this.textScore.setText("Score : "+ this.score); //점수 설정    
    
    
    
    //Y축 이동
    if(this.cursorKeys.up.isDown) { 
      this.player.setVelocityY(-this.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    }
    //X축 이동
    if(this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    }

    //Y축 이동
    if(this.ArrowPressed[0] == true) //위
    {
      this.player.setVelocityY(-this.playerSpeed);
    }
    if(this.ArrowPressed[1] == true) ///아래
    {
      this.player.setVelocityY(this.playerSpeed);
    }

    //X축 이동
    if(this.ArrowPressed[2] == true) //왼
    {
      this.player.setVelocityX(-this.playerSpeed);
    }
    if(this.ArrowPressed[3] == true) //오
    {
      this.player.setVelocityX(this.playerSpeed);
    }

    if (this.score == 10 ) //10개 먹으면
    {
      this.ingameMusic.destroy(); //게임 클리어
      this.data.cleared[4] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);
    } 
    if (this.second == 0) //20초 지나면 
    {
      this.ingameMusic.destroy(); //게임 오버
      this.scene.start(CST.SCENES.CHEONOVER, this.data);
    }
    
    
  }
}
