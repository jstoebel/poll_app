let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD,
  },
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = function(req, res) {
  res.render('contact', {
    title: 'Contact',
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  let from = req.body.email;
  let name = req.body.name;
  let body = req.body.message;
  let to = 'your@email.com';
  let subject = 'Contact Form | Hackathon Starter';

  let mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', {msg: err.message});
      return res.redirect('/contact');
    }
    req.flash('success', {msg: 'Email has been sent successfully!'});
    res.redirect('/contact');
  });
};
