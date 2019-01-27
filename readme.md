解决ios中默认不能请求http地址的问题：
用xcode打开工程，选中配置项-info-App-transport-security-setting 点加号添加一条
allow arbitrary loads 把值改成yes
		
安装codePush指令npm install -g code-push-cli
code-push账号就是github账号
token:d14a90c5287e583caf4a576ebfa414974688b633
执行指令：code-push app add zzpMeituan android react-native创建一个android工程，同理可创建ios工程
得到对应的android的key

 Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ geIP9RlgrN4Hs65r__BaE9CHwgCg2cc6ae3e-6ee3-4680-ab9a-e8f878409382 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ _RLRJi_czx3xfjK5wdjXoZf119f12cc6ae3e-6ee3-4680-ab9a-e8f878409382

code-push app add zzpMeituan-ios ios react-native执行得到ios的key

┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ usWh_se8OizSgJ-zc2VEx1PDYzV02cc6ae3e-6ee3-4680-ab9a-e8f878409382 │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ Y3hfUU9998z6mLRznUwxTgvEpkqx2cc6ae3e-6ee3-4680-ab9a-e8f878409382 │
└────────────┴──────────────────────────────────────────────────────────────────┘

在我们项目根目录下终端下输入指令：npm install --save react-native-code-push安装codepush到项目中
执行指令：react-native link将代码更新到原生项目中
中间需要输入android和ios的codepush的key

提交js bundle到codepush服务器：
code-push release-react zzpMeituan android

在android studio中打包apk安装到手机中

然后修改部分样式，重新提交bundle

查看热更新有没有生效

20190127日志：
1、android模拟器上的问题解决
a.首页标题栏搜索框没有居中
b.按钮点击的提示改一下，或者做一个静态页面
c.首页有一张网络图片加载不出，解决下
d.团购详情，标题没有居中
e.首页推荐，4宫格打开webview标题没居中
f.附近tab标题栏搜索框没有居中，列表点击没有进入商家详情页
g.我的tab标题栏标题文字没有居中，颜色改为白色
h.


    headerTitleStyle:{ flex:1, textAlign:'center',},



,
    headerRight:(
      <View/>
    )













