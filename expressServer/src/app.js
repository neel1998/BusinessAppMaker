const express = require('express');
const app = express();
const appRoutes = require('./Routes/appRoutes')
const mainRoutes = require('./Routes/mainRoutes')
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use('/app', appRoutes);
app.use('/main', mainRoutes);
app.listen(8000);
