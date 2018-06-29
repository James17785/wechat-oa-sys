# React Native

1. 搭建开发环境
Homebrew, Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。
brew install node

安装完node后建议设置npm镜像以加速后面的过程
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。
npm install -g yarn react-native-cli

安装完yarn后同理也要设置镜像源：
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

Watchman是由Facebook提供的监视文件系统变更的工具。
brew install watchman

测试安装
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios

修改项目
现在你已经成功运行了项目，我们可以开始尝试动手改一改了：
使用你喜欢的编辑器打开App.js并随便改上几行。
在iOS Emulator中按下⌘-R就可以刷新APP并看到你的最新修改！

2. Hello World
根据历史悠久的“传统”，我们也来写一个“Hello World”：

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}
代码结构
第一句：import 引入library
第二句：批量定义组件
第三句：构建Heollo World入口类， export default class HelloWorldApp extends Component
第四句：提供视图的样式，那么StyleSheet.create
第五句：style={styles.container}
第六句：注册应用入口，这个一定不能少，否则模拟器会提示报错：
    AppRegistry.registerComponent('HelloWorld', () => HelloWorld);

3. 我们使用两种数据来控制一个组件：props和state。props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。 对于需要改变的数据，我们需要使用state。

4. 使用Flexbox布局
flexDirection: 主轴布局，默认是 column
justifyContent: 可以决定其子元素沿着主轴的排列方式, 对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between
alignItems: 子元素沿着次轴的排列方式， 对应的这些可选项有：flex-start、center、flex-end以及stretch。

5. 处理文本输入
TextInput是一个允许用户输入文本的基础组件。它有一个名为onChangeText的属性，此属性接受一个函数，而此函数会在文本变化时被调用
另外还有一个名为onSubmitEditing的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。

6. 如何使用滚动视图














