const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('connected to DB')
})

app.get('/userlist', async(req,res)=>{
    await User.find({},(err, result)=>{
        console.log('res', result);
        res.send(result);
    }).clone();
})

app.post('/user', async(req,res)=>{
    try{
        // console.log('req.body', req.body);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: req.body.userId
        })
        await User.create(newUser)
        res.send('user added')
    } catch(err) {
        console.log('err', err)
    }
})

app.delete('/delete/:userId', async(req, res)=>{
    await User.deleteOne({
        "userId": req.params.userId
    })
    res.send('deleted user')
})


app.listen(port, ()=>{
    console.log(`App listening to port ${port}`);
})

