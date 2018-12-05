# pipbuck

Pipboy mobile webapp, with a hint of Fallout Equestria.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve --port 8082
```

### Compiles and minifies for production
```
yarn run build
rm dist/stable_colt*.svg
docker build . -t pipbuck:latest
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
