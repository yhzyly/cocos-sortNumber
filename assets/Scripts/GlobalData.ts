// GlobalData.ts
import { _decorator, Component, Node, director,find } from 'cc';

// 定义全局变量 count
export let count: number = 0;

// 增加 count 的函数
export function increaseCount() {
    count++;
    if (count === 7) {
        // 当 count 达到 5 时，输出成功画面
        console.log("成功画面");
        let overpanelNode = find('Canvas/OverPanel');
        overpanelNode.active = true;        
    }
}

// 减少 count 的函数
export function decreaseCount() {
    if (count > 0) {
        count--;       
    }
}

// 重置 count 的函数
export function resetCount() {
    count = 0;
}