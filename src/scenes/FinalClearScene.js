import { CST } from "../CST.js";
import { TitleScene } from "./TitleScene.js";

export class FinalClearScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.FINALCLEAR
    })

    this.textName;
    this.textNum;
    this.textMonth;
    this.textDate;
  }

  init(data) {
    this.data = data;
  }

  create() {
    // 인증서 출력
    this.add.image(350, 425, "document").setDepth(0).setScale(0.65);

    // 텍스트 객체 생성
    // 이름
    this.textName = this.add.text(457,355, this.data.name, { fontSize: "18px", fontFamily: "Malang", fill: "#000000"});
    // 전화번호
    this.textNum = this.add.text(457, 393, this.data.phoneNum, { fontSize: "14px", fontFamily: "Malang", fill: "#000000"});
    // 날짜
    var d = new Date();
    this.textMonth = this.add.text(352, 573, d.getMonth()+1, { fontSize: "18px", fontFamily: "Malang", fill: "#000000"});
    this.textDate = this.add.text(382, 573, d.getDate(), { fontSize: "18px", fontFamily: "Malang", fill: "#000000"});

    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let homepageButton = this.add.image(350, 860, "homepage_button").setDepth(1);
    homepageButton.setScale(0.3);

    // 버튼 이벤트
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });

    homepageButton.on("pointerup", ()=>{
      this.button_click.play();
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })
  }
}