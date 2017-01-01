'use strict';
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var upload = multer({ dest: './uploads/'});
var models = require('..//models/storeModel');
var Store = models.Store;
cloudinary.config({
    cloud_name: 'shoppingdirectory',
    api_key: '967339527283183',
    api_secret: '74NXckYl9m1-O0_ZTU8U_qoIDfw'
});
var common = require('../routes/commonRouteFunctions');
var uploadController = {
  singleUpload: singleUpload,
  multipleUpload: multipleUpload,
  uploadStoreBanner: uploadStoreBanner
};
function singleUpload(req, res){
  var file = req.file;    
  console.log("image upload");
  cloudinary.uploader.upload(file.path, function(reqc, resc) {
    var imgUrl = resc.url;
    res.send(imgUrl);
  });
}
function uploadStoreBanner(req,res){
  var file = req.file;    
  console.log("image upload");
  cloudinary.uploader.upload(file.path, function(reqc, resc) {
    var imgUrl = resc.url;
    console.log(imgUrl);
    Store.findById(req.params.storeId, function (err, store) {
    if (err){
      callback(err, null);
    }
    else {
      item = req.body;
      store.bannerImage = imgUrl;
      store.save(function (err, result) {
        res.send(imgUrl);

      });
    }
  });
    
  }); 
}
function multipleUpload(req, res){
  var imgArray = [];
  var imgArrayMin = [];
  var size = req.files.length;
  var counter = 0;
  for(i=0; i<size;i++){
    cloudinary.uploader.upload(req.files[i].path, { eager: [{ width: 112, height: 112, crop: "pad" }
             ]},function(reqc, resc) {
                imgArray.push(resc.url);
                imgArrayMin.push(resc.eager[0].url);
                counter = counter + 1;
                if(counter == size){
                res.json(imgArray);
              }
            });
  }
 }

module.exports = uploadController;
