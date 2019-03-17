# Healer-Player
> 基于Vue全家桶(2.x)制作的移动端音乐 WebApp，一个媲美原生的移动端音乐App，来源于imooc的实战课程，歌曲数据全部来自QQ音乐，自己动手实践并加以修改拓展。在原版的基础上稍稍改动了下UI,并添加了歌单&歌曲&专辑评论列表,歌手的专辑列表(如果出现歌曲无法播放的情况,很有可能是因为这首歌要收费)
  
 在线预览地址:http://39.108.127.214:9000
  
  PS:用chrome的iPhone6PLUS浏览效果更好
 （转载请注明出处，欢迎大家star和follow😆）
 
 之后还会继续更新添加新的功能的！
## 技术栈

【前端】

- `Vue`
- `vue-router`
- `vuex`：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- `better-scroll`：方便好用的第三方插件，使移动端滑动体验更加流畅

【后端】

- `Node.js`：利用 Express 起一个本地测试服务器
- `jsonp`：服务端通讯。抓取 QQ音乐数据
- `axios`：服务端通讯。结合 Node.js 代理后端请求，抓取QQ音乐数据

## 实现细节

主要页面：歌单推荐页，歌手列表页，排行榜页，歌手详情页，搜索页，个人中心页，播放器内核页

**推荐页**

上部分是一个轮播图组件，使用了第三方库‘better-scroll’实现，利用jsonp抓取了QQ音乐主页的内容

下部分是一个歌单的推荐列表，使用了axios和node.js，代理了后端请求，伪造headers抓取到的数据

**歌单详情页，歌手详情页**

分为左右两块

歌手详情页中：左块为歌曲列表，右块为专辑列表

歌单详情页中：左块为歌曲列表，右块为评论列表

**歌手列表页**

左侧是歌手列表，使用json抓取

右侧是字幕列表，类似于通讯录的功能，与左侧歌手列表联动

**播放器内核页**

是本项目的核心组件

利用vuex管理各种播放状态，用audio API控制歌曲的播放，暂停

可供切换的播放模式有：顺序播放，单曲循环，随机播放

歌词利用axios代理后端请求实现抓取，并使用Base64对歌词进行解码

播放器页面中添加了歌手入口，专辑入口，歌曲评论列表弹窗

## 遇到的困难

歌手列表中的左右联动

歌曲播放url的获取，目前我都还没完全理解获取的过程，QQ音乐对请求的各种key有要求，暂时先借用的别人写好的api。

后端API的编写也是难点，对返回数据的解析也是挺难。




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
