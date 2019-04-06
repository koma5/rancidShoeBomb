# rancidui build stage

FROM node as rancidui-build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#rancid prod stage
FROM nginx as rancidui-prod-stage
COPY --from=rancidui-build-stage /app/dist /usr/share/nginx/html
COPY ./rancidui_nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
