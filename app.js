const express = require('express');
const config = require('config');
const mongoose = require('mongoose'); 
const path = require('path');
const PORT = config.get('port') || 5000;
const MONGOURI = config.get('mongoURI');

const app = express();

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth_routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if(process.env === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//handler connect to db 
const start = async () => { 
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (error) {
        console.log('Error ' + error);
        process.exit(1);
    }
}
start();