const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forcast = require('./utils/weather-forcast');


console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express()
const port = process.env.PORT || 3001
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//will serve static content such as index.html in public folder
app.use(express.static(publicDirectory))



app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Andrew'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help!'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address is not found in url'
        });
    }

    geoCode.getGeoCode(req.query.address, (geoerror,location={})=>{
        if(geoerror){
            return res.send({
                error: geoerror
            });
        }else{ 
        forcast.weatherForcast(location, (forcasterror, result)=>{
            if(forcasterror){
                return res.send({
                    error: forcasterror
                });  
            }else{
                console.log(result.currently);
                return res.send({
                    forcast: result.currently.summary,
                    location: req.query.address,
                    temp: result.currently.temperature
                });
            }
            
        });
        }
    });
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
      return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    console.log(req.query.locale);
    res.send({
    products: []
    });
    
});

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'HELP ARTICALE'
    })
});

app.get('*', (req, res)=>{
    res.render('404',{
        title:'THE PAGE'
    })
});

app.listen(port, ()=>{
    console.log("server is up and running..");
});