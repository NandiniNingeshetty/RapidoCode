/*
 * Version		: 0.0.1
 * Description	: Root file for all the apis
 *
 */

"use strict";

var authenticator = import_services('authenticator.js'),
    express = require('express'),
    router = express.Router();

router.use('/project', require('./project'));

module.exports = router;