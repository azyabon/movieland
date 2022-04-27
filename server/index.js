const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const cors = require('cors')
const PORT = process.env.PORT || 5000

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://azyabon:andrey110102@cluster0.pfsi2.mongodb.net/reactmovie?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    } catch (e) {
        console.log(e) 
    }
}


start()