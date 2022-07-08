// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from "./Ball";
import Barrier from "./Barrier";
import macro = cc.macro;

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainContoller extends cc.Component {

    @property([cc.Prefab])
    polygonTypes: cc.Prefab[] = [];

    balls: Ball[] = [];
    barriers: Barrier[] = [];

    initPhysicsManager() {
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags =
            cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit |
            // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    onLoad() {
        this.initPhysicsManager();
        this.addBarriers();
    }

    start() {

    }

    // update (dt) {}

    addBarriers() {
        let startPosX = -290;
        let endPosX = 230;

        let currentPosX = startPosX + this.getRandomSpace();
        while (currentPosX < endPosX) {
            let randomIndex = Math.floor(this.polygonTypes.length * Math.random());
            console.log(randomIndex, currentPosX);
            let barrierTemp = cc.instantiate(this.polygonTypes[randomIndex]).getComponent(Barrier);
            barrierTemp.node.parent = this.node;
            barrierTemp.node.rotation = Math.random() * 360;
            barrierTemp.node.position = cc.v3(currentPosX, -344);
            this.barriers.push(barrierTemp);

            currentPosX += this.getRandomSpace();
        }
    }

    getRandomSpace(): number {
        return 100 + Math.random() * 100;
    }
}
