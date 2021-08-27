const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path')


const port = process.env.PORT || 4545
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/email', (req, res)=>{

    res.send('<center><h2>404 <p>Page not found</h2><br>You are lost man...<br><hr></center>');
});

app.post('/email', (req, res)=>{

    var email = req.body.email;
    var username = req.body.name;
    var data = req.body.bodydat;

    console.log({email, username, data});

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'contact.sayhy@gmail.com',
          pass: 'cheesepuff?1'
        }
      });
      
      var mailOptions = {
        from: 'contact.sayhy@gmail.com',
        to: email,
        subject: 'Customer support. User: ' + username + '. Email: ' + email,
        text: data 
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
      res.redirect('/');
})

app.get('/contact', (req, res)=>{
  res.render('contact');
});

app.post('/contact', (req, res)=>{

  var email = req.body.email;
  var username = req.body.name;
  var data = req.body.bodydat;

  console.log({email, username, data});
  try{
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'contact.sayhy@gmail.com',
          pass: 'cheesepuff?1'
        }
      });
      
      var mailOptions = {
        from: 'contact.sayhy@gmail.com',
        to: email,
        subject: 'Customer support. User: ' + username + '. Email: ' + email,
        text: data 
      };
      
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
    } catch(e){
      console.log('No fuckin data')
    }
    res.redirect('/contact');
})


app.get('*', (req, res)=>{
    res.send('<center><h2>404 <p>Page not found</h2><br>You are lost man...<br><hr></center>');
})

app.listen(port, ()=>{
    console.log('[*] Server started')
});