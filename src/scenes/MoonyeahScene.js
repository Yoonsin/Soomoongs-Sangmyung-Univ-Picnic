import { CST } from "../CST.js";

export class MoonyeahScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MOONYEAH
    })

    this.ingameMusic;

    // round 상태 - 0: 답 그림 보이기, 1: 선택지 생성 완료, 2: 2라운드 GUI 출력, 3: 2라운드 GUI 출력 완료
    this.round_state = 0;

    // 1라운드
    this.round1_picture = -1;
    this.round1_answer_num = -1;
    this.answer_list = ["picture1", "picture2", "picture3"];
    this.wrong_list = ["picture1_wrong", "picture2_wrong", "picture3_wrong"];
    // 시간 관련
    this.second = 5; //시간 받아오는 변수
    this.textTime;//시간 표시하는 변수

    // 2라운드
    this.round2_tone = -1;
    this.round2_answer_num = -1;
    this.tone_list = ["doremi", "dosolpa", "misira", "remipa", "repara"];
    this.select_height = [400, 600, 800];
    this.round2_wrong_tone1 = -1;
    this.round2_wrong_tone2 = -1;
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.round_state = 0;
    this.second = 5;
    
    this.round1_picture = Phaser.Math.Between(0, 2);
    this.round1_answer_num = Phaser.Math.Between(0, 1);
    
    this.round2_tone = -1;
    this.round2_answer_num = -1;  
    this.round2_wrong_tone1 = -1;
    this.round2_wrong_tone2 = -1;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    // 배경 이미지
    this.add.image(0, 0, "yeahsool_bg").setOrigin(0).setDepth(0);

    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let questionButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, this.answer_list[this.round1_picture]).setDepth(1);
    questionButton.setScale(2);

    this.drawTime(); //시간 그리기
  }
  
  update() {
    if (this.round_state == 0 && this.second >= 0) {                   // 답안 그림 보이기
      this.textTime.setText("time : "+ this.second); //시간 설정
    } else if (this.round_state == 0 && this.second < 0) {             // 선택 버튼 생성
      this.textTime.destroy();

      // 배경 설정
      if (this.round1_picture == 0) {    // 세로 - 테라스
        this.add.image(0, 0, "yeahsool_bg_garo").setOrigin(0).setDepth(2);

        if (this.round1_answer_num == 0) {
          this.answerButton = this.add.image(this.game.renderer.width/4+10, 300, this.answer_list[this.round1_picture]).setDepth(3);
          this.wrongButton = this.add.image(this.game.renderer.width/4*3-10, 300, this.wrong_list[this.round1_picture]).setDepth(3);
        } else if (this.round1_answer_num == 1) {
          this.answerButton = this.add.image(this.game.renderer.width/4*3-10, 300, this.answer_list[this.round1_picture]).setDepth(3);
          this.wrongButton = this.add.image(this.game.renderer.width/4+10, 300, this.wrong_list[this.round1_picture]).setDepth(3);
        }
        //answerButton.setScale(0.6);
        //wrongButton.setScale(0.6);
      } else {                           // 가로 - 밤하늘, 꽃나무
        this.add.image(0, 0, "yeahsool_bg_sero").setOrigin(0).setDepth(2);

        if (this.round1_answer_num == 0) {
          this.answerButton = this.add.image(this.game.renderer.width/3+30, this.game.renderer.height/4+50, this.answer_list[this.round1_picture]).setDepth(3);
          this.wrongButton = this.add.image(this.game.renderer.width/3+30, this.game.renderer.height/4*3-50, this.wrong_list[this.round1_picture]).setDepth(3);
        } else if (this.round1_answer_num == 1) {
          this.answerButton = this.add.image(this.game.renderer.width/3+30, this.game.renderer.height/4*3-50, this.answer_list[this.round1_picture]).setDepth(3);
          this.wrongButton = this.add.image(this.game.renderer.width/3+30, this.game.renderer.height/4+50, this.wrong_list[this.round1_picture]).setDepth(3);
        }
        
        this.answerButton.setScale(1.5);
        this.wrongButton.setScale(1.5);
      }

      // 버튼 이벤트
      this.answerButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.wrongButton.setInteractive({ draggable: false, cursor: "pointer" });

      this.answerButton.on("pointerup", ()=>{
        this.button_click.play()
        this.answerButton.destroy();
        this.wrongButton.destroy();
        this.round_state = 2;
      })
      this.wrongButton.on("pointerup", ()=>{
        this.button_click.play()
        this.ingameMusic.destroy();
        this.scene.start(CST.SCENES.SEOULOVER, this.data);
      })

      this.round_state = 1;
    }
    else if (this.round_state == 2) {                           // 라운드2 초기화
      // 라운드2 GUI 출력 및 초기화
      this.add.image(0, 0, "yeahsool_bg_sero").setOrigin(0).setDepth(4);
      this.round2_tone = Phaser.Math.Between(0, 4);
      this.round2_wrong_tone1 = Phaser.Math.Between(0, 4);
      while (this.round2_tone == this.round2_wrong_tone1) {
        this.round2_wrong_tone1 = Phaser.Math.Between(0, 4);
      }  // 중복 방지
      this.round2_wrong_tone2 = Phaser.Math.Between(0, 4);
      while (this.round2_tone == this.round2_wrong_tone2 || this.round2_wrong_tone1 == this.round2_wrong_tone2) {
        this.round2_wrong_tone2 = Phaser.Math.Between(0, 4);
      }  // 중복 방지
      
      this.round2_answer_num = Phaser.Math.Between(0, 2);  // 정답 자리

      // 정답 듣기 버튼
      this.speakerButton = this.add.image(this.game.renderer.width/3, 200, "speaker_button").setDepth(5);
      
      // 선택 버튼 생성
      this.answerButton = this.add.image(this.game.renderer.width/3, this.select_height[this.round2_answer_num], this.tone_list[this.round2_tone]).setDepth(5);
    this.answerButton.setScale(0.7);
      
      if (this.round2_answer_num  == 0) {
        this.wrongButton1 = this.add.image(this.game.renderer.width/3, this.select_height[1], this.tone_list[this.round2_wrong_tone1]).setDepth(5);
    this.wrongButton1.setScale(0.7);
        this.wrongButton2 = this.add.image(this.game.renderer.width/3, this.select_height[2], this.tone_list[this.round2_wrong_tone2]).setDepth(5);
    this.wrongButton2.setScale(0.7);
      } else if (this.round2_answer_num  == 1) {
        this.wrongButton1 = this.add.image(this.game.renderer.width/3, this.select_height[0], this.tone_list[this.round2_wrong_tone1]).setDepth(5);
    this.wrongButton1.setScale(0.7);
        this.wrongButton2 = this.add.image(this.game.renderer.width/3, this.select_height[2], this.tone_list[this.round2_wrong_tone2]).setDepth(5);
    this.wrongButton2.setScale(0.7);
      } else if (this.round2_answer_num  == 2) {
        this.wrongButton1 = this.add.image(this.game.renderer.width/3, this.select_height[1], this.tone_list[this.round2_wrong_tone1]).setDepth(5);
    this.wrongButton1.setScale(0.7);
        this.wrongButton2 = this.add.image(this.game.renderer.width/3, this.select_height[0], this.tone_list[this.round2_wrong_tone2]).setDepth(5);
    this.wrongButton2.setScale(0.7);
      }

      // 사운드 설정
      let speaker = this.sound.add(this.tone_list[this.round2_tone], { volume: 5, loop: false });

      // 버튼 이벤트
      this.speakerButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.answerButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.wrongButton1.setInteractive({ draggable: false, cursor: "pointer" });
      this.wrongButton2.setInteractive({ draggable: false, cursor: "pointer" });

      this.speakerButton.on("pointerup", ()=>{
        this.button_click.play();
        speaker.play();
      })
      this.answerButton.on("pointerup", ()=>{
        this.button_click.play();
        this.ingameMusic.destroy();
        this.data.cleared[4] = 1;
        this.scene.start(CST.SCENES.CLEAR, this.data);
      })
      this.wrongButton1.on("pointerup", ()=>{
        this.button_click.play();
        this.ingameMusic.destroy();
        this.scene.start(CST.SCENES.SEOULOVER, this.data);
      })
      this.wrongButton2.on("pointerup", ()=>{
        this.button_click.play();
        this.ingameMusic.destroy();
        this.scene.start(CST.SCENES.SEOULOVER, this.data);
      })

      // 라운드2 무한 초기화 방지
      this.round_state = 3;
    }
  }

  // 함수 선언

    drawTime() {    // 타이머, 시간 출력 함수
    this.second = 5;
    this.textTime = this.add.text(10,10,"", { fontSize: "25px", fontFamily: "Malang" , fill: "#000000"}).setDepth(1); //텍스트 객체 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second--,
      callbackScope: this,
      loop: true
    }); //시간 받아오는 타이머 함수
  }
}