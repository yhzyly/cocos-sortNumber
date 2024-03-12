import { _decorator, Component, Node, SystemEventType, Touch, Vec2, Sprite,find } from 'cc';
import { count, increaseCount, decreaseCount } from "./GlobalData";

const { ccclass, property } = _decorator;

@ccclass('DragItem')
export class DragItem extends Component {
    @property(Sprite)
    private targetSprite: Sprite = null;

    // 添加 targetPosition 属性
    private targetPosition: Vec2 = new Vec2();
    private _delta: Vec2 = new Vec2();
    private _isDragging = false;

    private flag = 1;//flag=1表示可以增加正确答案计数


    // @property([Sprite])
    // targetSprites: Sprite[] = [];

    // onLoad() {
    //     // 将所有目标组件的引用存储在数组中
    //     this.targetSprites = [this.node.getComponent(Sprite) as Sprite, this.node.getChildByName('Sprite1').getComponent(Sprite) as Sprite, this.node.getChildByName('Sprite2').getComponent(Sprite) as Sprite];
    // }


    start () {
        this.node.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(SystemEventType.TOUCH_CANCEL, this.onTouchEnd, this);

        let targetNode = find("Canvas/background/plates/Sprite4"); // 假设目标区域的节点名为 sprite1
        this.targetSprite = targetNode.getComponent(Sprite);
        
        if (this.targetSprite) {
            // 现在你可以在脚本中使用 this.targetSprite 来访问目标区域的 sprite1 组件了
            console.log("Found target sprite component!");
        } else {
            console.log("Target sprite component not found!");
        }
    }

    onTouchStart(touch: Touch, event: any) {
        this._isDragging = true;
    }

    onTouchMove(touch: Touch, event: any) {
        if (this._isDragging) {
            touch.getDelta(this._delta);
            this.node.setPosition(this.node.position.x + this._delta.x, this.node.position.y + this._delta.y);
        }
    }

    onTouchEnd(touch: Touch, event: any) {
        if (this._isDragging) {
            this._isDragging = false;
            // TODO: 这里你可以添加检查位置的代码
            
            if (this.targetSprite) {
                // 获取目标 Sprite 的位置，并将其转换为 vec2 类型的数据
                const targetPosition3D = this.targetSprite.node.position;
                this.targetPosition = new Vec2(targetPosition3D.x, targetPosition3D.y); // 获取目标 Sprite 的位置
                let nodePosition = this.node.position;

                if (Math.abs(nodePosition.x - this.targetPosition.x) < 10 && Math.abs(nodePosition.y - this.targetPosition.y) < 10) {
                    console.log("物体被拖到目标区域内 count:"+count);
                    if(this.flag){
                        increaseCount();
                        this.flag = 0;
                    }
                }else{
                    if(!this.flag){
                        decreaseCount();
                        this.flag = 1;
                    }
                }
            }
        }
    }

}

