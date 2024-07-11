<table align="center"><tr><td align="center" width="9999">
     <h1>
         Travel guide
     </h1>
     <p>
         Backend server for travel guide
     </p>
</table>

## Features

- Retrieve route data from an external API.
- Find the nearest routes based on provided coordinates.
- Find points within a specified viewport.
- Input validation for query parameters.
- Error handling and JSON response for exceptions.

## Build With 
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/products/docker-desktop/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Nix][Nix]][Nix-url]
[![Direnv][Direnv]][Direnv-url]

[Nix]:https://img.shields.io/badge/Nix-5277c3.svg?style=for-the-badge&logo=nixos&logoColor=white
[Nix-url]: https://nixos.org/
[Direnv]:https://img.shields.io/badge/direnv-40AEF0.svg?style=for-the-badge&logo=dotenv&logoColor=white
[Direnv-url]: https://direnv.net/

## Installation

 **Clone the repository:**

  ```shell
   git clone https://github.com/lsvalina/travel_guide.git
   cd travel_guide
  ```

### Install with nix

* if you dont have nix configured follow nix installation guide [here](docs%2Finstall_nix.md)
* run `direnv allow` to allow nix to work its magic
* run `__env_bootstrap` to generate .env and .env.development with default values
* run `__install` to set up project and install dependencies
* run `__run` to run a project

### Install with docker

* install docker and docker compose
* run `cp .env.default .env.development; cp .env.default .env` to set dotenv with default values
* run `docker compose up`

### Install with locally installed node
* install node v20
* run `npm install` to install dependencies
* run `npm run start:dev`