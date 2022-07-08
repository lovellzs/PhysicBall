// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrier extends cc.Component {

    private score:number = 100;

    @property(cc.Label)
    lbScore:cc.Label = null;

    onLoad () {
        // this.score = 100 + Math.floor(this.score * Math.random());
        // this.lbScore.string = this.score.toString();
        this.setScore(this.score);
    }

    start () {
        console.log("this.node.rotation " + this.node.rotation);
        this.lbScore.node.rotation = -this.node.rotation;
    }

    // update (dt) {}

    setScore(score:number){
        this.score = score;
        this.lbScore.string = this.score.toString();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log("onBeginContact");

    }

    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log("onPreSolve");
    }

    onPostSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log("onPostSolve");
    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log("onEndContact");
    }

}
