import { CST } from "../CST.js";

export class LoadingScene extends Phaser.Scene{
  constructor() {
    super({
      key: CST.SCENES.LOADING
    })
  }

  preload() {   // 에셋 로드 영역
    // 로딩바 생성
    let progressBar =  this.add.graphics();
    let progressBox =  this.add.graphics();

    progressBox.fillStyle(0x222222,  0.5);
    progressBox.fillRoundedRect(190,  450,  320,  50,  5);
    this.load.on('progress',  function  (value)  {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRoundedRect(200, 460,  300*value, 30, 5);
      percentText.setText(Math.round(value*100) + '%');
    });

    this.load.on('complete',  function  ()  {
      progressBar.destroy();
      progressBox.destroy();
      percentText.destroy();
    });

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let percentText = this.make.text({
      x: width/2,
      y: height/2+25,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    percentText.setOrigin(0.5,  0.5);
    
    // 입력 영역 html
    this.load.html('nameform', "./assets/nameform.html");
    
    // 이미지
    this.load.image("document", "./assets/img/document.jpg");
    this.load.image("title_bg", "./assets/img/title_bg.png");
    this.load.image("choosing_bg", "./assets/img/choosing_bg.png");
    this.load.image("clear_bg", "./assets/img/clear_bg.png");
    this.load.image("gameover_bg", "./assets/img/gameover_bg.png");
    this.load.image("toSeoul_button", "./assets/img/toSeoul_button.png");
    this.load.image("toCheonan_button", "./assets/img/toCheonan_button.png");
    this.load.image("get2", "./assets/img/get2.png");
    
    this.load.image("introduce_game", "./assets/img/introduce_game.png");
    this.load.image("next_button", "./assets/img/next_button.png");
    this.load.image("nameform_info", "./assets/img/nameform_info.png");

    this.load.image("campus_bg", "./assets/img/campus_bg.png");
    this.load.image("seoul_map", "./assets/img/seoul_map.png");
    this.load.image("cheonan_map", "./assets/img/cheonan_map.png");
    this.load.image("cleared", "./assets/img/cleared.png");
    this.load.image("overed", "./assets/img/overed.png");
    this.load.image("seoul_to_cheonan", "./assets/img/seoul_to_cheonan.png");
    this.load.image("cheonan_to_seoul", "./assets/img/cheonan_to_seoul.png");
    this.load.image("get", "./assets/img/get.png");
    this.load.image("cafeterria", "./assets/img/cafeterria.png");
    this.load.image("insa", "./assets/img/insa.png");
    this.load.image("moonyeah", "./assets/img/moonyeah.png");
    this.load.image("sabeom", "./assets/img/sabeom.png");
    this.load.image("twogyeong", "./assets/img/twogyeong.png");
    this.load.image("yoonggong", "./assets/img/yoonggong.png");
    this.load.image("yoonggi", "./assets/img/yoonggi.png");
    this.load.image("yeahsool", "./assets/img/yeahsool.png");
    this.load.image("design", "./assets/img/design.png");
    this.load.image("geulin", "./assets/img/geulin.png");
    this.load.image("gonggwa", "./assets/img/gonggwa.png");

    this.load.image("brick_paddle", "./assets/img/brick_paddle.png");
    this.load.image("brick", "./assets/img/brick_brick.png"); // 벽돌(빨강)
    this.load.image("brick_2", "./assets/img/brick_brick_2.png"); // 벽돌(초록)
    this.load.image("brick_3", "./assets/img/brick_brick_3.png"); // 벽돌(파랑)

    this.load.image("bullet_player", "./assets/img/bullet_player.png"); //플레이어(수뭉이)
    this.load.image("bullet_bg", "./assets/img/bullet_bg.png"); //배경
    this.load.image("bullet_bg_cloudless", "./assets/img/bullet_bg_cloudless.png"); //배경 (구름 없음)
    this.load.image("bullet","./assets/img/bullet.png"); //총알(빨간색)
    this.load.image("bullet_2","./assets/img/bullet_2.png"); //총알(파란색)
    this.load.image("bullet_3","./assets/img/bullet_3.png"); //총알(초록색)
    this.load.image("a_score","./assets/img/a_score.png"); // A+학점
    this.load.image("b_score","./assets/img/b_score.png"); // b학점
    this.load.image("c_score","./assets/img/c_score.png"); // c학점
    
    this.load.image("bullet_drawing","./assets/img/bullet_drawing.png"); //적(=그림/디자인대)
    this.load.image("bullet_book","./assets/img/bullet_book.png"); //적(=책/인사대)
    this.load.image("bullet_line","./assets/img/bullet_line.png"); //경계선 긋는 용

    this.load.image("brick_happiness","./assets/img/brick_happiness.png"); //벽돌 총알(=행복/융기대)
    
    this.load.image("coding_bg", "./assets/img/coding_bg.png");
    this.load.image("drawing_bg", "./assets/img/drawing_bg.png");
    this.load.image("shooting_bg", "./assets/img/shooting_bg.png");
    this.load.image("eating_bg", "./assets/img/eating_bg.png");

    this.load.image("to_campus_button", "./assets/img/to_campus_button.png");
    this.load.image("cheonan_button", "./assets/img/cheonan_button.png");
    this.load.image("seoul_button", "./assets/img/seoul_button.png");
    this.load.image("clear_button", "./assets/img/clear_button.png");
    this.load.image("homepage_button", "./assets/img/homepage_button.png");
    
    this.load.image("re_button", "./assets/img/re_button.png");
    this.load.image("start_button", "./assets/img/start_button.png");
    this.load.image("intro_button", "./assets/img/intro_button.png");

    this.load.image("tmp_clear_button", "./assets/img/tmp_clear_button.png");
    this.load.image("tmp_over_button", "./assets/img/tmp_over_button.png");
    
    this.load.image("collider", "./assets/img/collider.png"); //콜라이더

    // 식당 - 배경, 사과, 밥, 국, 드링크
    this.load.image("mibaek_bg", "./assets/img/mibaek_bg.png");
    this.load.image("apple", "./assets/img/apple.png");
    this.load.image("rice", "./assets/img/rice.png");
    this.load.image("soup", "./assets/img/soup.png");
    this.load.image("drink", "./assets/img/drink.png");

    // 융공대, 공대 - 배경, 로봇, 화학, 노트북, 반도체
    this.load.image("yoonggong_bg", "./assets/img/yoonggong_bg.png");
    this.load.image("robot", "./assets/img/robot.png");
    this.load.image("chemical", "./assets/img/chemical.png");
    this.load.image("laptop", "./assets/img/laptop.png");
    this.load.image("semiconductor", "./assets/img/semiconductor.png");
    this.load.image("professor_said", "./assets/img/professor_said.png");

    // 문예대 - 1라운드
    this.load.image("yeahsool_bg", "./assets/img/yeahsool_bg.png");
    this.load.image("yeahsool_bg_garo", "./assets/img/yeahsool_bg_garo.png");
    this.load.image("yeahsool_bg_sero", "./assets/img/yeahsool_bg_sero.png");
    this.load.image("picture1", "./assets/img/picture1.png");
    this.load.image("picture1_wrong", "./assets/img/picture1_wrong.png");
    this.load.image("picture2", "./assets/img/picture2.png");
    this.load.image("picture2_wrong", "./assets/img/picture2_wrong.png");
    this.load.image("picture3", "./assets/img/picture3.png");
    this.load.image("picture3_wrong", "./assets/img/picture3_wrong.png");
    // 문예대 - 2라운드
    this.load.image("speaker_button", "./assets/img/speaker_button.png");
    this.load.image("doremi", "./assets/img/doremi.png");
    this.load.image("dosolpa", "./assets/img/dosolpa.png");
    this.load.image("misira", "./assets/img/misira.png");
    this.load.image("remipa", "./assets/img/remipa.png");
    this.load.image("repara", "./assets/img/repara.png");
    this.load.audio("doremi", "./assets/sound/doremi.mp3");
    this.load.audio("dosolpa", "./assets/sound/dosolpa.mp3");
    this.load.audio("misira", "./assets/sound/misira.mp3");
    this.load.audio("remipa", "./assets/sound/remipa.mp3");
    this.load.audio("repara", "./assets/sound/repara.mp3");

    // 디자인대
    this.load.image("design_UI", "./assets/img/design_UI.png");
    this.load.image("stop_btn", "./assets/img/stop_btn.png");
    this.load.image("cloth", "./assets/img/cloth.png");
    this.load.image("seramic", "./assets/img/seramic.png");
    this.load.image("VR", "./assets/img/VR.png");

    // 예술대
    this.load.image("yeahsool_answer_1", "./assets/img/yeahsool_answer_1.png"); // 사슴상
    this.load.image("wrong1_1", "./assets/img/wrong1_1.png");
    this.load.image("wrong2_1", "./assets/img/wrong2_1.png");
    this.load.image("wrong3_1", "./assets/img/wrong3_1.png");
    this.load.image("wrong4_1", "./assets/img/wrong4_1.png");
    this.load.image("wrong5_1", "./assets/img/wrong5_1.png");
    this.load.image("yeahsool_answer_2", "./assets/img/yeahsool_answer_2.png"); // 과방
    this.load.image("wrong1_2", "./assets/img/wrong1_2.png");
    this.load.image("wrong2-1_2", "./assets/img/wrong2-1_2.png");
    this.load.image("wrong2-2_2", "./assets/img/wrong2-2_2.png");
    this.load.image("wrong3_2", "./assets/img/wrong3_2.png");
    this.load.image("wrong4_2", "./assets/img/wrong4_2.png");
    this.load.image("wrong5_2", "./assets/img/wrong5_2.png");

    // 공과대 - 배경1(잠), 배경2(일어남), 게이지
    this.load.audio("wake_up", "./assets/sound/wake_up.mp3"); // 굿모닝 효과음
    this.load.image("gonggwa_bg", "./assets/img/gonggwa_bg.png");
    this.load.image("gonggwa_bg_2", "./assets/img/gonggwa_bg_2.png") ;
    this.load.image("gauge", "./assets/img/gauge.png"); //게이지

    // 융기대 - 배경, 포션, 솥
    this.load.image("yoonggi_bg_early", "./assets/img/yoonggi_bg_early.png"); // 조합법
    this.load.image("yoonggi_bg", "./assets/img/yoonggi_bg.png");    
    this.load.image("red_potion", "./assets/img/red_potion.png"); //힘의 물약
    this.load.image("gren_potion", "./assets/img/gren_potion.png"); //생명의 물약
    this.load.image("blue_potion", "./assets/img/blue_potion.png"); //활력의 물약
    this.load.image("food", "./assets/img/food.png" ); //음식
    this.load.image("water", "./assets/img/water.png" ); //물
    this.load.image("heal", "./assets/img/heal.png" ); //치료
    this.load.image("money", "./assets/img/money.png" ); //돈
    this.load.image("train", "./assets/img/train.png" ); //운동
    this.load.image("tech", "./assets/img/tech.png" ); //기술
    this.load.image("life", "./assets/img/life.png" ); //생명
    this.load.image("pot", "./assets/img/pot.png"); //솥


    // 배경음악 - 메인, 인게임, 게임 클리어, 게임 오버
    this.load.audio("lobby", "./assets/sound/lobby.mp3");
    this.load.audio("ingame", "./assets/sound/ingame.mp3");
    this.load.audio("game_clear", "./assets/sound/gameclear_sound.mp3");
    this.load.audio("game_over", "./assets/sound/gameover_sound.mp3");

    // 버튼 클릭음, 벽돌 깨기 효과음, 총알 발사음
    this.load.audio("button_click", "./assets/sound/button_click.mp3");
    this.load.audio("brick_break", "./assets/sound/brick_break.mp3");
    this.load.audio("gunshot", "./assets/sound/gunshot.mp3");

    // 단과대, 게임 설명란 (서울캠퍼스)
    this.load.image("insa_intro","./assets/img/insa_intro.png");
    this.load.image("insa_intro_2","./assets/img/insa_intro_2.png") //인사대
    this.load.image("yoonggong_intro","./assets/img/yoonggong_intro.png");
    this.load.image("yoonggong_intro_2","./assets/img/yoonggong_intro_2.png") //융공대
    this.load.image("sabeom_intro","./assets/img/sabeom_intro.png");
    this.load.image("sabeom_intro_2","./assets/img/sabeom_intro_2.png") //사범대
    this.load.image("moonyeah_intro","./assets/img/moonyeah_intro.png");
    this.load.image("moonyeah_intro_2","./assets/img/moonyeah_intro_2.png") //문예대
    this.load.image("twogyeong_intro","./assets/img/twogyeong_intro.png");
    this.load.image("twogyeong_intro_2","./assets/img/twogyeong_intro_2.png") //경경대
    this.load.image("mibaek_intro","./assets/img/mibaek_intro.png");
    this.load.image("mibaek_intro_2","./assets/img/mibaek_intro_2.png") //학생식당

    // 단과대, 게임 설명란 (천안캠퍼스)
    this.load.image("yeahsool_intro","./assets/img/yeahsool_intro.png");
    this.load.image("yeahsool_intro_2","./assets/img/yeahsool_intro_2.png") //예술대
    this.load.image("design_intro","./assets/img/design_intro.png");
    this.load.image("design_intro_2","./assets/img/design_intro_2.png") //디자인대
    this.load.image("geulin_intro","./assets/img/geulin_intro.png");

   
    this.load.image("document", "./assets/img/document.jpg");
   
    this.load.image("arrow", "./assets/img/arrow.png");
    this.load.image("geulin_intro_2","./assets/img/geulin_intro_2.png") //글인대
    this.load.image("gonggwa_intro","./assets/img/gonggwa_intro.png");
    this.load.image("gonggwa_intro_2","./assets/img/gonggwa_intro_2.png") //공과대
    this.load.image("yoonggi_intro","./assets/img/yoonggi_intro.png");
    this.load.image("yoonggi_intro_2","./assets/img/yoonggi_intro_2.png") //융기대
    this.load.image("haksaeng_intro","./assets/img/haksaeng_intro.png");
    this.load.image("haksaeng_intro_2","./assets/img/haksaeng_intro_2.png") //학생식당
  }

  create() {    // 게임 오브젝트 생성 영역
    this.scene.start(CST.SCENES.TITLE);
  }
}