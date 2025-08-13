const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
let users = [
    {id:1,name:"Balaji",age:20},
    {id:2,name:"Geethika",age:19},
    {id:3,name: "Cheeks",age:20}
];
app.get("/",(req,res)=>{
    res.send("Server is Runnning");
})

app.get("/users",(req,res)=>{
    res.json(users);
});
app.get("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u=>u.id === id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({message:"user not Found"});
    }
});
app.post("/users/",(req,res)=>{
    const {name,age} = req.body;
    const newUser = {id:users.length+1,name,age};
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name || user.name;
        user.age = age || user.age;
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: "User deleted" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
app.listen(port,()=>{
    console.log("Server is Started on http://localhost:",port);
})