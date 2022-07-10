// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from "./Ball";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyMotionStreak extends cc.Component {

    @property(Ball)
    ball:Ball = null;

    protected onLoad() {
        // this.node.active = false;
    }

    protected update(dt: number) {
        // this.node.active = true;
        this.node.position = this.ball.node.position;
    }
}
