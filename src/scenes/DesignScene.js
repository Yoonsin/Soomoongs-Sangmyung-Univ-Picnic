import { CST } from "../CST.js";

export class DesignScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.DESIGN
    })
    this.ingameMusic;

    this.answer;
    this.first;
    this.second;
    this.third;

    this.things = ["cloth", "seramic", "VR"];

    this.stop;
    this.current;
  }

  init(data) {
    this.data = data;
  }

  preload() {
    this.answer = -1;
    this.first = -1;
    this.second = -1;
    this.third = -1;
    this.stop = 0;
    this.current = 0;
  }

  create() {
    // 인게임 음악 재생
    this.data.titleMusic.stop();
    this.ingameMusic = this.sound.add("ingame", {loop: true});
    this.ingameMusic.play();
    // 버튼 효과음
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    // 게임 초기화
    this.add.image(0, 0, "bullet_bg_cloudless").setOrigin(0).setDepth(0); // 배경 불러오기
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, "design_UI").setDepth(0).setScale(0.6); // UI 불러오기

    // 정답 설정
    this.answer = Phaser.Math.Between(0, 2);
    this.add.image(this.game.renderer.width/2, this.game.renderer.height/5, this.things[this.answer]).setDepth(1).setScale(1.2);

    // 그림 생성
    this.firstImage = this.add.image(this.game.renderer.width/4-13, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);
    this.secondImage = this.add.image(this.game.renderer.width/2-1, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);
    this.thirdImage = this.add.image(this.game.renderer.width/4*3+14, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);

    // 버튼 생성
    let stop1Button = this.add.image(this.game.renderer.width/4-15, this.game.renderer.height/2+100, "stop_btn").setDepth(1).setScale(0.6);
    let stop2Button = this.add.image(this.game.renderer.width/2-1, this.game.renderer.height/2+100, "stop_btn").setDepth(1).setScale(0.6);
    let stop3Button = this.add.image(this.game.renderer.width/4*3+12, this.game.renderer.height/2+100, "stop_btn").setDepth(1).setScale(0.6);

    // 버튼 활성화
    stop1Button.setInteractive({ draggable: false, cursor: "pointer" });
    stop2Button.setInteractive({ draggable: false, cursor: "pointer" });
    stop3Button.setInteractive({ draggable: false, cursor: "pointer" });

    // 버튼 설정
    stop1Button.on("pointerup", ()=>{
      this.button_click.play();
      if (this.first == -1) {
        this.stop++;
        this.firstImage.destroy();
        this.first = this.current;
        this.firstImage = this.add.image(this.game.renderer.width/4-13, this.game.renderer.height/2-12, this.things[this.first]).setDepth(1).setScale(0.75);
      }
    })
    stop2Button.on("pointerup", ()=>{
      this.button_click.play();
      if (this.second == -1) {
        this.stop++;
        this.secondImage.destroy();
        this.second = this.current;
        this.secondImage = this.add.image(this.game.renderer.width/2-1, this.game.renderer.height/2-12, this.things[this.second]).setDepth(1).setScale(0.75);
      }
    })
    stop3Button.on("pointerup", ()=>{
      this.button_click.play();
      if (this.third == -1) {
        this.stop++;
        this.thirdImage.destroy();
        this.third = this.current;
        this.thirdImage = this.add.image(this.game.renderer.width/4*3+14, this.game.renderer.height/2-12, this.things[this.third]).setDepth(1).setScale(0.75);
      }
    })

    // 타이머 timer
    this.time.addEvent({
      delay: 500, // 500ms마다 이미지 전환
      callback: () => this.changeImage(), 
      callbackScope: this,
      loop: true, 
    }); 
  }

  update() {
    if (this.first != -1 && this.second != -1 && this.third != -1) {
      if (this.first == this.answer && this.second == this.answer && this.third == this.answer) {
        this.ingameMusic.destroy();
        this.data.cleared[2] = 1;
        this.scene.start(CST.SCENES.CLEAR, this.data);
      } else {
        this.ingameMusic.destroy();
        this.scene.start(CST.SCENES.CHEONOVER, this.data);
      }
    }
  }

  changeImage() {
    if (this.current == 2)
      this.current = -1;
    this.current++;

    if (this.first == -1) {
      this.firstImage.destroy();
      this.firstImage = this.add.image(this.game.renderer.width/4-13, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);
    }
    if (this.second == -1) {
      this.secondImage.destroy();
      this.secondImage = this.add.image(this.game.renderer.width/2-1, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);
    }
    if (this.third == -1) {
      this.thirdImage.destroy();
      this.thirdImage = this.add.image(this.game.renderer.width/4*3+14, this.game.renderer.height/2-12, this.things[this.current]).setDepth(1).setScale(0.75);
    }
  }
}
