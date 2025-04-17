const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/authRouter')
const cors = require('cors');

app.use(cors());
require('./models/dbConnection')


app.get('/' , (req , res)=>{
    res.send('Hello World! from Auth Server')
})

app.use('/auth' , authRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});