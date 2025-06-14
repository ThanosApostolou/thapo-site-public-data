# Thapo Site

![](./thapo_site_logo_100.png)


Thapo Site is the personal WebSite of Thanos Apostolou.

## Purpose
This website serves 4 purposes.

The 1st one is to share my public contact information and social media links.

The 2nd one is to showcase a personal Portfolio of my most important personal projects.

The 3rd one is to share some of the knowledge I've gained from my experience as a Software Engineer through a simple Blog, by writing some articles about various Software Engineering topics.


## Modules, Components and Technologies

This project uses the following components:
- thapo-site-backend
- thapo-site-frontend

### Backend
The thapo-site-backend consists of a simple REST API which handless simple stateless requests made by the frontend. It is implemented in Java Spring Boot. Apart from the json responses much information exists in Markdown files which are rendered in the Frontend.

Technologies:

- Java
- Markdown
- Spring Boot

### Frontend
The thapo-site-frontend consists of a simple Single Page Application which can served by most popular http servers as static files. It is implemented in Vue.js and TypeScript. Frontend requests json data from the backend using AJAX but also various static files like JSON files and Markdown.

Technologies:

- Typescript
- HTML, CSS, Markdown
- Vue.js, Vuetify


### Deployment
Deployment of all components can done by either using Docker/Podman or Kubernetes.
