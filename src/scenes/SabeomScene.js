import { CST } from "../CST.js";

export class SabeomScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.SABEOM
    })

    this.ingameMusic;
    
    this.player; //플레이어 변수 
    this.playerSpeed;//플레이어 스피드 변수 
    
    this.cursorKeys; //키보드 변수 
    
    this.second; //시간 받아오는 변수
    this.textTime;//시간 표시하는 변수

    this.remainingball;//남은 빨간 공 받아오는 변수
    this.textRemainingball;//남은 빨간 공 표시하는 변수

    this.life; //남은 생명 받아오는 변수
    this.textLife; //남은 생명 표시하는 변수    
    this.colliderActivated;
    
    this.ball; //공의 속성 지정
    this.ballSpeedX; //공의 스피드X 변수
    this.ballSpeedY; //공의 스피드Y 변수
    this.ballNum; //공의 갯수
    this.surface; //겉면 표시하는 변수
    this.surface_2; //겉면 표시하는 변수
    
    this.enemy; //적의 속성 지정
    this.enemySpeedX; //적의 스피드X 변수
    this.enemySpeedY; //적의 스피드Y 변수
    this.enemyNum; //적의 갯수
    this.e_surface; //겉면 표시하는 변수
    this.e_surface_2; //겉면 표시하는 변수
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
    this.add.image(0, 0, "bullet_bg_cloudless").setOrigin(0).setDepth(0); //배경 불러오기
    this.colliderActivated = true;
    
    this.drawPlayer(); //플레이어 그리기
    this.drawBall(); //공 그리기 (빨간공)   
    this.drawEnemy(); //적 그리기 (파랑,녹색공)
    this.drawTime(); //시간 그리기  
    this.drawRemainingball(); //남은 빨간 공 그리기
    this.drawLife(); //남은 체력 그리기    
    this.addEvents(); //마우스에 따라 플레이어 이동
    this.remainingball = this.ballNum; //남은 공 = 빨간 공 갯수
    
    this.cursorKeys=this.input.keyboard.createCursorKeys(); //키보드 입력 설정

  }

  drawPlayer() {
    
    this.playerSpeed=500;//**플레이어 스피드 설정
    this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2,"bullet_player");//플레이어 이미지 위치 설정
    this.player.setCollideWorldBounds(true); //월드 바깥 이동 제한 (해상도 자체로 적용되기 때문에 투명도도 적용 된다. 최대한 오브제에 캔버스를 맞출 것.)

    this.player.body.immovable = true; //공이랑 부딫혔을 때 못 움직이도록 하기
      
  }
  
  drawBall() {
    
    this.ballNum = 5; //공의 갯수 설정
    
    this.ball=this.add.group(); //공 모두에 적용되게 그룹으로 묶기
    for(let i=0;i<this.ballNum;i++)
      {  
        this.ballSpeedX = Phaser.Math.Between(250, 400); //**공의 스피드 랜덤으로 설정
        this.ballSpeedY = Phaser.Math.Between(250, 400); //**공의 스피드 설정
        
         this.surface=Phaser.Math.Between(1, 2);
         if(this.surface==1) //맨 양쪽에서 출현
         {
           this.surface_2=Phaser.Math.Between(1, 2);
           if(this.surface_2==1) //**왼쪽에서 출현
           {
             this.ball=this.physics.add.sprite(20, 
             Phaser.Math.Between(20, 900), "a_score"); 
             
           }
           else if(this.surface_2==2) //**오른쪽에서 출현
           {
             this.ball=this.physics.add.sprite(680, 
             Phaser.Math.Between(20, 900), "a_score");
             
           }
         }
         else if(this.surface==2) //위아래에서 출현
         {
           this.surface_2=Phaser.Math.Between(1, 2);
           
           if(this.surface_2==1) //**위에서 출현
           {
             this.ball=this.physics.add.sprite(Phaser.Math.Between(20, 700), 
             20, "a_score");
             
           }
           else if(this.surface_2==2) //**아래서 출현
           {
             this.ball=this.physics.add.sprite(Phaser.Math.Between(20, 700), 
             880, "a_score");
             
           }
         }
        
         /*this.ball=this.physics.add.sprite(Phaser.Math.Between(0, 700), 
         Phaser.Math.Between(0, 900), "bullet");*/

         this.ball.setVelocityX(this.ballSpeedX);
         this.ball.setVelocityY(this.ballSpeedY); //공 움직이기
         this.ball.setBounce(1); //공이 부딫히면 튀기도록 설정
         this.ball.enableBody=true; //공에 충돌속성 설정
         this.ball.body.immovable = true; //충돌해도 공 안움직이게 설정
         this.ball.setCollideWorldBounds(true); //월드 바깥 이동 제한
         this.physics.add.collider(this.ball, this.player, this.collisionDetectionBall, null, this); //충돌 설정  
        
         
         
      }

      
  }  

  drawEnemy() {

    this.enemyNum = 7; //**적의 갯수 설정
    
    this.enemy=this.add.group(); //적 모두에 적용되게 그룹으로 묶기

    for(let i=0;i<this.enemyNum;i++)
      {  
        this.enemySpeedX = Phaser.Math.Between(250, 400); //**공의 스피드 랜덤으로 설정
        this.enemySpeedY = Phaser.Math.Between(250, 400); //**공의 스피드 설정
        
         this.e_surface=Phaser.Math.Between(1, 2);
         if(this.e_surface==1) //맨 양쪽에서 출현
         {
           this.e_surface_2=Phaser.Math.Between(1, 2)
           if(this.e_surface_2==1) //**왼쪽에서 출현
           {
             this.enemy=this.physics.add.sprite(20, 
             Phaser.Math.Between(20, 900), "b_score");
           }
           else if(this.e_surface_2==2) //**오른쪽에서 출현
           {
             this.enemy=this.physics.add.sprite(680, 
             Phaser.Math.Between(20, 900), "c_score");
           }
         }
         else if(this.e_surface==2) //위아래에서 출현
         {
           this.e_surface_2=Phaser.Math.Between(1, 2)
           if(this.e_surface_2==1) //**위에서 출현
           {
             this.enemy=this.physics.add.sprite(Phaser.Math.Between(20, 700), 
             20, "b_score");
           }
           else if(this.e_surface_2==2) //**아래서 출현
           {
             this.enemy=this.physics.add.sprite(Phaser.Math.Between(20, 700), 
             880, "c_score");
           }
         }
        
         /*this.ball=this.physics.add.sprite(Phaser.Math.Between(0, 700), 
         Phaser.Math.Between(0, 900), "bullet");*/

         this.enemy.setVelocityX(this.ballSpeedX);
         this.enemy.setVelocityY(this.ballSpeedY); //공 움직이기
         this.enemy.setBounce(1); //공이 부딫히면 튀기도록 설정
         this.enemy.enableBody=true; //공에 충돌속성 설정
         this.enemy.body.immovable = true; //충돌해도 공 안움직이게 설정
         this.enemy.setCollideWorldBounds(true); //월드 바깥 이동 제한
         this.physics.add.collider(this.enemy, this.player, this.collisionDetectionEnemy, ()=>{
    return this.colliderActivated;}, this); //충돌 설정
         
         
      }
    
  }
  
  drawTime() {
    this.second = 0;
    this.textTime = this.add.text(10, 10, "", { fontSize: "25px", fontFamily: "Malang" , fill: "#FFFFFF"}); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second++,
      callbackScope: this,
      loop: true, 
    }); //시간 받아오는 타이머 함수
  }

  drawRemainingball() {

    this.remainingball = this.ballNum; //남은 빨간공의 갯수를 게임시작할 때 표시하기
    this.textRemainingball = this.add.text(10, 40, "", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});
        
    
  }  

  drawLife() {
    
    this.life = 3; //목숨 초기화
    this.textLife = this.add.text(this.game.renderer.width-80, 10, "", { fontSize: "25px", fontFamily: "Malang" , fill: "#FFFFFF"});
    
  }

  //마우스 이동
  addEvents() {
	  this.input.on('pointermove', (pointer) => {
		this.player.x = pointer.x;
    this.player.y = pointer.y;    
	  });
    }

  collisionDetectionBall(ball,player) { 
    
    ball.destroy(); //사라짐 
    this.remainingball--; //먹었으니 남은 공에서 1 깎기
    
  }

  collisionDetectionEnemy(enemy,player) { 

    this.colliderActivated = false;
    this.life--; //적과 부딫혔으니 남은 체력에서 1 깎기
    
  }
  
  update() {

    
    
    this.player.setVelocity(0); //키를 누를 동안만 움직이도록 하기 위해 평소엔 0만큼 이동
    this.textTime.setText("time : "+ this.second); //시간 설정
    this.textRemainingball.setText("Score : "+ this.remainingball); //남은 빨간공 설정
    this.textLife.setText("Life: "+ this.life); //남은 체력 설정    
    
    this.time.addEvent({callback: () => {this.colliderActivated= true;}, delay: 3000, callbackScope: this, loop: true}) //적과 부딫혔을 때 너무 빨리 체력 깎이는 거 방지
 
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

    if(this.remainingball==0 && this.second == 10) //만약 빨간 공 다먹고&10초 지나면
    {
      this.ingameMusic.destroy();
      this.data.cleared[3] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);//게임 클리어
      
    }

    if(this.life<=0) //만약 체력 다 떨어지면
    {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.SEOULOVER, this.data);//게임오버
    }
    
  }

}