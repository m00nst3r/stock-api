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

### inital load

Also user can load all currency

* *GET* `/api/initial/bitcoins/` load Bitcoin currency from `coindesk` api
* *GET* `/api/initial/uah/` load UAH currency from `privat24` api

## Server

By defauld server runs on `3001` port