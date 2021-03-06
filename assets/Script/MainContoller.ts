// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Ball from "./Ball";
import Barrier from "./Barrier";
import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainContoller extends cc.Component {

    @property([cc.Prefab])
    polygonTypes: cc.Prefab[] = [];

    @property(cc.Prefab)
    prefabBall: cc.Prefab = null;

    @property([Ball])
    balls: Ball[] = [];

    @property(cc.Label)
    lbTotalScore: cc.Label = null;

    barriers: Barrier[] = [];

    totalScore: number = -1;

    initPhysicsManager() {
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     // cc.PhysicsManager.DrawBits.e_pairBit |
        //     // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    }

    onLoad() {
        this.initPhysicsManager();
        this.addBarriers();

        this.balls[0].mainController = this;
        this.balls[0].node.group = Config.groupBallInRecycle;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }


    start() {
        this.addTotalScore();
    }

    // update (dt) {}


    onTouchStart(touch: cc.Event.EventTouch) {
        if (!this.isRecycleFinish()) {
            return;
        }
        this.recycleBallCount = 0;

        let touchPos = this.node.convertTouchToNodeSpaceAR(touch.touch);
        // this.shootBall(this.balls[0],touchPos.sub(cc.v2(0,360)));
        this.shootBalls(touchPos.sub(cc.v2(0, 360)));
    }

    addBall(pos: cc.Vec2) {
        let ball = cc.instantiate(this.prefabBall).getComponent<Ball>(Ball);
        ball.node.parent = this.node;
        ball.node.setPosition(pos);
        ball.mainController = this;
        ball.node.group = Config.groupBallInGame;
        this.balls.push(ball);
    }

    shootBalls(direction: cc.Vec2) {
        for (let i = 0; i < this.balls.length; i++) {
            let ballTmp = this.balls[i];
            this.scheduleOnce(function () {
                this.shootBall(ballTmp, direction);
            }.bind(this), i * 0.3);
        }
    }

    shootBall(ball: Ball, direction: cc.Vec2) {
        ball.rigidBody.active = false;
        ball.node.group = Config.groupBallInGame;

        let poses: cc.Vec2[] = [];
        poses.push(ball.node.getPosition());
        poses.push(cc.v2(0, 360));

        ball.node.runAction(cc.sequence(
            cc.cardinalSplineTo(0.5, poses, 0.8),
            cc.callFunc(function () {
                ball.rigidBody.active = true;
                ball.rigidBody.linearVelocity = direction.mul(3)
            })
        ));
    }

    private recycleBallCount = 1;

    //?????????
    recycleBall() {
        this.recycleBallCount++;

        if (this.isRecycleFinish()) {
            for (let i = 0; i < this.barriers.length; i++) {
                let barrier = this.barriers[i];
                barrier.node.runAction(cc.moveBy(0.5, cc.v2(0, 100)));
            }
            this.addBarriers();
        }
    }

    isRecycleFinish(): Boolean {
        return this.recycleBallCount == this.balls.length;
    }


    addBarriers() {
        let startPosX = -290;
        let endPosX = 230;

        let currentPosX = startPosX + this.getRandomSpace();
        while (currentPosX < endPosX) {
            let randomIndex = Math.floor(this.polygonTypes.length * Math.random());
            console.log(randomIndex, currentPosX);
            let barrierTemp = cc.instantiate(this.polygonTypes[randomIndex]).getComponent<Barrier>(Barrier);
            barrierTemp.node.parent = this.node;
            barrierTemp.mainController = this;
            barrierTemp.node.rotation = Math.random() * 360;
            barrierTemp.node.position = cc.v3(currentPosX, -344);
            this.barriers.push(barrierTemp);

            currentPosX += this.getRandomSpace();
        }
    }

    getRandomSpace(): number {
        return 100 + Math.random() * 100;
    }

    removeBarrier(barrier: Barrier) {
        let index = this.barriers.indexOf(barrier);
        if (index != -1) {
            barrier.node.removeFromParent(false);
            this.barriers.slice(index, 1)
        }
    }

    addTotalScore() {
        this.totalScore += 1;
        this.lbTotalScore.string = this.totalScore.toString();
    }
}
