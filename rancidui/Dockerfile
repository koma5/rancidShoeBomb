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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
