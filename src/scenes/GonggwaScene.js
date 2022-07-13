import { CST } from "../CST.js";

export class GonggwaScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.GONGGWA
    })
    this.ingameMusic;
    
    
    this.timingTarget; //타이밍 타겟 (게이지 위아래 에서 왔다갔다) 변수
    this.timingTargetLocation; //타겟 위치값 변수
    this.timingTargetSpeed; //타겟 속도 변수
    this.timingTargetFlip //타겟 반대로 바꿀 위치 변수 
    this.timingSize; //타이밍 게이지 변수    

    this.timingList; //성공횟수 리스트 변수
    this.textList; //리스트 표시해주는 텍스트 개체 변수

    this.keys; //**키 플러그인 변수 
    this.cursorKeys; //키보드 변수 

    this.days; //날 세는 변수
    this.i; //결과 확인에 쓰일 인덱스 변수
    this.sum; //성공 확인하는 변수    

    this.background; //배경 이미지 변수
    this.timer; //초세는 변수
    this.change;
    
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
    
    this.background = this.add.image(0, 0, "gonggwa_bg").setOrigin(0).setDepth(0); //배경 이미지 설정
    this.button_click = this.sound.add("button_click", { volume: 5, loop: false }); //버튼 클릭음 설정
    this.wakeUp = this.sound.add("wake_up", { volume: 1, loop: false }); //굿모닝 효과음 설정
    
    this.days = 0; //첫날은 0으로 초기화
    this.sum = 0; //맞은 횟수도 0으로 초기화
    this.change = 0;//변화 x

    this.timer = this.time.addEvent({
      delay: 100, 
      callback: () => this.change += 0.1 , //0.1초마다 size 0.1초씩 플러스
      callbackScope: this,
      loop: true,
      paused : true 
      }); //시간 받아오는 타이머 함수
    
    this.drawTiming(); //타이밍 게이지 그리기
    this.drawTime(); // 시간(타겟용) 그리기   
    this.drawList(); //리스트 그리기
    this.addEvents(); //마우스 반응 추가
    
    
  }

  
  drawTiming() {
    
    this.timingTarget = this.physics.add.sprite(540,210,"bullet").setOrigin(0).setDepth(1); //타이밍 타겟 이미지 설정
    this.timingTargetLocation = 0; //타겟 위치값 초기화
    this.timingTargetFlip = 1.5; //타겟 반대로 바꿀 위치 변수    
    this.timingTargetSpeed = 315; //타겟 속도설정
    this.timingSize =  this.add.image(600,200,"gauge").setOrigin(0).setDepth(1).setAngle(90); //타이밍 게이지 이미지 설정
    
    
    
  }

  drawList() {
    this.timingList = [ "?", "?", "?", "?", "?" ]; 
    this.textList = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"}); //텍스트 객체 생성
  }  

  addEvents() {
    //클릭
    this.input.on('pointerdown', pointer => {
    
    if(this.timingTarget.y>=400 && this.timingTarget.y<=500)
    {
      this.timingList[this.days] = "O"
      this.wakeUp.play(); //성공시 상쾌한 효과음
      this.background.setTexture('gonggwa_bg_2');
      this.timer.paused = false; //타이머 시작
    }
    else
    {
      this.button_click.play(); //실패시 그냥 클릭음만..
      this.timingList[this.days] = "X"
    }
    this.days++; //하루 지났으니까 ++
	  });
  }
  
  
  update() {

    
    this.timingTarget.setVelocityY(this.timingTargetSpeed); //타겟 이동
    if( this.timingTargetLocation >= this.timingTargetFlip)
    {
      this.timingTargetSpeed = -this.timingTargetSpeed; // 속도 반대로 바꾸기
      this.timingTargetLocation = 0; // 다시 초 재기위해 초기화  
    }

    this.textList.setText("기상 :  "+ this.timingList[0]+ "   "+ this.timingList[1]+ "   "+ this.timingList[2]+ "   "+ this.timingList[3]+ "   "+ this.timingList[4]); //현재 성공/실패 횟수 세기

    if(this.days==5) //만약 5일이 지났다면 결과 체크하기
    {
      this.sum = 0;
      for(this.i=0; this.i<5; this.i++)
        { 
          if(this.timingList[this.i]=="O")
          {
            this.sum += 1;
          }
          
        }
      
      if(this.sum>=4)
      {
        this.ingameMusic.destroy();
        this.data.cleared[5] = 1;
        this.scene.start(CST.SCENES.CLEAR, this.data); //게임 클리어
      }
      else
      {
        this.ingameMusic.destroy();
        this.scene.start(CST.SCENES.CHEONOVER, this.data); //게임오버
      }
      
    }

  

    if(this.change >= 1.2) // 시간이 지나면
    {
      //바꾸기
      this.change = 0; //초기화하고
      
      this.timer.reset({
      delay: 100, 
      callback: () => this.change += 0.1 , //0.1초마다 size 0.1초씩 플러스
      callbackScope: this,
      loop: true,
      paused : true 
      }); 
      this.time.addEvent(this.timer); //타이머 초기화하고 다시 시작
      
      this.background.setTexture('gonggwa_bg'); //다시 자기
    }
  }
  drawTime() {    // 타이머
    this.second = 0;
    this.time.addEvent({
      delay: 100, 
      callback: () => this.timingTargetLocation += 0.1 , //0.1초마다 size 0.1초씩 플러스
      callbackScope: this,
      loop: true
    }); //시간 받아오는 타이머 함수
  }
}