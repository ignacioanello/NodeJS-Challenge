![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

# Title
NodeJs CloudX Challenge

## Project Dependency
Docker :whale:
  - [Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Linux](https://docs.docker.com/desktop/install/linux-install/)

## Description
### Desarrollar una API sin autenticación que permita hacer un CRUD de la entidad `Article`, con la siguiente spec:
  1. **GET /api/articles**
      - Retorna un array de `articles` con todos los Article almacenados en MongoDB.
  2. **GET /api/articles/{id}**
      - Retorna un object `article` con los datos de un Article buscado por _id almacenado en MongoDB.
  3. **POST /api/articles**
      - Almacena un Article en MongoDB con la siguiente estructura:
      ```typescript
      {
        title: string,    //required
        body: string,     //required
        author: string,   //required
        createdAt: timestamps,  //(autogenerado)
        updatedAt: timestamps   //(autogenerado)
      }
      ```
      - Retorna 201 Created.
  4. **PUT /api/articles/{id}**
      - Sobreescribe el un Article ya almacenado en MongoDB buscado por _id.
      - Retorna 200 OK.
  5. **DELETE /api/articles/{id}**
      - Elimina un Article almacenado en MongoDB por _id.
      - Elimina todos los Comment almacenado en MongoDB asociados al Article dado.
      - Retorna 200 OK.


### Desarrollar una API para los Comment asociados a los Article previamente mencionados con la siguiente spec:
  1. **GET /api/comments?article={articleId}**
      - Retorna un array de comments almacenados en MongoDB filtrados por el atribute `article`.
  2. **POST /api/comments** 
      - Create un Comment en MongoDB con la siguiente estructura:
      ```typescript
      {
        title: string,    //required
        body: string,     //required
        author: string,   //required
        createdAt: timestamps,  //(autogenerado)
        updatedAt: timestamps   //(autogenerado)
      }
      ```
      - Retorna 201 Created.
  3. **PUT /api/comments/{id}**
      - Sobreescribe el un Comment ya almacenado en MongoDB buscado por _id.
      - Retorna 200 OK.
  4. **DELETE /api/comments/{id}**
      - Elimina un Comment almacenado en MongoDB por _id.
      - Retorna 200 OK.

Entregar en un repositorio Git en GitHub, se permite forkear el repositorio de ejemplo trabajado en clase: https://github.com/navarroaxel/crud-express
Utilizar **TypeScript** para todo el proyecto.
Agregar los unit tests para los servicios y controllers.

## How to Install and Run the Project

#### Install
  1. Run `npm install`.
  2. For docker with MongoDB run: `docker run --name mongo --publish 27017:27017 --volume mongo:/data/db mongo`
  2. For .env variables, create a .env file into root path. 
      - The are the 2 variables used in the code:
        - PORT=3001
        - DB_CONNECTION=mongodb://localhost

#### Run
  - project
    - `npm run start`
  - tests
    - `npm run test`

## ENJOY!!! :octocat:
