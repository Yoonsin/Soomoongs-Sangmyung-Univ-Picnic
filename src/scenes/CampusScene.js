import { CST } from "../CST.js";

export class CampusScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.CAMPUS
    })
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.add.image(0, 0, "choosing_bg").setOrigin(0).setDepth(0);

    // 사운드 설정 - 수정1
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let seoulButton = this.add.image(this.game.renderer.width / 2, 125, "seoul_button").setDepth(1);
    seoulButton.setScale(0.7);
    
    let cheonanButton = this.add.image(this.game.renderer.width / 2, 350, "cheonan_button").setDepth(1);
    cheonanButton.setScale(0.7);

    // 마우스 이벤트
    seoulButton.setInteractive({ draggable: false, cursor: "pointer" });
    cheonanButton.setInteractive({ draggable: false, cursor: "pointer" });

    seoulButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.SEOUL, this.data);
    })

    cheonanButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.CHEONAN, this.data);
    })
  }
}