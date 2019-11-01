const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialPath)
 
// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amith'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Amith'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helptext: 'this is some usefull text',
        title: 'Help',
        name: 'Amith'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

         forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
            })
        })
    }) 
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name: 'Amith',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'amith',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})