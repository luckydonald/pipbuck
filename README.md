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
# d-start-las-pegasus
yarn run build
rm dist/stable_colt*.svg
docker build . -t pipbuck:latest
docker stop pipbuck
docker rm pipbuck
docker run  \
    --detach \
    --name pipbuck \
    --restart always \
    --network dockertgbot_web \
    pipbuck:latest
# done
```

```
docker build . -t pipbuck:latest; docker stop pipbuck; docker rm pipbuck; docker run --detach --name pipbuck --restart always --network dockertgbot_web pipbuck:latest && docker logs -ft --tail 100 pipbuck
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

### Credits
###### Stats logo
Created by rhodarein.
Modified by luckydonald.
`fo_e_littlepip__cleaned_up__by_rhodarein-d4qerji-Wiederhergestellt_cloudbackup_5.png`
