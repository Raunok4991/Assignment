const express = require('express')
const app = express()


const myLogger = require('./config/dbConnect');
const allRouteRouter = require('./routes/allRouter');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

myLogger();

allRouteRouter.routes(app);

app.get('/',(req,res)=>{
    res.send("Hello from server in postman")
})



const port = process?.env?.PORT ?? 3000;
app.listen(port, function (err, address) {
    if (err) throw err;
    console.log(`...Server listening on port ${port}...`)
})

module.export = app;
