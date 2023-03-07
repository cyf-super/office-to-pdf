## office转化为pdf

libreoffice是一个开源的办公套件，它能够将office文档转化为pdf文件，关键是它提供了命令行可供转化文件，并且在window和Linux系统都可以使用

在使用命令行之前，需要先确保机器安装了libreoffice
- 当在终端输入soffice能打开libreoffice界面，说明安装成功了

关键代码
```
soffice --headless --convert-to pdf --outDir 输出目录 转化的office文件
```

## 使用

```
// 安装依赖
yarn install

// run koa服务
node app.js

// 或者
nodemon app.js
```

打开public目录下的index.html

![upload](/public/upload.png '上传界面')