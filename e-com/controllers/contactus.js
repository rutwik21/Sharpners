exports.getSuccess = (req, res, next) => {
    res.render('success', {
      pageTitle: 'success',
      path: '/success',
      formsCSS: true,
      productCSS: true,
    });
  };

  exports.contactus = (req, res, next) => {
    res.render('contactus', {
      pageTitle: 'contact us',
      path: '/contactus',
      formsCSS: true,
      productCSS: true,
    });
  };