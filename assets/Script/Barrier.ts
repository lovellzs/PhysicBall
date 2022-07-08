// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainContoller from "./MainContoller";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrier extends cc.Component {

    private score: number = 100;

    @property(cc.Label)
    lbScore: cc.Label = null;

    @property(Boolean)
    isBuffBall: Boolean = false;

    mainController: MainContoller = null;

    onLoad() {
        // this.score = 100 + Math.floor(this.score * Math.random());
        // this.lbScore.string = this.score.toString();
        this.setScore(this.score);
    }

    start() {
        console.log("this.node.rotation " + this.node.rotation);
        if (this.lbScore) {
            this.lbScore.node.rotation = -this.node.rotation;
        }
    }

    // update (dt) {}

    setScore(score: number) {
        if (this.lbScore) {
            this.score = score;
            this.lbScore.string = this.score.toString();
        }
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (this.isBuffBall) {
            this.mainController.addBall(this.node.getPosition())
            this.mainController.removeBarrier(this);
        } else {
            this.setScore(this.score - 1);
            this.mainController.addTotalScore();
            if(this.score==0){
                this.mainController.removeBarrier(this);
            }
        }
    }

    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
    }

    onPostSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
    }

}
