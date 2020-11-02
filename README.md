# MigrationHelperFrontend

This repository contains the application frontend for MigrationHelper deployed [here](http://migration-helper.net).

## TODOs

1. 对Confidence进行归一化操作，并添加用户容易理解的指标描述
2. 对于用户的查询步骤，添加模糊查询的接口和提示功能
3. 增加更多的介绍性信息、帮助信息和相关工具信息
4. 对于结果展示界面，添加总结性信息和可视化图表
5. 增强面对用户错误输入的鲁棒性和易用性

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Deployment on Apache2

```
git pull origin master
npm install
npm run build
sudo cp -a dist/. /var/www/html/
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
