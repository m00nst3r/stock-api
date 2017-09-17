# stock-api

API for stock-ui application

## Requirements

* `Node.js` - 8.x.x
* `Npm` - 5.3.x
* `MongoDB` - 3.x.x

## Endpoints

* *GET* `/api/ukraine` get latest currency for `UAH`
* *GET* `/api/ecb` get latest currency for `EURO`
* *GET* `/api/currency/ukraine/p24` load currency for last day from `privat24`
* *GET* `/api/currency/europe/ecb` load currency for last day from `European Central Bank`

### Initial load

Also user can load all currency

* *GET* `/api/initial/bitcoins/` load Bitcoin currency from `coindesk` api
* *GET* `/api/initial/uah/` load UAH currency from `privat24` api
* *GET* `/api/initial/ecb/` load EUR currency from `European Central Bank` api

## Server

By default server runs on `3001` port

### Development

To run application on local machine in dev mode you need to run next commands in terminal

`npm install`

`npm start`

*Happy hacking!* 

## Docker

Also you can run application in docker for that you need to build docker image with application using next command

```bash
docker build -t stock-api:1.0.1 .
``` 

and then you can run this image using next command:

```bash
docker run --name stock-api -e DB_URL="mongodb://mongou_rl" -p 8080:3001 stock-api:1.0.1
```

your application should run on [http://localhost:8080](http://localhost:8080)

### TODO

* Change all functions from using callbacks to promises ([Bluebird](http://bluebirdjs.com/))