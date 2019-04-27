#如何长期使用webstorm？
喜欢使用webstorm的你是否有这样的困扰，webstorm为什么不是免费的？找到的注册码每过一段时间就提示过期了？大神写的在线分享注册码的链接都被封了？
长期饱受注册码困扰的你，需要一个长期免费试用webstorm的方法？

好的，接下来我们一起来看一下如何才能长期使用webstorm吧。
如何资金允许的话，还是建议大家去购买正版的授权。

[IntelliJ IDEA注册码补丁下载链接](http://idea.lanyus.com/  "IntelliJ IDEA注册码补丁下载链接")

1. 下载注册码补丁文件

2. 找到C:\Windows\System32\drivers\etc 路径下的 hosts文件

3. 在C:\Windows\System32\drivers\etc\hosts 文件的末尾加入
```
#webstorm
0.0.0.0 account.jetbrains.com
0.0.0.0 www.jetbrains.com
```

4. 找到你webstorm的安装目录下的bin文件夹，将下载好的补丁文件如知道改文件夹下。
 将下载的补丁文件路径按如下格式添加到bin文件夹下的```webstorm.exe.vmoptions```和```webstorm64.exe.vmoptions```文件的第一行。
 ```
-javaagent:E:\IDE\webstorm\WebStorm 2017.3.5\bin\JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar
```
(注意替换 ```-javaagent:``` 后的文件路径)

5.  完成上面修改之后，重新打开webstorm。

选择Enter Key：

选择Activation code，
在下方填入```-javaagent:E:\IDE\webstorm\WebStorm 2017.3.5\bin\JetbrainsIdesCrack-4.2-release-sha1-3323d5d0b82e716609808090d3dc7cb3198b8c4b.jar```
如果下方出现了```Key is invalid```
关闭之后重新执行第五步操作。可能要多试几次。
