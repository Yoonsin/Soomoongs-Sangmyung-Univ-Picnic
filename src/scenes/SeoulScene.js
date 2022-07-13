import { CST } from "../CST.js";

export class SeoulScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.SEOUL
    })
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.add.image(0, 0, "seoul_map").setOrigin(0).setDepth(0);

    this.data.now = 1;

    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    // 천안캠퍼스로 버튼
    if (this.data.try[5] == 1 && this.data.clear[1] == 0) {
      let cheonanButton = this.add.image(this.game.renderer.width/2, 65, "seoul_to_cheonan").setDepth(3);
      cheonanButton.setScale(0.5);
      cheonanButton.setInteractive({ draggable: false, cursor: "pointer" });
      cheonanButton.on("pointerup", ()=>{
        this.button_click.play();
        this.data.try = [0, 0, 0, 0, 0, 0];
        this.data.cleared = [0, 0, 0, 0, 0, 0];
        this.scene.start(CST.SCENES.CHEONAN, this.data);
      })
    } else if (this.data.try[5] == 1 && this.data.clear[1] == 1) {
      let getButton = this.add.image(this.game.renderer.width/2, 65, "get").setDepth(3);
      getButton.setScale(0.5);
      getButton.setInteractive({ draggable: false, cursor: "pointer" });
      getButton.on("pointerup", ()=>{
        this.scene.start(CST.SCENES.FINALCLEAR, this.data);
      })
    }

    //홈페이지 버튼
    let homepageButton = this.add.image(this.game.renderer.width - 80, 30, "homepage_button").setDepth(3);
    homepageButton.setScale(0.3);
    
    // 단과대, 게임 설명 배경 설정
    let insaIntro = this.add.image(0,0, "insa_intro").setOrigin(0).setDepth(4); 
    insaIntro.setVisible(false);
    let insaIntro_2 = this.add.image(0,0, "insa_intro_2").setOrigin(0).setDepth(4)
    insaIntro_2.setVisible(false); //인사대
    let yoonggongIntro = this.add.image(0,0, "yoonggong_intro").setOrigin(0).setDepth(4); 
    yoonggongIntro.setVisible(false);
    let yoonggongIntro_2 = this.add.image(0,0, "yoonggong_intro_2").setOrigin(0).setDepth(4)
    yoonggongIntro_2.setVisible(false); //융공대
    let moonyeahIntro = this.add.image(0,0, "moonyeah_intro").setOrigin(0).setDepth(4); 
    moonyeahIntro.setVisible(false);
    let moonyeahIntro_2 = this.add.image(0,0, "moonyeah_intro_2").setOrigin(0).setDepth(4)
    moonyeahIntro_2.setVisible(false); //문예대
    let sabeomIntro = this.add.image(0,0, "sabeom_intro").setOrigin(0).setDepth(4); 
    sabeomIntro.setVisible(false);
    let sabeomIntro_2 = this.add.image(0,0, "sabeom_intro_2").setOrigin(0).setDepth(4)
    sabeomIntro_2.setVisible(false); //사범대
    let twoGyeongIntro = this.add.image(0,0, "twogyeong_intro").setOrigin(0).setDepth(4); 
    twoGyeongIntro.setVisible(false);
    let twoGyeongIntro_2 = this.add.image(0,0, "twogyeong_intro_2").setOrigin(0).setDepth(4)
    twoGyeongIntro_2.setVisible(false); //경경대
    let mibaekIntro = this.add.image(0,0, "mibaek_intro").setOrigin(0).setDepth(4); 
    mibaekIntro.setVisible(false);
    let mibaekIntro_2 = this.add.image(0,0, "mibaek_intro_2").setOrigin(0).setDepth(4)
    mibaekIntro_2.setVisible(false); //미백관


    // **단과대 선택 버튼
    // 인사대
    let insaButton = this.add.image(590, 245, "insa").setDepth(1);
    insaButton.setInteractive({ draggable: false, cursor: "pointer" });
    insaButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[2] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
      
      insaIntro.setVisible(true);
      insaNextButton.setVisible(true);
    })

    // 융공대
    let yoonggongButton = this.add.image(360,245, "yoonggong").setDepth(1);
    yoonggongButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggongButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[1] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
      
      yoonggongIntro.setVisible(true);
      yoonggongNextButton.setVisible(true);
    })

    // 문예대
    let moonyeahButton = this.add.image(360, 555, "moonyeah").setDepth(1);
    moonyeahButton.setInteractive({ draggable: false, cursor: "pointer" });
    moonyeahButton.on("pointerup", ()=>{
       this.button_click.play()
      this.data.try[4] = 1;
//** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
      
      moonyeahIntro.setVisible(true);
      moonyeahNextButton.setVisible(true);
    })

    // 사범대
    let sabeomButton = this.add.image(130, 555, "sabeom").setDepth(1);
    sabeomButton.setInteractive({ draggable: false, cursor: "pointer" });
    sabeomButton.on("pointerup", ()=>{
      this.button_click.play()
      this.data.try[3] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
      
      sabeomIntro.setVisible(true);
      sabeomNextButton.setVisible(true);
    })

    // 경경대
    let twoGyeongButton = this.add.image(590, 555, "twogyeong").setDepth(1);
    twoGyeongButton.setInteractive({ draggable: false, cursor: "pointer" });
    twoGyeongButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[5] = 1;
      this.data.clear[0] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
      
      twoGyeongIntro.setVisible(true);
      twoGyeongNextButton.setVisible(true);
    })

    // 미백관
    let mibaekButton = this.add.image(130, 245, "cafeterria").setDepth(1);
    mibaekButton.setInteractive({ draggable: false, cursor: "pointer" });
    mibaekButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[0] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      insaButton.setVisible(false);
      yoonggongButton.setVisible(false); //융공대
      moonyeahButton.setVisible(false); //문예대
      sabeomButton.setVisible(false); //사범대
      twoGyeongButton.setVisible(false); //경경대
      mibaekButton.setVisible(false); //미백관
       
      mibaekIntro.setVisible(true);
      mibaekNextButton.setVisible(true);
    })

    if (this.data.try[0] == 0)
      yoonggongButton.setVisible(false);
    else {
      if (this.data.cleared[0] == 0) {
        this.add.image(70, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(70, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[1] == 0)
      insaButton.setVisible(false);
    else {
      if (this.data.cleared[1] == 0) {
        this.add.image(260, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(265, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[2] == 0)
      sabeomButton.setVisible(false);
    else {
      if (this.data.cleared[2] == 0) {
        this.add.image(470, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(475, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[3] == 0)
      moonyeahButton.setVisible(false);
    else {
      if (this.data.cleared[3] == 0) {
        this.add.image(70, 700, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(75, 700, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[4] == 0)
      twoGyeongButton.setVisible(false);
    else {
      if (this.data.cleared[4] == 0) {
        this.add.image(260, 700, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(265, 700, "cleared").setDepth(3).setScale(0.5);
      }
    }
    
    if (this.data.try[5] == 1) {
      if (this.data.cleared[5] == 0) {
        this.add.image(495, 700, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(495, 700, "cleared").setDepth(3).setScale(0.5);
      }
    }

    // **단과대 설명 버튼
    let insaNextButton = this.add.image(this.game.renderer.width -80, 860, "intro_button").setDepth(4);
    insaNextButton.setScale(0.3);
    insaNextButton.setVisible(false); //인사대
    let yoonggongNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    yoonggongNextButton.setScale(0.3);
    yoonggongNextButton.setVisible(false); //융공대
    let moonyeahNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    moonyeahNextButton.setScale(0.3);
    moonyeahNextButton.setVisible(false); //문예대
    let sabeomNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    sabeomNextButton.setScale(0.3);
    sabeomNextButton.setVisible(false); //사범대
    let twoGyeongNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    twoGyeongNextButton.setScale(0.3);
    twoGyeongNextButton.setVisible(false); //경경대
    let mibaekNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    mibaekNextButton.setScale(0.3);
    mibaekNextButton.setVisible(false); //미백관
    


    //**단과대 게임 시작 버튼
    let insaStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    insaStartButton.setScale(0.3);
    insaStartButton.setVisible(false); //인사대
    let yoonggongStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    yoonggongStartButton.setScale(0.3);
    yoonggongStartButton.setVisible(false); //융공대
    let moonyeahStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    moonyeahStartButton.setScale(0.3);
    moonyeahStartButton.setVisible(false); //문예대
    let sabeomStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    sabeomStartButton.setScale(0.3);
    sabeomStartButton.setVisible(false); //사범대
    let twoGyeongStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    twoGyeongStartButton.setScale(0.3);
    twoGyeongStartButton.setVisible(false); //경경대
    let mibaekStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    mibaekStartButton.setScale(0.3);
    mibaekStartButton.setVisible(false); //미백관
    
    
    
    // 버튼 이벤트 활성화
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });

    insaNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggongNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    moonyeahNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    sabeomNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    twoGyeongNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    mibaekNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    
    insaStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggongStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    moonyeahStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    sabeomStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    twoGyeongStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    mibaekStartButton.setInteractive({ draggable: false, cursor: "pointer" });

    
    homepageButton.on("pointerup", ()=>{
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })

    //인사대
    insaNextButton.on("pointerup", ()=>{
      this.button_click.play();
      insaIntro.setVisible(false);
      insaIntro_2.setVisible(true);
      insaNextButton.setVisible(false);
      insaStartButton.setVisible(true);
    })

    insaStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.INSA, this.data);
    })

    //융공대    
    yoonggongNextButton.on("pointerup", ()=>{
      this.button_click.play();
      yoonggongIntro.setVisible(false);
      yoonggongIntro_2.setVisible(true);
      yoonggongNextButton.setVisible(false);
      yoonggongStartButton.setVisible(true);
    })

    yoonggongStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.YOONGGONG, this.data);
    })

    //문예대
    moonyeahNextButton.on("pointerup", ()=>{
      this.button_click.play();
      moonyeahIntro.setVisible(false);
      moonyeahIntro_2.setVisible(true);
      moonyeahNextButton.setVisible(false);
      moonyeahStartButton.setVisible(true);
    })

    moonyeahStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.MOONYEAH, this.data);
    })
    

    //사범대
    sabeomNextButton.on("pointerup", ()=>{
      this.button_click.play();
      sabeomIntro.setVisible(false);
      sabeomIntro_2.setVisible(true);
      sabeomNextButton.setVisible(false);
      sabeomStartButton.setVisible(true);
    })

    sabeomStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.SABEOM, this.data);
    })

    //경경대
    twoGyeongNextButton.on("pointerup", ()=>{
      this.button_click.play();
      twoGyeongIntro.setVisible(false);
      twoGyeongIntro_2.setVisible(true);
      twoGyeongNextButton.setVisible(false);
      twoGyeongStartButton.setVisible(true);
    })

    twoGyeongStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.TWOGYEONG, this.data);
    })

    //미백관
    mibaekNextButton.on("pointerup", ()=>{
      this.button_click.play();
      mibaekIntro.setVisible(false);
      mibaekIntro_2.setVisible(true);
      mibaekNextButton.setVisible(false);
      mibaekStartButton.setVisible(true);
    })

    mibaekStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.MIBAEK, this.data);
    })
    
  }
}