# 快速上手

## 安装

npm 或 yarn 安装

## 使用

```js
import { Button, Cell } from 'react-vant';
import 'react-vant/dist/react-vant.css';
```

### 定制主题

React-Vant 的样式使用了 [scss](https://sass-lang.com) 和 [css 变量](https://www.w3.org/Style/CSS/) 相结合做为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，实现定制主题的能力。

```js
document.documentElement.style.setProperty('--theme-primary', '#108ee9');
```

以下是一些最常用的通用变量

```scss
--theme-primary: #00bc70; // 全局主色
--theme-success: #00bc70; // 成功色
--theme-warning: #ec9231; // 警告色
--theme-danger: #ff5050; // 危险色
```
