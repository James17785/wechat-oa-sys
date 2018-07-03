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
ScrollView是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView不仅可以垂直滚动，还能水平滚动

7. 如何使用长列表
React native 提供了一些适合展示场列表的组件
FlatList: 显示垂直的滚动列表， 其中的元素之间结构近似而仅数据不同。FlatList更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，FlatList并不立即渲染所有元素，而是优先渲染屏幕上可见的元素。
FlatList 的两个属性data数据源，renderItem 数据源中单个数据。

SectionList: 要渲染的是一组需要分组的数据，也许还带有分组标签的, 数据源sections, 单个数据renderSectionHeader

8. 网络
fetch(url,{
	method: 'POST' | 'GET',
	headers: {
		'Accept': 'application/json',
   		'Content-Type': 'application/json'
	},
	body:string
})

Content-Type有很多种，对应body的格式也有区别。到底应该采用什么样的Content-Type取决于服务器端, 常用的'Content-Type'除了上面的'application/json', 还有传统的网页表单形式

9. 集成到现有原生应用
把React Native组件集成到iOS集成应用中有如下几个主要步骤：

首先当然要了解你要集成的React Native组件。
创建一个Podfile，在其中以subspec的形式填写所有你要集成的React Native的组件。
创建js文件，编写React Native组件的js代码。
添加一个事件处理函数，用于创建一个RCTRootView。这个RCTRootView正是用来承载你的React Native组件的，而且它必须对应你在index.js中使用AppRegistry注册的模块名字。
启动React Native的Packager服务，运行应用。
根据需要添加更多React Native的组件。
调试。
准备部署发布 （可以使用node_modules/react-native/scripts/react-native-xcode.sh脚本）。
发布应用，升职加薪，走向人生巅峰！

10. 处理触摸事件
可点击的组件通过onPress 属性接受一个点击事件的处理函数
一般来说，你可以使用TouchableHighlight来制作按钮或者链接。注意此组件的背景会在用户手指按下时变暗。
在Android上还可以使用TouchableNativeFeedback，它会在用户手指按下时形成类似墨水涟漪的视觉效果。
TouchableOpacity会在用户手指按下时降低按钮的透明度，而不会改变背景的颜色。
如果你想在处理点击事件的同时不显示任何视觉反馈，则需要使用TouchableWithoutFeedback。

长按， onLongPress

在列表中上下滑动和在视图上左右滑动
ScrollView 可以在垂直和水平方向滚动， 还可以配置pagingEnabled让整个屏都滑动
ListView用于显示较长的垂直列表。

双指缩放
如果在ScrollView中只放一个组件，则可以用来缩放操作。设置maximumZoomScale 和minimumZoomScale属性可以使用户能够缩放其中的内容。

11. React Native提供了两个互补的动画系统：用于全局的布局动画LayoutAnimation，和用于创建更精细的交互控制的动画Animated。

Animated以声明的方式定义动画的输入输出，与其中建立一个可配置的变化函数，然后使用start/stop 方法来控制动画按顺序执行。Animated仅封装了四个组件：View，Text， Image 和 ScrollView，不过你也可以使用Animated.createAnimatedComponent()来封装你自己的组件。

组合动画， 多个动画可以通过parallel（同时执行）、sequence（顺序执行）、stagger和delay来组合使用。它们中的每一个都接受一个要执行的动画数组，并且自动在适当的时候调用start/stop。

插值 - interpolate
Animated API还有一个很强大的部分就是interpolate插值函数。它可以接受一个输入区间，然后将其映射到另一个的输出区间。下面是一个一个简单的从0-1区间到0-100区间的映射示例：

value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});

跟踪动态值， 动画中所设的值还可以通过跟踪别的值得到。
输入事件，Animated.event是Animated API中与输入有关的部分，允许手势或其它事件直接绑定到动态值上。

响应当前的动画值
spring.stopAnimation(callback)会停止动画并且把最终的值作为参数传递给回调函数callback——这在处理手势动画的时候非常有用。
spring.addListener(callback) 会在动画的执行过程中持续异步调用callback回调函数，提供一个最近的值作为参数。这在用于触发状态切换的时候非常有用，譬如当用户拖拽一个东西靠近的时候弹出一个新的气泡选项。不过这个状态切换可能并不会十分灵敏，因为它不像许多连续手势操作（如旋转）那样在60fps下运行。

使用原生动画驱动， Animated可以序列化，这样可以转化为字符串以便存储和通信。
在动画中启用原生驱动非常简单。只需在开始动画之前，在动画配置中加入一行useNativeDriver。
动画值在不同的驱动方式之间是不能兼容的。因此如果你在某个动画中启用了原生驱动，那么所有和此动画依赖相同动画值的其他动画也必须启用原生驱动。

LayoutAnimation， LayoutAnimation允许你在全局范围内创建和更新动画，这些动画会在下一次渲染或布局周期运行。它常用来更新flexbox布局，因为它可以无需测量或者计算特定属性就能直接产生动画。
另外，如果要在Android上使用LayoutAnimation，那么目前还需要在UIManager中启用：
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

requestAnimationFrame， setNativeProps

12. 定时器
setTimeout, clearTimeout
setInterval, clearInterval
setImmediate, clearImmediate
requestAnimationFrame, cancelAnimationFrame

用InteractionManager来确保在执行繁重工作之前所有的交互和动画都已经处理完毕。

requestAnimationFrame(): 用来执行在一段时间内控制视图动画的代码
setImmediate/setTimeout/setInterval(): 在稍后执行代码。注意这有可能会延迟当前正在进行的动画。
runAfterInteractions(): 在稍后执行代码，不会延迟当前进行的动画。

务必在卸载组件前清除定时器！

13. 直接操作
setNativeProps是一个“简单粗暴”的方法，它直接在底层（DOM、UIView等）而不是React组件中记录state，这样会使代码逻辑难以理清。所以在使用这个方法之前，请尽量先尝试用setState和shouldComponentUpdate方法来解决问题。

14.调试
自动刷新， 但有些时候你必须要重新编译应用才能使修改生效：
增加了新的资源(比如给iOS的Images.xcassets或是Andorid的res/drawable文件夹添加了图片)
更改了任何的原生代码（objective-c/swift/java）

红屏错误，console.error()
黄屏警告，console.warn()

访问控制台日志
在运行RN应用时，可以在终端中运行如下命令来查看控制台的日志：
$ react-native log-ios
$ react-native log-android
此外，你也可以在iOS模拟器的菜单中选择Debug → Open System Log...来查看。如果是Android应用，无论是运行在模拟器或是真机上，都可以通过在终端命令行里运行adb logcat *:S ReactNative:V ReactNativeJS:V命令来查看.

Chrome开发者工具,在开发者菜单中选择"Debug JS Remotely"选项，即可以开始在Chrome中调试JavaScript代码。

在Chrome的菜单中选择Tools → Developer Tools可以打开开发者工具，也可以通过键盘快捷键来打开（Mac上是Command⌘ + Option⌥ + I，Windows上是Ctrl + Shift + I或是F12）。打开有异常时暂停（Pause On Caught Exceptions）选项，能够获得更好的开发体验。















