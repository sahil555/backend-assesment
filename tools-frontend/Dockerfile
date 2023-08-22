FROM node:14 as frontend
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /app/build /usr/share/nginx/html