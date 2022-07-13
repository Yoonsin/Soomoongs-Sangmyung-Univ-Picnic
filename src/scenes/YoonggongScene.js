import { CST } from "../CST.js";

export class YoonggongScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.YOONGGONG
    })

    this.ingameMusic;

    this.second = 0;
    this.game_state = 0;
    this.game_result = 0;
    
    this.i = 0;
    this.professor = [-1, -1, -1, -1, -1];
    this.answer = [-1, -1, -1, -1, -1];
    this.tool = ["robot", "chemical", "laptop", "semiconductor"];
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.second = 0;
    this.game_state = 0;
    this.game_result = 0;

    for (this.i = 0; this.i < 5; this.i++) {
      this.professor[this.i] = Phaser.Math.Between(0, 3);
    }
    this.i = -1;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();

    // 게임 초기화
    this.add.image(0, 0, "yoonggong_bg").setOrigin(0).setDepth(0);

    // 사운드 설정 - 수정1
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    this.robotButton = this.add.image(this.game.renderer.width/8, this.game.renderer.height/8*5, "robot").setDepth(1);
    this.robotButton.setScale(0.7);
    this.chemicalButton = this.add.image(this.game.renderer.width/8*3, this.game.renderer.height/8*5, "chemical").setDepth(1);
    this.chemicalButton.setScale(0.7);
    this.laptopButton = this.add.image(this.game.renderer.width/8, this.game.renderer.height/8*7, "laptop").setDepth(1);
    this.laptopButton.setScale(0.7);
    this.semiconductorButton = this.add.image(this.game.renderer.width/8*3, this.game.renderer.height/8*7, "semiconductor").setDepth(1);
    this.semiconductorButton.setScale(0.7);

    this.robotButton.on("pointerup", ()=>{
      this.button_click.play();
      if (this.i < 4) {
        this.answer[++this.i] = 0;
      }
    })
    this.chemicalButton.on("pointerup", ()=>{
      this.button_click.play();
      if (this.i < 4) {
        this.answer[++this.i] = 1;
      }
    })
    this.laptopButton.on("pointerup", ()=>{
      this.button_click.play();
      if (this.i < 4) {
        this.answer[++this.i] = 2;
      }
     })
    this.semiconductorButton.on("pointerup", ()=>{
      this.button_click.play();
      if (this.i < 4) {
        this.answer[++this.i] = 3;
      }
    })

    this.drawTime();  // 교수님 요구 시작
  }

  update() {
    if (this.game_state == 1) {  // 교수님 요구 버튼 띄워진 상태
      if (this.second >= 2 && this.second < 3) {
        this.requestButton.destroy();
        this.game_state = 0;
      } else if (this.second >= 4 && this.second < 5) {
        this.requestButton.destroy();
        this.game_state = 0;
      } else if (this.second >= 6 && this.second < 7) {
        this.requestButton.destroy();
        this.game_state = 0;
      } else if (this.second >= 8 && this.second < 9) {
        this.requestButton.destroy();
        this.game_state = 0;
      } else if (this.second >= 10) {
        this.requestButton.destroy();
        this.game_state = 2;
      }
    }
    else if (this.game_state == 0) {    // 교수님 요구 버튼 X
      if (this.second >= 1 && this.second < 2)
      {
        this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, this.tool[this.professor[0]]).setDepth(1);
        this.game_state = 1;
      } else if (this.second >= 3 && this.second < 4)
      {
        this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, this.tool[this.professor[1]]).setDepth(1);
        this.game_state = 1;
      } else if (this.second >= 5 && this.second < 6)
      {
        this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, this.tool[this.professor[2]]).setDepth(1);
        this.game_state = 1;
      } else if (this.second >= 7 && this.second < 8)
      {
        this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, this.tool[this.professor[3]]).setDepth(1);
        this.game_state = 1;
      } else if (this.second >= 9 && this.second < 10)
      {
        this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, this.tool[this.professor[4]]).setDepth(1);
        this.game_state = 1;
      }
    }
    else if (this.game_state == 2) {    // 교수님 요구 끝
      this.requestButton = this.add.image(this.game.renderer.width/4*3, this.game.renderer.height/3, "professor_said").setDepth(0.5);
      this.requestButton.setScale(0.5);
      
      // 버튼 이벤트 활성화
      this.robotButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.chemicalButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.laptopButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.semiconductorButton.setInteractive({ draggable: false, cursor: "pointer" });
      this.game_state = 3;
    }
    else if (this.game_state == 3) {
      if (this.i == 4) {
        for (this.i = 0; this.i < 5; this.i++) {
          if (this.professor[this.i] != this.answer[this.i]) {
            this.game_result++;
          }
        }
        if (this.game_result == 0) {
          this.ingameMusic.stop();
        this.data.cleared[1] = 1;
          this.scene.start(CST.SCENES.CLEAR, this.data);
        } else {
          this.ingameMusic.stop();
          this.scene.start(CST.SCENES.SEOULOVER, this.data);
        }
      }
    }
  }

  // 함수 선언

  drawTime() {    // 타이머
    this.second = 0;
    this.time.addEvent({
      delay: 1000,
      callback: () => this.second++,
      callbackScope: this,
      loop: true
    }); //시간 받아오는 타이머 함수
  }
}