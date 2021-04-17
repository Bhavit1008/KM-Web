const express=require("express");
const nodemailer=require('nodemailer');
const path=require("path");
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/sendemail', (req, res, next) => {
    
    const transport=nodemailer.createTransport(
        {
            service:'gmail',
            auth:
            {   //user&& sender
                user:'bhavitkanthalia16@gmail.com',
                pass:'@27Bk2481'
            }
    });
    
    var   maildata={   
                
                //from:`${req.body.email}`,
                //rec email here
                to:'bhavitkanthalia16@gmail.com',
                subject:`${req.body.email}`,
                //text:req.body.messag
                text: "Name: "+`${req.body.name}`+'\n\n'+`${req.body.subject}`
                
                      
    };


    transport.sendMail(maildata,function(err,info)
    {   
        if(err)
        {
            console.log(err);
        }
        else
        {   
            
            res.sendFile(path.join(__dirname, 'views', 'index.html'));   
                 
        }
    });
    
});





app.listen(8002);