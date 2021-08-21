# pipbuck

Pipboy mobile webapp, with a hint of Fallout Equestria.

## Try it out

Demo at https://pip.bonbotics.com.


## Project setup
```
nvm use 12
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve --port 8082
```

### Compiles and minifies for production
#### Docker
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
echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.2; echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.2; echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.4; echo -e "\a";sleep 0.2; echo -e "\a";
# done
```
#### zeit.co
```
yarn run build
now dist
```

#### combined
```
# d-start-las-pegasus && \
git push && \
yarn run build && \
echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.2 && echo -e "\a" && \
rm dist/stable_colt*.svg && \
docker build . -t pipbuck:latest && \
docker stop pipbuck && \
docker rm pipbuck && \
docker run  \
    --detach \
    --name pipbuck \
    --restart always \
    --network dockertgbot_web \
    pipbuck:latest && \
echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && echo -e "\a" && sleep 0.1 && echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.4 && echo -e "\a" && sleep 0.2 && echo -e "\a" && \
now dist && \
echo -e "\a" && sleep 0.2 && echo -e "\a" && sleep 0.2 && echo -e "\a" && \
WEB_URL="https://pip.bonbotics.com" && \
WEB_PERMA=$(pbpaste) && \
GIT_HASH=$(git rev-parse HEAD) && \
NOW_ALIAS="pipbuck-commit-${GIT_HASH}.now.sh" && \
WEB_ALIAS="https://${NOW_ALIAS}" && \
WEB_GIT="https://github.com/luckydonald/pipbuck/tree/${GIT_HASH}" && \
now alias ${NOW_ALIAS} && \
git tag now_deploy__${NOW_ALIAS} && \
tg-send -1001015621407 "I%20just%20pushed%20an%20#update%20to%20the%20#pipbuck%20project:%0D%0ALive%20Link:%20${WEB_URL}%0D%0APermalink:%20${WEB_ALIAS}%0D%0ASource:%20${WEB_GIT}" && \
echo "Done."
# done
```


### Compile and serve locally
```
cd ./dist/
cd ../ && yarn run build && cd dist/ && ( echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.2; echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.2; echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a";echo -e "\a";sleep 0.1; echo -e "\a"; sleep 0.2; echo -e "\a"; sleep 0.4; echo -e "\a";sleep 0.2; echo -e "\a" ) && python -m http.server 8080
open http://localhost:8080
# now running

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
###### Stats logo (v1)
Created by rhodarein. Artist deleted all his pony related works from his deviantart.
Modified by luckydonald.
Reference for myself: On my filesystem that's `fo_e_littlepip__cleaned_up__by_rhodarein-d4qerji-Wiederhergestellt_cloudbackup_5.png`.

###### Stats logo (v2)

ATG Day1 - Reflection by king-koder
https://www.deviantart.com/king-koder/art/ATG-Day1-Reflection-497883053

SVG version by EM120X:
https://www.deviantart.com/em120x/art/Littlepip-king-koder-style-vector-499037570
https://sta.sh/0zk8ver1zys


###### Fallout 4 Demodata
Seems to be the demo mode data extracted from the Fallout 4 companion app.
https://raw.githubusercontent.com/NimVek/pipboy/1087a1c820fae6265fbce2a614e62e85cd146442/DemoMode.json
