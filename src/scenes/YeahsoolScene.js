import { CST } from "../CST.js";

export class YeahsoolScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.YEAHSOOL
    })
    this.ingameMusic;

    this.answer = ["yeahsool_answer_1", "yeahsool_answer_2"];
    this.wrong_1 = ["wrong1_1", "wrong2_1", "wrong3_1", "wrong4_1", "wrong5_1"];
    this.wrong_2 = ["wrong1_2", "wrong2-1_2", "wrong2-2_2", "wrong3_2", "wrong4_2", "wrong5_2"];

    this.answerNum;

    this.score;  // 찾은 그림 개수
    this.second;

    this.textScore;
    this.textTime;
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.answerNum = -1;
    this.score = 0;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    // 배경 이미지
    this.add.image(0, 0, "yeahsool_bg").setOrigin(0).setDepth(0);

    // 버튼 사운드
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });
    
    // 텍스트 객체 생성 - 점수: 찾은 그림 수
    this.textScore = this.add.text(10, 10, "", { fontSize: "25px", fontFamily: "Malang", fill: "#FFFFFF"});

    // 정답 설정
    this.answerNum = Phaser.Math.Between(0, 1);
    //this.answerNum = 1;
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/4, this.answer[this.answerNum]).setDepth(0).setScale(0.5);

    // 틀린 그림
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/4*3, this.answer[this.answerNum]).setDepth(0).setScale(0.5);

    // 틀린 부분 버튼 생성
    if (this.answerNum == 0) {
      let wrong1_1_button = this.add.image(this.game.renderer.width/2-104, this.game.renderer.height/4*3+25, this.wrong_1[0]).setDepth(0).setScale(0.5);
      let wrong2_1_button = this.add.image(this.game.renderer.width/2-82, this.game.renderer.height/4*3+92, this.wrong_1[1]).setDepth(0).setScale(0.5);
      let wrong3_1_button = this.add.image(this.game.renderer.width/2-100, this.game.renderer.height/4*3+170, this.wrong_1[2]).setDepth(0).setScale(0.5);
      let wrong4_1_button = this.add.image(this.game.renderer.width/2+98, this.game.renderer.height/4*3-138, this.wrong_1[3]).setDepth(0).setScale(0.5);
      let wrong5_1_button = this.add.image(this.game.renderer.width/2+80, this.game.renderer.height/4*3+160, this.wrong_1[4]).setDepth(0).setScale(0.5);

      // 버튼 활성화
      wrong1_1_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong2_1_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong3_1_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong4_1_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong5_1_button.setInteractive({ draggable: false, cursor: "pointer" });

      // 버튼 설정
      wrong1_1_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong1_1_button.destroy();
      })
      wrong2_1_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong2_1_button.destroy();
      })
      wrong3_1_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong3_1_button.destroy();
      })
      wrong4_1_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong4_1_button.destroy();
      })
      wrong5_1_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong5_1_button.destroy();
      })
    } else 
    if (this.answerNum == 1) {
      let wrong1_2_button = this.add.image(this.game.renderer.width/2-112, this.game.renderer.height/4*3+15, this.wrong_2[0]).setDepth(0).setScale(0.5);
      let wrong21_2_button = this.add.image(this.game.renderer.width/2-193, this.game.renderer.height/4*3, this.wrong_2[1]).setDepth(0).setScale(0.5);
      let wrong22_2_button = this.add.image(this.game.renderer.width/2-96, this.game.renderer.height/4*3-10, this.wrong_2[2]).setDepth(0).setScale(0.5);
      let wrong3_2_button = this.add.image(this.game.renderer.width/2-162, this.game.renderer.height/4*3+125, this.wrong_2[3]).setDepth(0).setScale(0.5);
      let wrong4_2_button = this.add.image(this.game.renderer.width/2-95, this.game.renderer.height/4*3+122, this.wrong_2[4]).setDepth(0).setScale(0.5);
      let wrong5_2_button = this.add.image(this.game.renderer.width/2+180, this.game.renderer.height/4*3+127, this.wrong_2[5]).setDepth(0).setScale(0.5);

      // 버튼 활성화
      wrong1_2_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong21_2_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong22_2_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong3_2_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong4_2_button.setInteractive({ draggable: false, cursor: "pointer" });
      wrong5_2_button.setInteractive({ draggable: false, cursor: "pointer" });

      // 버튼 설정
      wrong1_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong1_2_button.destroy();
      })
      wrong21_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong21_2_button.destroy();
        wrong22_2_button.destroy();
      })
      wrong22_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong21_2_button.destroy();
        wrong22_2_button.destroy();
      })
      wrong3_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong3_2_button.destroy();
      })
      wrong4_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong4_2_button.destroy();
      })
      wrong5_2_button.on("pointerup", ()=>{
        this.button_click.play();
        this.score++;
        wrong5_2_button.destroy();
      })
    }

    this.drawTime(); //시간 그리기
  }
  
  update() {
    this.textScore.setText("Score: "+ this.score); // 먹은 음식 수 출력
    this.textTime.setText("Time : "+ this.second) ; //시간 출력

    if (this.score >= 5) {
      this.ingameMusic.destroy();
        this.data.cleared[1] = 1;
      this.scene.start(CST.SCENES.CLEAR, this.data);
    }
    if (this.second <= 0) {
      this.ingameMusic.destroy();
      this.scene.start(CST.SCENES.CHEONOVER, this.data);
    }
  }

  // 함수 선언

  drawTime() {    // 타이머, 시간 출력 함수
    this.second = 30;
    this.textTime = this.add.text(this.game.renderer.width-120, 10, "", { fontSize: "25px", fontFamily: "Malang" , fill: "#000000"}).setDepth(1); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second--,
      callbackScope: this,
      loop: true
    }); //시간 받아오는 타이머 함수
  }
}