#!/usr/bin/env nodejs

const
    // DEPENDENCIES
    express  = require('express'),
    { join } = require('path'),
    // CONFIGURATION
    PORT = process.env.PORT || 3000,
    PROJECTS_FOLDER = join(__dirname, 'public', 'fcc'),
    // APP
    app = express();

// MIDDLEWARES
app.use( express.static(join(__dirname, 'public')));
app.use('/', require('./routes')(express.Router()));



app.listen(PORT, err => !err && console.log('LISTENING ON PORT %s', PORT));