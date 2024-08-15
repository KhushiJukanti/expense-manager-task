// const express = require('express');
// const cors = require('cors');


// require('dotenv').config();


// const app = express();
// app.use(express.json());
// app.use(cors());

// // Use dynamoDb in your routes or controllers as needed

// app.listen(7000, () => {
//     console.log("Server is running at 7000");
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/', expenseRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});