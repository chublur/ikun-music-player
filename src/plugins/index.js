// 对引入的组件集中管理
import { Swipe, SwipeItem, Button, Popup } from 'vant';
// 放入数组
let plugins =
    [Swipe, SwipeItem, Button, Popup]


export default function getvant(app) {
    plugins.forEach(item => {
        return app.use(item)
    });
}