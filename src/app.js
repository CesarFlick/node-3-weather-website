const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory to serve
app.use(express.static(publicDirectoryPath))  // Página estática es decir nunca va a cambiar.


app.get('', (req, res) => {
    res.render('index', {
    title: 'Weather App',
    name: 'César Rodríguez'
        })
      }
    )
       
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Here you can find common questions.',
        name: 'César Rodríguez'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ 
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude} = {} ) => {
        if (error) {
                return res.send({error})
        }
                forecast(longitude,latitude, (error, foreCastData) => {
                        if(error){
                                return res.send({error})
                        } 
                        res.send({longitude, latitude, 'Tempreature': foreCastData})
                })
})
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        "products": []
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
    title: 'About me',
    name: 'César Rodríguez'})
})

app.get('/help/*', (req, res) => {
    res.render('notfound',{
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'César Rodríguez'
    })
})


app.get('*', (req, res) => {
    res.render('notfound',{
        title: '404',
        errorMessage: 'Page not found.',
        name: 'César Rodríguez'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})