const express = require('express');
const path = require('path');

const app = express()

const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname,'../public')));

app.get('*', (req,res,next)=>{
	res.render('index', {title: 'ChaChaChat'})
})


app.listen(port, function(){
	console.log('listen on port: '+port)
})