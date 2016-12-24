var express = require('express');
var models = require('..//models/storeModel');
var Store = models.Store;
var User = models.User;
var UserSearch = require('..//models/user_search');
var storeRouter = express.Router();
var commons = require('./commonRouteFunctions');

storeRouter.use(function(req, res, next) {
    console.log("store");
    console.log(req.method, req.url);
    next();
});

storeRouter.route('/store')
    .post(function(req, res) {
        var store = new Store();
        var recData = req.body;
        store.name = recData.name;
        var city_name = recData.address.city;
        store.address = recData.address;
        store.category = recData.category; //make sure its an array of categories
        store.save(function(err) {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ success: false, 'message': 'User already exists' });
                } else {
                    return res.send(err)
                }
            }
            commons.saveSearchList(req.body.name.toLowerCase(), "store", city_name, req, res);
            for (var i = store.category.length - 1; i >= 0; i--) {
                commons.saveSearchList(store.category[i].toLowerCase(), "store-category", city_name, req, res);
            };

            res.json({ message: "Store created" });
        });
    })
storeRouter.route('/cities')
    .get(function(req, res) {
        var query = UserSearch.find({}).select({ "location": 1, "_id": 0 });
        query.exec(function(err, someValue) {
            if (err) {
                return next(err);
            } else {
                var citiesArray = [];
                for (var i = 0; i < someValue.length; i++) {
                    if (citiesArray.indexOf(someValue[i].location) == -1) {
                        citiesArray.push(someValue[i].location);
                    }
                }
                res.json(citiesArray);
            }

        });
        // UserSearch.find(function(err,cities){
        //
        // 	if(err){
        // 		console.log(err);
        // 		res.send(err);
        // 	}
        //
        // 	res.json(cities);
        //
        // }).select({ "location": 1, "_id": 0});
    })

storeRouter.route('/storesCollection/stores/:location/:pageNo')
    .get(function(req, res) {
        var limit = 35;
        console.log(req.query);
        var queryObject = { 'address.city': req.params.location };
        if (req.query.area) {
            queryObject['address.area'] = req.query.area;
        }
        if (req.query.locality) {
            queryObject['address.locality'] = req.query.locality;
        }
        if (req.query.category) {
            console.log(req.query.category);
            queryObject['category'] = req.query.category;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        console.log(queryObject);
        Store.paginate(queryObject, { page: req.params.pageNo, limit: limit }, function(err, result) {
            if (err) {
                res.send(err);
            } else {

                res.json(result);
            }
        });
    })
    .post(function(req, res) {
        var store = new Store();
        var recData = req.body;
        store.name = recData.name;
        var city_name = recData.address.city;
        store.address = recData.address;
        store.category = recData.category; //make sure its an array of categories
        store.save(function(err) {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ success: false, 'message': 'User already exists' });
                } else {
                    return res.send(err)
                }
            }
            commons.saveSearchList(req.body.name.toLowerCase(), "store", city_name, req, res);
            for (var i = store.category.length - 1; i >= 0; i--) {
                commons.saveSearchList(store.category[i].toLowerCase(), "store-category", city_name, req, res);
            };

            res.json({ message: "Store created" });
        });
    });
storeRouter.route('/storesCollection/storeName/:storeName/:location/:pageNo')
    .get(function(req, res) {
        console.log(req.query);
        var queryObject = { 'name': req.params.storeName, 'address.city': req.params.location };
        if (req.query.area) {
            queryObject['address.area'] = req.query.area;
        }

        Store.paginate(queryObject, { page: req.params.pageNo, limit: 35 }, function(err, result) {
            if (err) {
                res.send(err);
            } else {

                res.json(result);
            }
        });

    });
storeRouter.route('/storesCollection/category/:category/:location/:pageNo')
    .get(function(req, res) {
        var limit = 35;
        var queryObject = { 'category': req.params.category, 'address.city': req.params.location };
        if (req.query.area) {
            queryObject['address.area'] = req.query.area;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        Store.paginate(queryObject, { page: req.params.pageNo, limit: limit }, function(err, result) {
            if (err) {
                res.send(err);
            } else {

                res.json(result);
            }
        });

    });
storeRouter.route('/localities/:city')
    .get(function(req, res) {
        var query = Store.find({ 'address.city': req.params.city }).select({ "address.area": 1, "_id": 0 });
        query.exec(function(err, someValue) {
            if (err) {
                return next(err);
            } else {
                var areaArray = [];
                for (var i = 0; i < someValue.length; i++) {
                    console.log(someValue[i].address.area);
                    if (areaArray.indexOf(someValue[i].address.area) == -1) {
                        areaArray.push(someValue[i].address.area);
                    }
                }
                res.json(areaArray);
            }

        });
    });
storeRouter.route('/collection')
    .get(function(req, res, next) {
        var queryObj = {};
        console.log('******************************');
        console.log("inside the category List");
        console.log(req.query);
        if (req.query.location) {
            queryObj['address.city'] = req.query.location.toLowerCase();
        }
        if (req.query.category) {
            queryObj.category = req.query.category.toLowerCase();
        }
        if (req.query.subCategory) {
            queryObj.subCategory = req.query.subCategory.toLowerCase();
        }
        var options = {};
        options.limit = req.query.limit ? parseInt(req.query.limit) : null;
        options.sort = req.query.sort || null;
        options.page = req.query.page || null;
        options.select = req.query.fields || null;

        Store.paginate(queryObj, options).then(function(storeList) {
            res.json(storeList);

        })

    });

storeRouter.route('/userSearch/storeCategories')
    .get(function(req, res, next) {

        var queryObj = {};
        if (req.query.location) {
            queryObj.location = req.query.location.toLowerCase();
        }
        queryObj.userSearchString = new RegExp('store-category', "i");
        var options = {};
        options.limit = req.query.limit ? parseInt(req.query.limit) : null;
        options.sort = req.query.sort || null;
        options.page = req.query.page || null;
        options.select = req.query.fields || null;

        UserSearch.paginate(queryObj, options).then(function(categoryFindList) {
            categoryFindList.docs = categoryFindList.docs.map(function(item) {
                return item.userSearchString.split('#&#')[0];
            });
            res.json(categoryFindList);

        })

    });
storeRouter.route('/categories/:city')
    .get(function(req, res) {
        var query = Store.find({ 'address.city': req.params.city }).select({ "category": 1, "_id": 0 });
        query.exec(function(err, someValue) {
            if (err) {
                return next(err);
            } else {
                var categoryArray = [];
                for (var i = 0; i < someValue.length; i++) {
                    for (var j = 0; j < someValue[i].category.length; j++) {
                        if (categoryArray.indexOf(someValue[i].category[j]) == -1) {
                            categoryArray.push(someValue[i].category[j]);
                        }
                    }

                }
                res.json(categoryArray);
            }

        });
    });
storeRouter.route('/categories/:pageNo')
    .get(function(req, res) {
        Store.paginate({
            /*category: { $in: ['category1'] }*/
        }, { select: 'category', page: req.params.pageNo, limit: 2 }, function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    })
storeRouter.route('/singleStore/:store_id/:slug?')
    .get(function(req, res) {
        console.log(req.query);
        Store.findById(req.params.store_id, req.query.select, function(err, store) {
            if (err) {
                res.send(err);
            } else {
                res.json(store);
            }
        })
    })
storeRouter.route('/storesCollection/suggestions')
    .get(function(req, res) {
        var queryObj = {};
        var sortEntity = ''
        console.log(req.query);
        queryObj['address.city'] = req.query.location.toLowerCase() || 'hyderabad';
        sortEntity = req.query.criteria.toLowerCase() + 'Count' || 'reviews';
        console.log(queryObj);
        console.log(sortEntity + "********************************************");
        Store.find(queryObj, null, { sort: '-' + sortEntity }, function(err, store) {
            if (err) {
                console.log(err);

            }
            res.json(store);
        });

    });
storeRouter.route('/storesCollection')
    .get(function(req, res) {
        var queryObj = {};
        console.log(req.query);
        queryObj['address.city'] = req.query.location.toLowerCase() || 'hyderabad';

        Store.find(queryObj, function(err, store) {
            if (err) {
                console.log(err);

            }
            res.json(store);
        });

    });

storeRouter.route('/submitStoreFollow')
    .post(commons.ensureAuthenticated, function(req, res) {
        var recData = req.body;
        var user_id = recData.userId;
        var store_id = recData.storeId;
        commons.validateId(user_id, User).then(function(doc) {
            commons.validateId(store_id, Store).then(function(doc2) {
                User.update({ _id: user_id }, { $push: { 'storeFollowing': store_id } }, { upsert: true }, function(err, data) {
                    if (err) {} else {
                        Store.update({ _id: store_id }, { $push: { 'userFollowers': user_id } }, { upsert: true }, function(err, data) {
                            if (err) {} else {
                                var activity = {};
                                activity.creator = user_id;
                                activity.store = store_id;
                                activity.statement = "followed store";
                                commons.enterActivity(activity);
                                res.json('user followed store');
                            }
                        })
                    }
                })
            })
        });

    })

storeRouter.route('/deleteStoreFollow')
    .post(commons.ensureAuthenticated, function(req, res) {
        var recData = req.body;
        var user_id = recData.userId;
        var store_id = recData.storeId;
        console.log(req.body);
        commons.validateId(user_id, User).then(function(doc) {
            console.log("validated user");
            commons.validateId(store_id, Store).then(function(doc2) {
                console.log("validated store");
                User.update({ _id: user_id }, { $pull: { 'storeFollowing': store_id } }, { upsert: true }, function(err, data) {
                    if (err) {

                    } else {
                        console.log("entered1");
                        Store.update({ _id: store_id }, { $pull: { 'userFollowers': user_id } }, { upsert: true }, function(err, data) {
                            if (err) {

                            } else {
                                console.log("entered 2");
                                res.json('followers deleted');
                            }
                        })
                    }
                })
            })
        });

    })


module.exports = storeRouter;
