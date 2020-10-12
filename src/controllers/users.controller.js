const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, lastname, email, password, confirm_password } = req.body;
  if(name.length <= 0) {
    errors.push({text: 'Por favor escribe tu nombre'});
  }
  if(lastname.length <= 0) {
    errors.push({text: 'Por favor escribe tu apellido'});
  }
  if(email.length <= 0) {
    errors.push({text: 'Por favor escribe tu nombre de usuario email'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'});
  }
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      lastname,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Usuario registrado anteriormente");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, lastname, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Usuario registrado exitosamente");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Has salido de la app");
  res.redirect("/");
};

module.exports = usersCtrl;