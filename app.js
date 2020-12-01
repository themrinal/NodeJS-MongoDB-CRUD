require('./models/db');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
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
app.listen(PORT, () => {console.log(`Node Server is listening to port ${PORT}.`)});

const employeeControllers = require('./controllers/employeeControllers');
app.use('/', employeeControllers);