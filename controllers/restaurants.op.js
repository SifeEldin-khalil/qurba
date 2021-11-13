const Responser  = require('../helpers/responser')
const mongoose   = require("mongoose");
const Restrant   = require('../models/restaurant')
const validate   = require('../helpers/validate');

// Products Functions====================
const getRestrants = async (req, res) => {
    let restaurants = []
    return(new Responser(res).success('Restaurants list').setData({restaurants}).send())
}

// Expot Functions=======================
module.exports = {
    getRestrants
}