// imports
const connectDB=require('./dbConnect')
const express=require('express')
const {engine}=require('express-handlebars')
const session=require('express-session');
const { connect } = require('http2');
const userRouter = require('./routes/userRouter')

const app=express()


const PORT=8000;

// database connection
connectDB()

app.engine('hbs', engine({extname:'.hbs'}))
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
    session({
        secret:"123",
        saveUninitialized:true,
        resave:false,
    })
)
app.use(function(req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

app.use((req,res,next)=>{
    res.locals.messsage;
    delete req.session.messsage;
    next()
})

app.use('/',userRouter)

app.listen(PORT,()=>console.log(`server started at http://localhost:${PORT}`))