import { CST } from "../CST.js";

export class NameScene extends Phaser.Scene{
  constructor() {
    super({
      key: CST.SCENES.NAME
    })
  }

  init(data) {
    this.data = data;
  }

  create() {  // 게임 오브젝트 생성 영역
    
    // nameform html
    var element = this.add.dom(this.game.renderer.width/2, this.game.renderer.height/2).createFromCache('nameform');

    // 이름 입력 안내
    this.add.image(this.game.renderer.width/2, 350, "nameform_info").setDepth(0).setScale(0.6);

    // 버튼
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    let nextButton = this.add.image(this.game.renderer.width/2, 775, "next_button").setDepth(1).setScale(0.6);
    
    nextButton.setInteractive({ draggable: false, cursor: "pointer" });

    nextButton.on("pointerup", ()=>{
      this.button_click.play();
      
      var name = element.getChildByName('nameField');
      var phoneNum = element.getChildByName('numField');
      var over18_checked = element.getChildByName('agreement');
      this.data.name = name.value;
      this.data.phoneNum = phoneNum.value;
      // 입력했는가?
      if (this.data.name != '' && this.data.phoneNum != '' && over18_checked.checked) {
        element.destroy();
        this.scene.start(CST.SCENES.CAMPUS, this.data);
      }
      else {
        //  Flash the prompt
        this.tweens.add({
        targets: element,
        alpha: 0.2,
        duration: 250,
        ease: 'Power3',
        yoyo: true
        });
      }
    })
  }
}