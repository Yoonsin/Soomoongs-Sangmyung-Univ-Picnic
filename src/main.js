/** @type {import("../typings/phaser")} */

import {LoadingScene} from "./scenes/LoadingScene.js";
import {NameScene} from "./scenes/NameScene.js";
import {TitleScene} from "./scenes/TitleScene.js";
import {CampusScene} from "./scenes/CampusScene.js";
import {SeoulScene} from "./scenes/SeoulScene.js";
import {ClearScene} from "./scenes/ClearScene.js";
import {FinalClearScene} from "./scenes/FinalClearScene.js";
import {SeoulOverScene} from "./scenes/SeoulOverScene.js";
import {CheonOverScene} from "./scenes/CheonOverScene.js";
import {InsaScene} from "./scenes/InsaScene.js";
import {YoonggongScene} from "./scenes/YoonggongScene.js";
import {MoonyeahScene} from "./scenes/MoonyeahScene.js";
import {SabeomScene} from "./scenes/SabeomScene.js";
import {TwoGyeongScene} from "./scenes/TwoGyeongScene.js";
import {MibaekScene} from "./scenes/MibaekScene.js";
import {CheonanScene} from "./scenes/CheonanScene.js";
import {GeulinScene} from "./scenes/GeulinScene.js";
import {YoonggiScene} from "./scenes/YoonggiScene.js";
import {YeahsoolScene} from "./scenes/YeahsoolScene.js";
import {DesignScene} from "./scenes/DesignScene.js";
import {GonggwaScene} from "./scenes/GonggwaScene.js";
import {HaksaengScene} from "./scenes/HaksaengScene.js";

let game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 700,
    height: 900,
    backgroundColor: '#F9D3A6',
    dom: {  // dom div area 생성
      createContainer: true
    },
    physics: {  //물리 설정
      default: 'arcade',
      arcade: {
          debug: false
      }
    },
    scene: [
        LoadingScene,
        NameScene,
        TitleScene,
        CampusScene,
        SeoulScene,
        ClearScene,
        FinalClearScene,
        SeoulOverScene,
        CheonOverScene,
        InsaScene,
        YoonggongScene,
        MoonyeahScene,
        SabeomScene,
        TwoGyeongScene,
        MibaekScene,
        CheonanScene,
        GeulinScene,
        YoonggiScene,
        YeahsoolScene,
        DesignScene,
        GonggwaScene,
        HaksaengScene
      
    ],
   scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
   }
});