#!/bin/bash

npm install --registry=https://registry.npm.taobao.org
NODE_ENV=test npm run build
scp -r dist/ remi@101.200.132.15:/home/remi/webapps/<%=name%>
rm -fr dist/
