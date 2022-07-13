import { CST } from "../CST.js";

export class SeoulOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.SEOULOVER
    })
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.add.image(0, 0, "gameover_bg").setOrigin(0).setDepth(0);

    // 사운드 설정 - 수정1
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let reButton = this.add.image(175, 800, "re_button").setDepth(1);
    reButton.setScale(0.7);
    let homepageButton = this.add.image(495, 800, "homepage_button").setDepth(1);
    homepageButton.setScale(0.7);

    // 게임오버 음악 재생
    let overMusic = this.sound.add("game_over", {loop: true});
    overMusic.play();

    // 버튼 이벤트
    reButton.setInteractive({ draggable: false, cursor: "pointer" });
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });

    reButton.on("pointerup", ()=>{
      this.button_click.play();
      overMusic.stop();
      this.data.titleMusic.play();
      this.scene.start(CST.SCENES.SEOUL, this.data);
    })
    homepageButton.on("pointerup", ()=>{
      this.button_click.play();
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })
  }
}