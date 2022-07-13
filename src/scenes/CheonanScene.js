import { CST } from "../CST.js";

export class CheonanScene extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.CHEONAN
    })
  }

  init(data) {
    this.data = data;
  }

  create() {
    this.add.image(0, 0, "cheonan_map").setOrigin(0).setDepth(0);

    this.data.now = 2;

    // 사운드 설정
    this.button_click = this.sound.add("button_click", { volume: 1, loop: false });

    // 서울캠퍼스 버튼
    if (this.data.try[5] == 1 && this.data.clear[0] == 0) {
      let seoulButton = this.add.image(this.game.renderer.width/2, 65, "cheonan_to_seoul").setDepth(3);
      seoulButton.setScale(0.5);
      seoulButton.setInteractive({ draggable: false, cursor: "pointer" });
      seoulButton.on("pointerup", ()=>{
        this.button_click.play();
        this.data.try = [0, 0, 0, 0, 0, 0];
        this.data.cleared = [0, 0, 0, 0, 0, 0];
        this.scene.start(CST.SCENES.SEOUL, this.data);
      })
    } else if (this.data.try[5] == 1 && this.data.clear[0] == 1) {
      let getButton = this.add.image(this.game.renderer.width/2, 65, "get").setDepth(3);
      getButton.setScale(0.5);
      getButton.setInteractive({ draggable: false, cursor: "pointer" });
      getButton.on("pointerup", ()=>{
        this.scene.start(CST.SCENES.FINALCLEAR, this.data);
      })
    }

    // 홈페이지 버튼
    let homepageButton = this.add.image(this.game.renderer.width - 80, 30, "homepage_button").setDepth(3);
    homepageButton.setScale(0.3);

    // 단과대, 게임 설명 배경 설정
    let yeahsoolIntro = this.add.image(0,0, "yeahsool_intro").setOrigin(0).setDepth(4);
    yeahsoolIntro.setVisible(false);
    let yeahsoolIntro_2 = this.add.image(0,0, "yeahsool_intro_2").setOrigin(0).setDepth(4)
    yeahsoolIntro_2.setVisible(false); //예술대
    let designIntro = this.add.image(0,0, "design_intro").setOrigin(0).setDepth(4); 
    designIntro.setVisible(false);
    let designIntro_2 = this.add.image(0,0, "design_intro_2").setOrigin(0).setDepth(4)
    designIntro_2.setVisible(false); //디자인대
    let geulinIntro = this.add.image(0,0, "geulin_intro").setOrigin(0).setDepth(4); 
    geulinIntro.setVisible(false);
    let geulinIntro_2 = this.add.image(0,0, "geulin_intro_2").setOrigin(0).setDepth(4)
    geulinIntro_2.setVisible(false); //글인대
    let yoonggiIntro = this.add.image(0,0, "yoonggi_intro").setOrigin(0).setDepth(4); 
    yoonggiIntro.setVisible(false);
    let yoonggiIntro_2 = this.add.image(0,0, "yoonggi_intro_2").setOrigin(0).setDepth(4)
    yoonggiIntro_2.setVisible(false); //융기대
    let gonggwaIntro = this.add.image(0,0, "gonggwa_intro").setOrigin(0).setDepth(4); 
    gonggwaIntro.setVisible(false);
    let gonggwaIntro_2 = this.add.image(0,0, "gonggwa_intro_2").setOrigin(0).setDepth(4)
    gonggwaIntro_2.setVisible(false); //공과대
    let haksaengIntro = this.add.image(0,0, "haksaeng_intro").setOrigin(0).setDepth(4); 
    haksaengIntro.setVisible(false);
    let haksaengIntro_2 = this.add.image(0,0, "haksaeng_intro_2").setOrigin(0).setDepth(4)
    haksaengIntro_2.setVisible(false); //학생식당
    
    //**단과대 선택 버튼
    let yeahsoolButton = this.add.image(360, 235, "yeahsool").setDepth(1);
    yeahsoolButton.setInteractive({ draggable: false, cursor: "pointer" });
    yeahsoolButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[1] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      yeahsoolButton.setVisible(false);
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      yeahsoolIntro.setVisible(true);
      yeahsoolNextButton.setVisible(true);
    })
    
    let designButton = this.add.image(590, 235, "design").setDepth(1);
    designButton.setInteractive({ draggable: false, cursor: "pointer" });
    designButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[2] = 1;
      //** 한번 누르면 단과대 버튼들 안보이게 설정
      yeahsoolButton.setVisible(false);
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      designIntro.setVisible(true);
      designNextButton.setVisible(true);
    })
    
    let geulinButton = this.add.image(360, 545, "geulin").setDepth(1);
    geulinButton.setInteractive({ draggable: false, cursor: "pointer" });
    geulinButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[4] = 1;
      yeahsoolButton.setVisible(false); //** 한번 누르면 단과대 버튼들 안보이게 설정
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      geulinIntro.setVisible(true);
      geulinNextButton.setVisible(true);
      
    })
    
    let yoonggiButton = this.add.image(130, 545, "yoonggi").setDepth(1);
    yoonggiButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggiButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[3] = 1;
      yeahsoolButton.setVisible(false); //** 한번 누르면 단과대 버튼들 안보이게 설정
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      yoonggiIntro.setVisible(true);
      yoonggiNextButton.setVisible(true);
      
    })
    
    
    let gonggwaButton = this.add.image(590, 545, "gonggwa").setDepth(1);
    gonggwaButton.setInteractive({ draggable: false, cursor: "pointer" });
    gonggwaButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[5] = 1;
        this.data.clear[1] = 1;
      yeahsoolButton.setVisible(false); //** 한번 누르면 단과대 버튼들 안보이게 설정
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      gonggwaIntro.setVisible(true);
      gonggwaNextButton.setVisible(true);
      
    })
    
    let haksaengButton = this.add.image(130, 235, "cafeterria").setDepth(1);
    haksaengButton.setInteractive({ draggable: false, cursor: "pointer" });
    haksaengButton.on("pointerup", ()=>{
      this.button_click.play();
      this.data.try[0] = 1;
      yeahsoolButton.setVisible(false); //** 한번 누르면 단과대 버튼들 안보이게 설정
      designButton.setVisible(false); //디자인대
      geulinButton.setVisible(false); //글인대
      yoonggiButton.setVisible(false); //융기대
      gonggwaButton.setVisible(false); //공과대
      haksaengButton.setVisible(false); //학생식당
      
      haksaengIntro.setVisible(true);
      haksaengNextButton.setVisible(true);
    })

    if (this.data.try[0] == 0)
      yeahsoolButton.setVisible(false);
    else {
      if (this.data.cleared[0] == 0) {
        this.add.image(65, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(70, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[1] == 0)
      designButton.setVisible(false);
    else {
      if (this.data.cleared[1] == 0) {
        this.add.image(275, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(280, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[2] == 0)
      yoonggiButton.setVisible(false);
    else {
      if (this.data.cleared[2] == 0) {
        this.add.image(490, 385, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(495, 385, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[3] == 0)
      geulinButton.setVisible(false);
    else {
      if (this.data.cleared[3] == 0) {
        this.add.image(45, 695, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(45, 695, "cleared").setDepth(3).setScale(0.5);
      }
    }
    if (this.data.try[4] == 0)
      gonggwaButton.setVisible(false);
    else {
      if (this.data.cleared[4] == 0) {
        this.add.image(245, 695, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(245, 695, "cleared").setDepth(3).setScale(0.5);
      }
    }
    
    if (this.data.try[5] == 1) {
      if (this.data.cleared[5] == 0) {
        this.add.image(530, 695, "overed").setDepth(3).setScale(0.5);
      } else {
        this.add.image(530, 695, "cleared").setDepth(3).setScale(0.5);
      }
    }

    //**단과대 설명 버튼
    let yeahsoolNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    yeahsoolNextButton.setScale(0.3);
    yeahsoolNextButton.setVisible(false); //예술대
    let designNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    designNextButton.setScale(0.3);
    designNextButton.setVisible(false); //디자인대
    let geulinNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    geulinNextButton.setScale(0.3);
    geulinNextButton.setVisible(false); //글인대
    let yoonggiNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    yoonggiNextButton.setScale(0.3);
    yoonggiNextButton.setVisible(false); //융기대
    let gonggwaNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    gonggwaNextButton.setScale(0.3);
    gonggwaNextButton.setVisible(false); //공과대
    let haksaengNextButton = this.add.image(this.game.renderer.width - 80, 860, "intro_button").setDepth(4);
    haksaengNextButton.setScale(0.3);
    haksaengNextButton.setVisible(false); //학생식당

    //**단과대 게임 시작 버튼
    let yeahsoolStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    yeahsoolStartButton.setScale(0.3);
    yeahsoolStartButton.setVisible(false); //예술대
    let designStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    designStartButton.setScale(0.3);
    designStartButton.setVisible(false); //디자인대
    let geulinStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    geulinStartButton.setScale(0.3);
    geulinStartButton.setVisible(false); //글인대
    let yoonggiStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    yoonggiStartButton.setScale(0.3);
    yoonggiStartButton.setVisible(false); //융기대
    let gonggwaStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    gonggwaStartButton.setScale(0.3);
    gonggwaStartButton.setVisible(false); //공과대
    let haksaengStartButton = this.add.image(this.game.renderer.width - 80, 860, "start_button").setDepth(4);
    haksaengStartButton.setScale(0.3);
    haksaengStartButton.setVisible(false); //학생식당
    
    // 버튼 이벤트
    homepageButton.setInteractive({ draggable: false, cursor: "pointer" });

    yeahsoolNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    designNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    geulinNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggiNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    gonggwaNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    haksaengNextButton.setInteractive({ draggable: false, cursor: "pointer" });
    
    yeahsoolStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    designStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    geulinStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    yoonggiStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    gonggwaStartButton.setInteractive({ draggable: false, cursor: "pointer" });
    haksaengStartButton.setInteractive({ draggable: false, cursor: "pointer" });

    
    homepageButton.on("pointerup", ()=>{
      window.location.href = "https://www.smu.ac.kr/ko/index.do";
    })

    yeahsoolNextButton.on("pointerup", ()=>{
      this.button_click.play();
      yeahsoolIntro.setVisible(false);
      yeahsoolIntro_2.setVisible(true);
      yeahsoolNextButton.setVisible(false);
      yeahsoolStartButton.setVisible(true);
    })

    yeahsoolStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.YEAHSOOL, this.data);
    })

    designNextButton.on("pointerup", ()=>{
      this.button_click.play();
      designIntro.setVisible(false);
      designIntro_2.setVisible(true);
      designNextButton.setVisible(false);
      designStartButton.setVisible(true);
    })

    designStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.DESIGN, this.data);
    })

    geulinNextButton.on("pointerup", ()=>{
      this.button_click.play();
      geulinIntro.setVisible(false);
      geulinIntro_2.setVisible(true);
      geulinNextButton.setVisible(false);
      geulinStartButton.setVisible(true);
    })

    geulinStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.GEULIN, this.data);
    })

    yoonggiNextButton.on("pointerup", ()=>{
      this.button_click.play();
      yoonggiIntro.setVisible(false);
      yoonggiIntro_2.setVisible(true);
      yoonggiNextButton.setVisible(false);
      yoonggiStartButton.setVisible(true);
    })

    yoonggiStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.YOONGGI, this.data);
    })

    gonggwaNextButton.on("pointerup", ()=>{
      this.button_click.play();
      gonggwaIntro.setVisible(false);
      gonggwaIntro_2.setVisible(true);
      gonggwaNextButton.setVisible(false);
      gonggwaStartButton.setVisible(true);
    })

    gonggwaStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.GONGGWA, this.data);
    })

    haksaengNextButton.on("pointerup", ()=>{
      this.button_click.play();
      haksaengIntro.setVisible(false);
      haksaengIntro_2.setVisible(true);
      haksaengNextButton.setVisible(false);
      haksaengStartButton.setVisible(true);
    })

    haksaengStartButton.on("pointerup", ()=>{
      this.button_click.play();
      this.scene.start(CST.SCENES.HAKSAENG, this.data);
    })
    
    
  }
}