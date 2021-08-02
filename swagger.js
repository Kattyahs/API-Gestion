const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/proyecto',"./routes/sesion","./routes/reserva"]

swaggerAutogen(outputFile, endpointsFiles)