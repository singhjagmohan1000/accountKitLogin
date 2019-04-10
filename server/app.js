/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const cors = require("cors");
let port = 5000 || process.env.PORT

app.use(cors());
/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */

app.use(bodyParser.json())


app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});