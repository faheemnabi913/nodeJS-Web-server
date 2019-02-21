const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+`/views/partials`);

hbs.registerHelper("toUpper",(text)=>{
    return text.toUpperCase();
})

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');
// })

app.use(express.static(__dirname + `/public`));

app.use((req,res,next)=>{
    reqAt = new Date();
    forID = req.url;
    fs.appendFileSync("server.log",`For \'${forID}\' on/at ${reqAt} \n`, (err)=>{
        if(err)
        console.log("Unable to continue");
        
    })
    next();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
       pageTitle : 'Homepage',
       homeMessage : 'Welcome to the Homepage',
       currentYear : new Date().getFullYear(),
       
    })

    
})

app.get("/dev",(req,res)=>{
    res.render('dev.hbs',{
        pageTitle : 'Developer',
        devName : 'Faheem Nabi',
        currentYear : new Date().getFullYear(),
    })
})

app.listen(port,()=>{
    console.log(`The server is up at port ${port}`);
    
});