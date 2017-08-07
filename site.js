#!/usr/bin/env nodejs

const
    // DEPENDENCIES
    express  = require('express'),
    { join } = require('path'),
    // CONFIGURATION
    PORT = process.env.PORT || 3000,
    // APP
    app = express();

// MIDDLEWARES
app.use( express.static(join(__dirname, 'public')));
app.use('/fcc', require('./routes')(express.Router()));

app.get('/', (req, res) => res.send('index.html'));



app.listen(PORT, err => !err && console.log('LISTENING ON PORT %s', PORT));