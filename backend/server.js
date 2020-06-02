const http = require('http')
const app = require('./app')
const PORT = 5000 || process.env.PORT
const server = http.createServer(app)

app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})