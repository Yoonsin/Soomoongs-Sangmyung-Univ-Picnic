import { CST } from "../CST.js";

export class TwoGyeongScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.TWOGYEONG
    })

    this.ingameMusic;

    this.player; //플레이어 변수 추가
    this.playerSpeed; //플레이어 스피드 변수 추가

    this.paddle; //패들 변수 추가
    this.paddleSpeed //패들 스피드 변수 추가

    this.ball; //공 변수 추가
    this.ballSpeed; //공 스피드 변수 추가    

  
    this.brickNum; //벽돌 갯수 변수 추가
    this.brick_row1; 
    this.brick_row2;
    this.brick_row3; //열마다 추가할 벽돌 변수 추가
    
    this.cursorKeys; //키보드 변수 추가
    
    this.second; //시간 받아오는 변수 추가
    this.textTime; //시간 변수 추가

    this.score; //점수 받아오는 변수 추가
    this.textScore; //점수 변수 추가

    this.life; //생명 받아오는 변수 추가
    this.textLife; //생명 변수 추가

    this.score; //점수 받아오는 변수 추가  
    this.textScore //점수 변수 추가
    
    this.wallFloor; //맨 아랫 바닥

  
  }

  init(data) {
    this.data = data;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    this.add.image(0, 0, "bullet_bg_cloudless").setOrigin(0).setDepth(0);

    this.cursorKeys=this.input.keyboard.createCursorKeys(); //키보드 입력 설정
    
    // 사운드 설정 - 수정1
    this.crash = this.sound.add("brick_break", { volume: 1, loop: false });

    this.drawPlayer(); //플레이어 그리기
    this.drawPaddle(); //패들 그리기
    this.drawCollider(); //아래 콜라이더 그리기
    this.drawBrick(); //벽돌 그리기
    this.drawBall(); //공 그리기
    this.drawTime(); //시간 그리기  
    this.drawScore(); //점수 그리기
    this.drawLife(); //남은 체력 그리기    
    this.addEvents(); //마우스에 따라 플레이어 이동
  }

  drawPlayer() {
    this.playerSpeed = 900; //**플레이어 스피드 설정
    this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height - 50,"bullet_player"); //플레이어 이미지 위치 설정
    this.player.setCollideWorldBounds(true); //월드 바깥 이동 제한 (해상도 자체로 적용되기 때문에 투명도도 적용 된다. 최대한 오브제에 캔버스를 맞출 것.)

    this.player.body.immovable = true; //공이랑 부딫혔을 때 못 움직이도록 하기

    
  }

  drawPaddle() {
    this.paddleSpeed = 900; //**패들 스피드 설정
    this.paddle = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height - 110, "brick_paddle" ); //플레이어 이미지 위치 설정
    this.paddle.setCollideWorldBounds(true); //월드 바깥 이동 제한 (해상도 자체로 적용되기 때문에 투명도도 적용 된다. 최대한 오브제에 캔버스를 맞출 것.)
    
    this.paddle.body.immovable = true; //공이랑 부딫혔을 때 못 움직이도록 하기

    
  }  

  drawBall() {

    this.ballSpeed = 800; //공 스피드 설정
    this.ball=this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height - 130, "bullet");
    
    this.ball.setVelocityX(this.ballSpeed);
    this.ball.setVelocityY(this.ballSpeed); //공 움직이기
    this.ball.setBounce(1); //공이 부딫히면 튀기도록 설정
    
    this.ball.enableBody=true; //공에 충돌속성 설정
    this.ball.body.immovable = true; //충돌해도 공 안움직이게 설정
    this.ball.setCollideWorldBounds(true); //월드 바깥 이동 제한
    
    this.physics.add.collider(this.ball, this.paddle, this.collisionDetectionPaddle, null, this); //공과 패들의 충돌 설정
    this.physics.add.collider(this.ball, this.wallFloor, this.collisionDetectionFloor, null, this); //공과 아랫 바닥과의 충돌 설정
    this.physics.add.collider(this.ball, this.brick_row1, this.collisionDetectionBrick, null, this); //공과 벽돌과의 충돌 설정
    this.physics.add.collider(this.ball, this.brick_row2, this.collisionDetectionBrick, null, this); //공과 벽돌과의 충돌 설정
    this.physics.add.collider(this.ball, this.brick_row3, this.collisionDetectionBrick, null, this); //공과 벽돌과의 충돌 설정
    

  }

  collisionDetectionPaddle(ball,paddle) {
    this.ball.setVelocityY(-this.ballSpeed); //패들에 부딫히면 튕겨내기
  }

  drawBrick() {
    this.brickNum = 21; //벽돌의 갯수는 3x7 21개
    this.brick_row1 = this.physics.add.group({ key: "brick", repeat: 6, immovable: true, setXY: {x: 80, y: 120, stepX: 90} });
    this.brick_row2 = this.physics.add.group({ key: "brick_2", repeat: 6, immovable: true, setXY: {x: 80, y: 180, stepX: 90} });
    this.brick_row3 = this.physics.add.group({ key: "brick_3", repeat: 6, immovable: true, setXY: {x: 80, y: 240, stepX: 90} });

  }

  collisionDetectionBrick(ball,brick) {
    brick.destroy();
    this.crash.play();  // 수정2
    if(ball.y> brick.y)
    {
      this.ball.setVelocityY(this.ballSpeed); //공이 위쪽으로 갈 때 팅겨남
    }
    else
    {
      this.ball.setVelocityY(-this.ballSpeed); //공이 아래쪽으로 갈 때 팅겨남
    }
    
    this.score++; //벽돌 1개 = 점수 1 플러스    
  }

  drawCollider() {
    this.wallFloor = this.physics.add.sprite(0, this.game.renderer.height-15, "collider").setOrigin(0); //맨 아랫 바닥
    this.wallFloor.enableBody=true; //충돌속성 설정
    this.wallFloor.body.immovable = true; //충돌해도 안움직이게 설정
    this.wallFloor.setVisible(false); //일단 안보이게
    //this.wallFloor.setVisible(true); //보이게 설정
  }  

  collisionDetectionFloor(ball,wallFloor) {
    ball.destroy(); //아랫 바닥에 부딫히면 볼 부셔주고(프레임마다 실행되면 생명이 여러개 깎이기 때문에 없애줘야됨)
    this.drawBall(); //다시 공 그려주기 
    this.player.x = this.game.renderer.width / 2;    
    this.paddle.x = this.game.renderer.width / 2; //공 위치가 초기화됨에 따라 플레이어와 패들 위치도 초기화
    this.life--; //생명을 하나 깎기
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

  drawScore() {
    this.score = 0; //점수 초기화
    this.textScore = this.add.text(10,50,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});    
  }

  drawLife() {
    this.life = 3; //목숨 초기화
    this.textLife = this.add.text(this.game.renderer.width-80,10,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});
  }

  addEvents() {
    this.input.on('pointermove', (pointer) => {
		this.player.x = pointer.x;
    this.paddle.x = pointer.x;
	  });
    
  }


  
  update() {

    this.player.setVelocity(0); 
    this.paddle.setVelocity(0); //키를 누를 동안만 움직이도록 하기 위해 평소엔 0만큼 이동
    
    this.textTime.setText("Time : "+ this.second); //시간 설정
    this.textScore.setText("Score : "+ this.score); //점수 설정
    this.textLife.setText("Life: "+ this.life); //남은 체력 설정    
        
  
 
    //X축 이동
    if(this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.paddle.setVelocityX(-this.paddleSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.paddle.setVelocityX(this.paddleSpeed);
    }

    if(this.score==21) //만약 벽돌을 다 뿌셔버렸으면
    {
      this.ingameMusic.destroy();
        this.data.cleared[5] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);//게임 클리어
      
    }

    if(this.life==0) //만약 체력 다 떨어지면
    {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.SEOULOVER, this.data);//게임오버

    }
 
  }

}