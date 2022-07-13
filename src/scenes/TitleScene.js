import { CST } from "../CST.js";

export class TitleScene extends Phaser.Scene{
  constructor() {
    super({
      key: CST.SCENES.TITLE
    })

    this.data;
  }
   
  preload() {
    this.data = {
      titleMusic: "Music",
      name: "",
      phoneNum: "",      
      now: 0,
      clear: [0, 0],
      try: [0, 0, 0, 0, 0, 0],
      cleared: [0, 0, 0, 0, 0, 0]
    };
  }

  create() {    // 게임 오브젝트 생성 영역
    
    this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);

    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let homepageButton = this.add.image(this.game.renderer.width / 2 + 175, this.game.renderer.width / 2 + 470, "homepage_button").setDepth(1);
    homepageButton.setScale(0.6);

    let startButton = this.add.image(this.game.renderer.width / 2 + 175, this.game.renderer.width / 2 + 375, "start_button").setDepth(1);
    startButton.setScale(0.6);
    
    let nextButton = this.add.image(this.game.renderer.width / 2 + 175, this.game.renderer.width / 2 + 375, "next_button").setDepth(1);
    nextButton.setVisible(false);

    // 사운드 설정
    this.data.titleMusic = this.sound.add("lobby", { loop: true });

    // 버튼 이벤트
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });
    startButton.setInteractive({ draggable: false, cursor: "pointer" });
    nextButton.setInteractive({ draggable: false, cursor: "pointer" });

    homepageButton.on("pointerup", ()=>{
      this.button_click.play();
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })

    startButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.titleMusic.play();

      homepageButton.destroy();
      this.add.image(0, 0, "introduce_game").setOrigin(0).setDepth(0);
      nextButton.setVisible(true);

      startButton.destroy();
    })
    
    nextButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.NAME, this.data);
    })
  }
}