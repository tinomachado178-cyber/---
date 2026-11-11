# 滑动变阻器 · DeepSeek Harness 皮肤

把滑动变阻器嵌进 DeepSeek Harness Web 界面：

- 滑杆出现在输入框工具行里、「工作区内修改」右侧、模型选择器左侧。
- 照片从主界面正中间偏右开始覆盖显示，左侧柔和淡出，叠在对话区后面。
- 整页背景从 frame-00 的冷灰影棚底，逐渐过渡到 frame-30 的深黑底，并以照片为圆心扩散帝王金光。
- **当前不绑定任何功能**：拖动只改外观，不会切换模型或推理档位。档位保存在当前浏览器的 `localStorage`。

## 安装

需要先安装 DeepSeek Harness，并且终端里能运行 `dsh`。

在插件目录下执行（路径按你实际放置的位置修改）：

```sh
dsh plugin --profile web add "F:\huadong\dsh-liang-rheostat-skin"
```

然后重启 Web 界面：

```sh
dsh web
```

若你用的是官方 Desktop，请把 `--profile web` 改成你的桌面 profile 名（常见为 `desktop`），安装后完全退出并重新打开应用。

装完后打开一个会话，输入框「工作区内修改」右侧应出现迷你滑动变阻器和称号（小难梁…梁祖），主界面右侧出现人物照片。

## 卸载

```sh
dsh plugin --profile web remove dsh-liang-rheostat-skin
```

然后重启 `dsh web`。

## 开发

```sh
npm install
npm run build
```

`lib/client.js` 需要提交/分发；改 `src/client/index.jsx` 后必须重新构建。

## 素材

31 张过渡帧来自你提供的 `frame-00` … `frame-30`。
