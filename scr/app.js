const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define path for express configure
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlerbar and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Wheather App',
        age: 20,
        name: 'BBZ', 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Wheather App Details',
        age: 2020,
        name: 'BBZ',
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Helping you 24/7',
        name: 'BBZ',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You should provide an address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send(error)
        }

        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send(error)
            }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address 
            })
        })
    })
})

app.get('/product',(req, res)=>{
if(!req.query.search){
    return res.send({
        error: 'You must provide search term'
    })
}

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req, res)=>{
    res.send('My 404 page')
})

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})