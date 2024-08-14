const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())

app.listen(7000, () => {
    console.log("server is running at 7000")
})
