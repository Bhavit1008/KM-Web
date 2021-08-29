const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

var port = process.env.PORT || 80

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
    phone: String,
    subject: String,
    date: String,
    time: String
}


const Query = mongoose.model("Query", querySchema);

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})


app.post("/sendemail",(req,res)=>{
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let newQuery = new Query({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject : req.body.subject,
        date : date +"-"+ month +"-"+ year,
        time : hours +":"+minutes 
    });
    newQuery.save();
    res.redirect("/");
})

app.listen(port,function(){
    console.log("server is listening at 80")
})

