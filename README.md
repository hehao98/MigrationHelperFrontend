# MigrationHelperFrontend

This repository contains the application frontend for MigrationHelper deployed [here](http://migration-helper.net).

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
