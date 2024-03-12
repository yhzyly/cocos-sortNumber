import { _decorator, Component, Node, director ,find} from 'cc';
import { count, resetCount } from "./GlobalData";
const { ccclass, property } = _decorator;

@ccclass('OverPanel')
export class OverPanel extends Component {

    private restart() {
        director.loadScene('scene'); //加载game场景
        let overpanelNode = find('Canvas/OverPanel');
        overpanelNode.active = false; 
        resetCount();
    }
}


