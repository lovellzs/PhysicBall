// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    private rigidBody:cc.RigidBody = null;
    private isTouchedGround = false;

    onLoad () {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    }

    start () {

    }

    update (dt) {
        if(this.isTouchedGround){
            this.rigidBody.active = false;
            this.rigidBody.linearVelocity = cc.Vec2.ZERO;

            let pathPos:cc.Vec2[] = [];
            pathPos.push(cc.v2(this.node.x,this.node.y));
            pathPos.push(cc.v2(336,-423));
            pathPos.push(cc.v2(336,560));
            pathPos.push(cc.v2(2,458));

            this.node.runAction(cc.sequence(
                cc.cardinalSplineTo(2,pathPos,1),
                cc.callFunc(function (){
                    this.rigidBody.active = true;
                }.bind(this))
            ));
            this.isTouchedGround = false;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        console.log("onBeginContact");
        if(otherCollider.node.name=="ground"){
            this.isTouchedGround = true;
        }
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
