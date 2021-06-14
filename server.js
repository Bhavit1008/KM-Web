const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))


app.set('views', './views');
app.set('view engine', 'ejs');


const url = "mongodb+srv://BK:@27Bk2481@cluster0.wnnuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const querySchema = {
    name: String,
    email: String,
    subject: String
}


const Query = mongoose.model("Query", querySchema);

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})


app.post("/sendemail",(req,res)=>{
    let newQuery = new Query({
        name: req.body.name,
        email: req.body.email,
        subject : req.body.subject
    });
    newQuery.save();
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server is listening at 3000")
})

