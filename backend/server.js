const express=require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT=process.env.PORT;
const app = express();

// Enable CORS for all routes (for CORS errors)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the actual origin of your frontend
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Respond to preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).send();
    } else {
      next();
    }
});

app.use(express.json());

// api to give bank statements
app.post('/api', async (req, res) => {
    try{
        const { email, startDate, endDate } = req.body;
        const conn = mongoose.connection;
        const Statements = conn.collection('Test');

        // conversion to yyyy/mm/dd format
        const start = startDate.replace(/-/g, '/');
        const end = endDate.replace(/-/g, '/');
        console.log(email);
        // retreiving data from database
        const testData = await Statements.find({
            email: email,
            date: {
              $gte: start,
              $lte: end,
            },
        }).toArray();
        return res.status(200).send(testData);
    } catch (err) {
        console.log(err);
    }
});

// EMAIL

// nodemailer settings
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD, 
    },
});

// Email routes
app.post('/email', async(req, res) => {
    try{
        const { email, subject, message, attachments } = req.body;

        var mailOptions = {
          from: process.env.SMTP_MAIL,
          to: email,
          subject: subject,
          text: message,
          attachments: {
            filename: 'statements.pdf',
            content: attachments,
            encoding: 'base64',
          },
        };
      
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent successfully!");
          }
        });
    } catch (err) {
        console.log(err);
    }
});

// connecting to DB
const connectDB = async() => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("connection to database established"))
    .catch((err)=> console.log(err));
};

// listening to PORT
app.listen(PORT, async() => {
    try{
        await connectDB();
        console.log(`running on port ${PORT}`);
    }
    catch(err){
        console.log(err);
    };
});