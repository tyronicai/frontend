# Stage 1: Build Angular application
FROM node:14.16.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:1.21.0-alpine
COPY --from=build /app/dist/<your-angular-project-name> /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
