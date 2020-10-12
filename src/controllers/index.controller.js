const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderMain = (req, res) => {
  res.render('main');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderContact = (req, res) => {
  res.render('contact');
};

indexCtrl.renderService = (req, res) => {
  res.render('service');
};

module.exports = indexCtrl;