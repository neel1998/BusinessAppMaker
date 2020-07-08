const express = require('express');
const app = express();
const appRoutes = require('./Routes/appRoutes')
const mainRoutes = require('./Routes/mainRoutes')

app.use(express.json());

app.use('/app', appRoutes);
app.use('/main', mainRoutes);
app.listen(8000);
