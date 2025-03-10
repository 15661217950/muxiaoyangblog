## 预览地址

## 项目描述

### 项目目录

```txt
┌───blog                        //前端项目目录
├──────blog/build               //此目录下有构建项目时使用的配置文件
├──────blog/config              //此目录下是项目的环境常亮配置，提供给build中的文件使用
├──────blog/index.html          //项目首页
├──────blog/logo.png            //项目logo
├──────blog/package-lock.json   //用于锁定依赖的版本
├──────blog/package.json        //node使用的文件
├──────blog/README.md           //项目介绍文件
├──────blog/src                 //项目的源码所在目录
├──────blog/static              //项目的静态资源文件，其中的 .gitkeep文件是git使用的一个占位文件
├──────blog/test                //测试模块代码
├───serve                       //后端服务目录
├──────serve/api.js             //接口逻辑代码
├──────serve/dateTool.js        //日期处理工具
├──────serve/dbConfig.js        //数据库配置
├──────serve/index.js           //服务器启动入口
├──────serve/log                //输出日志文件存放目录
├──────serve/log.js             //日志模块代码
├──────serve/package-lock.json  //用于锁定依赖的版本
├──────serve/package.json       //node使用的文件
├──────serve/router.js          //接口声明
├──────serve/sqlMap.js          //sql语句
├──────serve/util.js            //工具类
├───sql                         //数据库文件
└──────sql/blogs.sql            //数据库表结构文件
```

### 前端

代码位置：blog 文件夹中。

```txt
┌───build                               //此目录下有构建项目时使用的配置文件
├───config                              //此目录下是项目的环境常亮配置，提供给build中的文件使用
├───index.html                          //项目首页
├───logo.png                            //项目logo
├───package-lock.json                   //用于锁定依赖的版本
├───package.json                        //node使用的文件
├───README.md                           //项目介绍文件
├───src                                 //项目的源码所在目录
├──────src/App.vue                      //vue页面入口文件
├──────src/assets                       //资源文件
├──────src/components                   //组件目录
├─────────src/components/about          //关于页面组件
├─────────src/components/column         //栏目页面组件
├─────────src/components/common         //公共组件
├─────────src/components/echarts        //echarts组件封装
├─────────src/components/filing         //归档页面组件
├─────────src/components/home           //首页组件
├─────────src/components/md             //md相关组件
├─────────src/components/menu           //目录相关组件
├──────src/config                       //配置文件
├─────────src/config/api.js             //接口路径配置
├─────────src/config/config.js          //项目相关配置
├─────────src/config/http.js            //封装get，post方法
├──────src/main.js                      //程序入口文件
├──────src/router                       //路由配置
├─────────src/router/index.js           //路由配置文件
├──────src/store                        //vuex目录
├─────────src/store/actions.js
├─────────src/store/getters.js
├─────────src/store/index.js
├─────────src/store/mutations.js
├─────────src/store/states.js
├──────src/util                         //工具库
├─────────src/util/dateTool.js          //日期处理工具
├─────────src/util/md5.js               //md5加密工具
├─────────src/util/numsFormat.js        //数字格式化工具
├─────────src/util/strTool.js           //字符串处理工具
├─────────src/util/util.js              //其它工具类
├──────src/view                         //页面文件目录
├─────────src/view/about.vue            //关于页面
├─────────src/view/articleDetail.vue    //博客详情页面
├─────────src/view/articleEdit.vue      //博客编辑页面
├─────────src/view/articleWrite.vue     //博客编写页面
├─────────src/view/column.vue           //博客栏目页面
├─────────src/view/filing.vue           //博客归档页面
├─────────src/view/home.vue             //博客首页
├─────────src/view/statistics.vue       //博客统计页面
├───static                              //静态资源文件目录
└───test                                //测试文件目录
```

前端页面使用 vue2.0 构建，UI 组件引入elementUI,简单实现了一个简约的个人博客页面，部分页面截图如下：


### 后端

代码位置：serve 文件夹中。

```txt
┌───api.js              //接口逻辑代码
├───dateTool.js         //日期处理工具
├───dbConfig.js         //数据库配置
├───index.js            //服务器启动入口
├───log                 //输出日志文件存放目录
├──────log/file         //输出日志文件存放目录
├─────────log/file/err  //sql执行错误记录
├─────────log/file/sql  //sql执行记录
├───log.js              //日志模块代码
├───package-lock.json   //用于锁定依赖的版本
├───package.json        //node使用的文件
├───router.js           //接口声明
├───sqlMap.js           //sql语句
└───util.js             //工具类
```

后端使用 node.js 搭建，并编写了日志管理模块，实时记录 sql 执行记录和 sql 报错记录，便于我们排障定位问题。

### 数据库

sql 文件：sql 文件夹中。

数据库使用 mysql，相关表结构可以直接导入 sql 文件。

## 项目部署

### 前端

#### 1、依赖下载

代码下载完之后需要安装相关依赖，进入 blog 文件夹中，输入命令`npm i`，等待安装即可。

#### 2、配置修改

blog/src/config 这个目录下存放了相关的配置文件，可以根据实际情况来修改（本地运行一般情况下不需要修改）。

#### 3、项目启动

```shell
npm run start
```

### 后端

#### 1、依赖下载

代码下载完之后需要安装相关依赖，进入 serve 文件夹中，输入命令`npm i`，等待安装即可。

#### 2、配置修改

blog/dbConfig 这个是数据库配置文件，可以根据实际情况来修改配置信息，数据库账号密码等等……。

#### 3、项目启动

```shell
node index.js
```

### 数据库

将 sql 目录下的 sql 文件导入 mysql 数据库即可。


