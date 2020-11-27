require('./models/db');

const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, './views/'));
app.engine('hbs', exphbs({
  extname : 'hbs',
  defaultLayout : 'mainLayout',
  layoutsDir : __dirname + '/views/layouts',
  runtimeOptions : {
    allowProtoPropertiesByDefault : true,
    allowProtoMethodsByDefault : true
  }
}));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running at port ${PORT}`));

const employeeController = require('./controllers/employeeController');
app.use('/', employeeController);