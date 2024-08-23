// const express = require("express");
// const router = express.Router();
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require('dotenv').config(); // Ensure you have a .env file with your email credentials

// // Server setup
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/", router);
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// // Nodemailer setup
// const contactEmail = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   },
// });

// contactEmail.verify((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Ready to Send");
//   }
// });

// router.post("/contact", (req, res) => {
//   const { firstName, lastName, email, message, phone } = req.body;
//   const name = `${firstName} ${lastName}`;
//   const mail = {
//     from: name,
//     to: process.env.EMAIL_USER,
//     subject: "Contact Form Submission - Portfolio",
//     html: `<p>Name: ${name}</p>
//            <p>Email: ${email}</p>
//            <p>Phone: ${phone}</p>
//            <p>Message: ${message}</p>`,
//   };
  
//   contactEmail.sendMail(mail, (error) => {
//     if (error) {
//       res.status(500).json({ code: 500, status: "Error sending message", error: error.toString() });
//     } else {
//       res.status(200).json({ code: 200, status: "Message Sent" });
//     }
//   });
// });

const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require('dotenv').config(); // Ensure you have a .env file with your email credentials
const rateLimit = require("express-rate-limit"); // For rate limiting
const helmet = require("helmet"); // For setting security headers
const { body, validationResult } = require('express-validator'); // For validation

// Check if environment variables are defined
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Error: Email credentials are not defined in environment variables.");
    process.exit(1); // Stop the server if email credentials are missing
}

// Server setup
const app = express();
app.use(helmet()); // Apply security headers
app.use(cors());
app.use(express.json());

// Rate limiting middleware to prevent spamming
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

// Nodemailer setup
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready to Send");
    }
});

// Route for handling contact form submissions
router.post("/contact", [
    // Validation checks
    body('email').isEmail().withMessage('Enter a valid email'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('message').notEmpty().withMessage('Message is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, message, phone } = req.body;
    const name = `${firstName} ${lastName}`;
    const mail = {
        from: name,
        to: process.env.EMAIL_USER,
        subject: "Contact Form Submission - Portfolio",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.status(500).json({ code: 500, status: "Error sending message", error: error.toString() });
        } else {
            res.status(200).json({ code: 200, status: "Message Sent" });
        }
    });
});

