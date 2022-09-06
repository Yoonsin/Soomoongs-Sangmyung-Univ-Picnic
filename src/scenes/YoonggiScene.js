import { CST } from "../CST.js";

export class YoonggiScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.YOONGGI
    })
    this.ingameMusic;

    this.redPotion = ["food","water","train","food","life"];  //힘의 물약
    this.bluePotion = ["money","heal","heal","water","tech"]; //활력의 물약
    this.grenPotion = ["water","life","food","train","heal"]; //생명의 물약

    this.money; //돈
    this.heal; //치료
    this.food; //식품
    this.water; //물
    this.train; //운동
    this.tech; //기술
    this.life; //생명

    this.posList = [[155,110],
                    [345,105],
                    [535,105],
                    [260,280],
                    [110,300],
                    [425,295],
                    [575,290]]; //재료 위치
    this.potList = []; //물약 리스트
    this.potNum = 0; //물약 넣은 갯수
    
    this.pot; //솥
    this.textNum; //물약 넣은 갯수 표시용

    this.second; //시간
    this.textTime; //시간 표시용

    this.earlyBackground; //조합법
    this.background; //배경
  }

  init(data) {
    this.data = data;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();
    this.button_click = this.sound.add("button_click", { volume: 5, loop: false }); //버튼 클릭음 설정

    // 게임 초기화
    this.earlyBackground = this.add.image(0, 0, "yoonggi_bg_early").setOrigin(0).setDepth(3); //조합법    
    this.add.image(0, 0, "yoonggi_bg").setOrigin(0).setDepth(0); //배경
    this.potNum = 0;
    this.potList = []; //물약 리스트
    
    this.drawTime(); //시간 그리기
    this.drawPot(); //가마솥 그리기
    this.drawMoney(); //돈 그리기
    this.drawHeal(); //치료 그리기
    this.drawFood(); //식품 그리기
    this.drawWater(); //물 그리기
    this.drawTrain(); //운동 그리기
    this.drawTech(); //기술 그리기
    this.drawLife(); //생명 그리기
    this.drawNum(); //넣어준 갯수 그리기

    this.input.on('pointerdown', this.startDrag, this); //드래그 시작
        
  }

  drawTime() {
    this.second = 7;
    this.textTime = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"}).setDepth(4); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second--,
      callbackScope: this,
      loop: true, 
    }); //시간 받아오는 타이머 함수
    
  } 

  drawPot()
  {
        
    this.pot = this.physics.add.sprite(35, 700, "pot").setOrigin(0).setDepth(2).setScale(2.5); //가마솥

  }

  drawMoney()
  {
    
    
    this.money = this.physics.add.sprite(this.posList[0][0], this.posList[0][1], "money").setOrigin(0.5,0.5).setDepth(2); //돈
    this.money.name = "money";
    this.money.setInteractive();//상호작용 가능
    


  }
  drawHeal() //치료 그리기
  {
    this.heal = this.physics.add.sprite(this.posList[1][0], this.posList[1][1], "heal").setOrigin(0.5,0.5).setDepth(2); //치료
    this.heal.name = "heal";
    this.heal.setInteractive();//상호작용 가능
  }
  drawFood() //식품 그리기
  {
    this.food = this.physics.add.sprite(this.posList[2][0], this.posList[2][1], "food").setOrigin(0.5,0.5).setDepth(2);//식품
    this.food.name = "food";
    this.food.setInteractive();//상호작용 가능
  }
  drawWater() //물 그리기
  {
    this.water = this.physics.add.sprite(this.posList[3][0], this.posList[3][1], "water").setOrigin(0.5,0.5).setDepth(2); //물
    this.water.name = "water";
    this.water.setInteractive();//상호작용 가능
  }
  drawTrain() //운동 그리기
  {
    this.train =this.physics.add.sprite(this.posList[4][0], this.posList[4][1], "train").setOrigin(0.5,0.5).setDepth(2); //운동
    this.train.name = "train";
    this.train.setInteractive();//상호작용 가능
  }
  drawTech() //기술 그리기
  {
    this.tech = this.physics.add.sprite(this.posList[5][0], this.posList[5][1], "tech").setOrigin(0.5,0.5).setDepth(2); //기술
    this.tech.name = "tech";
    this.tech.setInteractive();//상호작용 가능
  }
  drawLife() //생명 그리기
  {
    this.life = this.physics.add.sprite(this.posList[6][0], this.posList[6][1], "life").setOrigin(0.5,0.5).setDepth(2); //생명
    this.life.name = "life";
    this.life.setInteractive();//상호작용 가능
  }

  drawNum() //넣어준 갯수 그리기
  {
    this.textNum = this.add.text(10,10,"",{ fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"})
  }
  startDrag(pointer,targets) //드래그 시작
  {
    
    this.input.off('pointerdown', this.startDrag, this); 
    this.dragObj = targets[0]; //input는 배열 형식으로 데이터를 받음
    this.input.on('pointermove', this.doDrag, this) //드래그 움직이기
    this.input.on('pointerup', this.stopDrag, this) //드래그 멈추기
  }
  
  doDrag(pointer)
  {
    try 
    {
      this.dragObj.x = pointer.x;
      this.dragObj.y = pointer.y;  
      
    } 
    catch (error) 
    {
      //x,y값이 없는 오브젝트까지 접근하려고 해서 에러 발생, try문으로 예외처리 
    }
    
  }
  stopDrag(pointer,pornum)
  {
    if(pointer.x>=30 && pointer.x<= 280 &&pointer.y>=680) //항아리 안에 들어갔으면
      {
        this.button_click.play(); //버튼 클릭
        if(this.dragObj.name == "money")
        {
          this.money.x = this.posList[0][0];
          this.money.y = this.posList[0][1];
          this.potList[this.potNum] = "money";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "heal")
        {
          this.heal.x = this.posList[1][0];
          this.heal.y = this.posList[1][1];
          this.potList[this.potNum] = "heal";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "food")
        {
          this.food.x = this.posList[2][0];
          this.food.y = this.posList[2][1];
          this.potList[this.potNum] = "food";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "water")
        {
          this.water.x = this.posList[3][0];
          this.water.y = this.posList[3][1];
          this.potList[this.potNum] = "water";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "train")
        {
          this.train.x = this.posList[4][0];
          this.train.y = this.posList[4][1];
          this.potList[this.potNum] = "train";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "tech")
        {
          this.tech.x = this.posList[5][0];
          this.tech.y = this.posList[5][1];
          this.potList[this.potNum] = "tech";
          this.potNum++;
          
        }
        else if(this.dragObj.name == "life")
        {
          this.life.x = this.posList[6][0];
          this.life.y = this.posList[6][1];
          this.potList[this.potNum] = "life";
          this.potNum++;
          
        }
      }
    this.input.on('pointerdown', this.startDrag, this); //드래그 끝났으면 다시 드래그 시작 활성화
    this.input.off('pointermove', this.doDrag, this)
    this.input.off('pointerup', this.stopDrag, this)
  }

  update()
  {

    
    if(this.second <= 0) //시간 3초 지나면
    {
      this.textTime.destroy(); //시간 지우기
      this.earlyBackground.destroy(); //조합법 치우기
    }
    else
    {
      this.textTime.setText("Time : "+ this.second);
    }
    this.textNum.setText("Num : "+ this.potNum); //넣어준 갯수 설정 
    
    if(this.potNum==5) //5개 다 넣으면 
    { 
      //첫번째 요소로 레시피 판별
      if(this.potList[0] =="food") //힘의 물약
      { 
          let sum =0;
          for(let i=0;i<5;i++)
            {
              sum += (this.potList[i] == this.redPotion[i]); //TRUE 연산
              
            }
          if(sum==5) //다 합해서 5, 즉 레시피랑 일치하면
          {
            this.ingameMusic.stop(); //게임 클리어
            this.data.cleared[3] = 1;
            this.scene.start(CST.SCENES.CLEAR, this.data);
          }
          else //아니면
          {
            this.ingameMusic.stop(); //바로 게임오버
            this.scene.start(CST.SCENES.CHEONOVER, this.data);
          }
      }
      else if(this.potList[0] =="money") //활력의 물약
      {
          let sum =0;
          for(let i=0;i<5;i++)
            {
              sum += (this.potList[i] == this.bluePotion[i]); //TRUE 연산
              
            }
          if(sum==5) //다 합해서 5, 즉 레시피랑 일치하면
          {
            this.ingameMusic.stop(); //게임 클리어
            this.data.cleared[3] = 1;
            this.scene.start(CST.SCENES.CLEAR, this.data);
          }
          else //아니면
          {
            this.ingameMusic.stop(); //바로 게임오버
            this.scene.start(CST.SCENES.CHEONOVER, this.data);
          }
      }
      else if(this.potList[0] =="water") //생명의 물약
      {
          let sum =0;
          for(let i=0;i<5;i++)
            {
              sum += (this.potList[i] == this.grenPotion[i]); //TRUE 연산
              
            }
          if(sum==5) //다 합해서 5, 즉 레시피랑 일치하면
          {
            this.ingameMusic.stop(); //게임 클리어
            this.data.cleared[3] = 1;
            this.scene.start(CST.SCENES.CLEAR, this.data);
          }
          else //아니면
          {
            this.ingameMusic.stop(); //바로 게임오버
            this.scene.start(CST.SCENES.CHEONOVER, this.data);
          }
      }
      else //나머지는
      {
        this.ingameMusic.stop(); //바로 게임오버
        this.scene.start(CST.SCENES.CHEONOVER, this.data);
      }
      
    }
  }
  
    
 }
