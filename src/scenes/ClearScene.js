import { CST } from "../CST.js";
import { TitleScene } from "./TitleScene.js";

export class ClearScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.CLEAR
    })
  }

  init(data) {
    this.data = data;
  }

  create() {
    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    this.add.image(0, 0, "clear_bg").setOrigin(0).setDepth(0);

    let homepageButton = this.add.image(this.game.renderer.width - 80, 30, "homepage_button").setDepth(3);
    homepageButton.setScale(0.3);
    
    let toCampusButton = this.add.image(this.game.renderer.width/2, 170, "to_campus_button").setDepth(1);
    toCampusButton.setScale(0.5);

    // 다음 캠퍼스로 넘어가기
    let next = this.add.image(this.game.renderer.width/2, 320, "get2").setDepth(1).setScale(0.5);
    if (this.data.clear[0] == 1 && this.data.clear[1] == 1) {
      next = this.add.image(this.game.renderer.width/2, 320, "get2").setDepth(1).setScale(0.5);
    }
    else if (this.data.clear[0] == 1 && this.data.clear[1] == 0 && this.data.now == 1) {
      next = this.add.image(this.game.renderer.width/2, 320, "toCheonan_button").setDepth(1).setScale(0.5);
    }
    else if (this.data.clear[0] == 0 && this.data.clear[1] == 1 && this.data.now == 2) {
      next = this.add.image(this.game.renderer.width/2, 320, "toSeoul_button").setDepth(1).setScale(0.5);
    }
    else {
      next.setVisible(false);
    }

    let clearMusic = this.sound.add("game_clear", {loop: true});
    clearMusic.play();

    // 버튼 이벤트
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });
    toCampusButton.setInteractive({ draggable: false, cursor: "pointer" });

    homepageButton.on("pointerup", ()=>{
      this.button_click.play();
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })
    toCampusButton.on("pointerup", ()=>{
      this.button_click.play();
      clearMusic.stop();
      this.data.titleMusic.play();
        if (this.data.now == 1) {
          this.scene.start(CST.SCENES.SEOUL, this.data);
        } else if (this.data.now == 2) {
          this.scene.start(CST.SCENES.CHEONAN, this.data);
        }
    })

    next.setInteractive({ draggable: false, cursor: "pointer" });
    if (this.data.clear[0] + this.data.clear[1] == 2) {
      next.on("pointerup", ()=>{
        this.button_click.play();
        this.scene.start(CST.SCENES.FINALCLEAR, this.data); // 캠퍼스 선택 페이지로 이동
      })
    }
    else if (this.data.clear[0] + this.data.clear[1] <= 1) {
      next.on("pointerup", ()=>{
        this.button_click.play();
        this.data.try = [0, 0, 0, 0, 0, 0];
        clearMusic.stop();
        this.data.titleMusic.play();
        if (this.data.now == 1) {
          this.scene.start(CST.SCENES.CHEONAN, this.data);
        } else if (this.data.now == 2) {
          this.scene.start(CST.SCENES.SEOUL, this.data);
        }
      })
    }
  }
}
