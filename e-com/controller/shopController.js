const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

exports.getShopPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  };

  exports.getContactusPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
  };

  exports.getSuccessPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
  };