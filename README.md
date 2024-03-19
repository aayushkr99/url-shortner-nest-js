<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).




URL Shortener Service
This is a sophisticated URL shortening service developed using Nest.js and TypeScript. It not only shortens URLs but also provides detailed analytics to track various metrics related to URL clicks.

Features
Backend Development:

Built with Nest.js and TypeScript for a robust and efficient backend.
Utilizes URL shortening algorithms for optimized storage and retrieval efficiency.
Scalable architecture to handle high volumes of requests with minimal latency.


NOTE: Run the Docker compose file by command "docker-compose up -d" as it will start the Database container. 


User Authentication and Authorization:

Implements secure user authentication and authorization.
Each user has access only to their URLs and associated analytics.


Data Management:

Database: PostgreSQL is used for data storage to ensure data integrity and efficient querying.
Redis caching is implemented to enhance the performance of URL retrieval.


Advanced Analytics:

Detailed analytics system tracks:
Number of clicks
Referral sources
Browser and device types used to access the URLs
Provides API endpoints to access these analytics.


API Documentation: 
signup : URL : localhost:4000/auth/signup ( POST ) 
         Body : {
    "username" : "aayush",
    "email" : "aayushiii243@gmail.com",
    "password" : "123"
}

loginin : URL : localhost:4000/auth/login ( POST ) 
      Body :  {
    "email" : "aayushiii243@gmail.com",
    "password" : "123"
}

shortenUrl : URL : localhost:4000/url/shorten  (POST)
    Body : {
    "originalUrl": "https://www.pexels.com/photo/a-woman-wearing-a-headscarf-and-long-sleeves-near-green-plants-11039194/",
    "ip": "",
    "os" :"",
    "browser" : "",
    "country" : "",
    "city" : "",
    "referrer": ""
}

getUrlCode : URL : localhost:4000/url/:shortId  ( GET )
getClicks Analytics : URL : localhost:4000/url/clicks ( GET )


Scalability Solutions
To scale the application, the following strategies are implemented:

Load Balancing: Use a load balancer (e.g., Nginx) to distribute incoming traffic across multiple instances of the application.
Horizontal Scaling: Deploy multiple instances of the application in a container ( Docker ) and distribute the workload evenly.
Caching: Implement caching mechanisms (e.g., Redis) to reduce the load on the database and improve response times.

