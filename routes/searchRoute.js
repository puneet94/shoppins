'use strict';
var express = require('express');
var UserSearch = require('..//models/user_search');
var searchRouter = express.Router();

searchRouter.use(function(req, res, next) {
    console.log("search route");
    console.log(req.method, req.url);
    next();
});


searchRouter.route('/searches/:location_name')
    .get(function(req, res) {
        var city = req.params.location_name.toLowerCase();
        UserSearch.find({ 'location': city, 'userSearchString': new RegExp('#store#|#product#', "i") })
            .select('userSearchString -_id')
            .limit(20).exec(function(err, searches) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }

                res.json(searches);
            });
    });

searchRouter.route('/searches/:location_name/:partial')
    .get(function(req, res) {
        var city = req.params.location_name.toLowerCase();
        var partial = req.params.partial.toLowerCase();
        UserSearch.find({ 'location': city, 'userSearchString': new RegExp(partial, "i") }, 'userSearchString -_id', function(err, searches) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            res.json(searches);
        });
    });
searchRouter.route('/collections')
    .get(function(req, res) {
        var queryObj = {};
        
        if (req.query.entity) {
            queryObj.userSearchString = new RegExp(req.query.entity,'i');
        }
        if (req.query.location) {
            queryObj.location = req.query.location;
        }
        var options = {};
        options.limit = req.query.limit ? parseInt(req.query.limit) : null;
        options.sort = req.query.sort || null;
        options.page = req.query.page || null;
        options.select = req.query.fields || null;
        UserSearch.paginate(queryObj, options).then(function(storeList) {
            res.json(storeList);

        });

    });


module.exports = searchRouter;
