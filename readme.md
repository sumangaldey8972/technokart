NodeJS Task (TECHNOKART CONSULTANCY SERVICES)

- to run the application:
1. you can run it from locally or also you can run with MongoDb atlas

- run command:
npm i
npm start

GET method: response with all the resources available in the database under the invoice schema

POST method : can create a new invoice. accept three parameters i.e invoice number, invoice data, invoice amount
invoice number type is Number,
invoice date type is string,
invoice amount type is Number,
in post function a date validator middlewaire comes into place . done with MongoDb aggregation. if invoice number was greater than last greatest invoice number then invoice date will be  invoice number should be unique. if it's not then will
throw an error. after all condition was met then a new invoice will be created.

PATCH method : can update an existing resources on the basis of invoice number. middlewaire also put here.

DELETE method : can delete an existing resurces on the basis of invoice number. after successfull deletion or removed from the database a success message was shown. if the invoice was already deleted then a error message was shown.