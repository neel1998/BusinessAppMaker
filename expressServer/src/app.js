const express = require('express');
const app = express();
const apiRoutes = require('./Routes/apiRoutes')

app.use('/api', apiRoutes);


app.listen(8000);
