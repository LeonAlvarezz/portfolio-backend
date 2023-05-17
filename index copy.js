const express = require('express')
const app = express()
const { firebaseApp, db } = require('./util.js');
// const mysql = require('mysql');
const PORT = process.env.PORT || 3000
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: false });
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
// })

app.get('/forms', (req, res) => {
  // pool.query('SELECT * FROM user_form', (error, result) => {
  //   if(error){
  //       console.log(error);
  //       res.status(500).send('Internal Server Error')
  //   } else
  //   {
  //       res.json(result)
  //   }
  // })
  db.collection('work_form')
    .get()
    .then((snapshot) => {
      const formData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        formData.push({
          f_name: data.f_name,
          l_name: data.l_name,
          email: data.email,
          job: data.job,
          description: data.description,
        });
      });
      res.json(formData);
    })
    .catch((error) => {
      console.error('Error retrieving form data: ', error);
      res.status(500).json({ error: 'Failed to retrieve form data' });
    });
})

app.post('/submit-form', (req, res) => {
    let {f_name, l_name, email, job, description} = req.body;
    // pool.query(
    //   'INSERT INTO user_form (f_name, l_name, email, job, description) VALUES (?, ?, ?, ?, ?)',
    //   [f_name, l_name, email, job, description],
    //   (error, results) => {
    //     if (error) {
    //       console.error(error);
    //       res.status(500).send('Error submitting form data');
    //     } else {
    //       const message = `New form submission:\nFirst Name: ${f_name}\nLast Name: ${l_name}\nEmail: ${email}\nJob: ${job}\nDescription: ${description}`;
    //       const chatId = process.env.TELEGRAM_GROUP_ID;
    //       bot.sendMessage(chatId, message)
    //         .then(() => {
    //           res.send('Form data submitted successfully');
    //         })
    //         .catch((error) => {
    //           console.error('Error sending message to Telegram:', error);
    //           res.status(500).send('Error submitting form data');
    // });
    //     }
    //   }
    // );
    db.collection('work_form')
    .add({
      f_name,
      l_name,
      email,
      job,
      description
    })
    .then(() => {
      // Document successfully added
      res.send('Form data submitted successfully');

    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      res.redirect('/error.html');
    });
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${{PORT}}`)
})

