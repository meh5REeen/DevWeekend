const express = require('express')
const mongoose  = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/users')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/crud")

app.post("/createUser", (req,res) =>
{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
}
)
app.get('/',(req,res) =>
{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
})
app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    console.log(req.params.id)
    UserModel.findById(id)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.put('/updateUser/:id',(req,res)=>{
    
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id,{name:req.body.name,age:req.body.age,email:req.body.email})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.delete('/deleteUser/:id',(req,res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete(id)
    .then(res => res.json(res))
    .catch(err => res.json(err))
})
app.listen(3001,()=>{
    console.log("Server is running")
})