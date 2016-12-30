var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
URLSlugs = require('mongoose-url-slugs');
var mongoosePaginate = require('mongoose-paginate');
var relationship = require("mongoose-relationship"); //Refer https://www.npmjs.com/package/mongoose-relationship
var Schema  = mongoose.Schema;
var urlStrings = require('../routes/url.js');
//var connectionString = "mongodb://shopdb:shopdb1234@ds029476.mlab.com:29476/shopdb";
//var connectionString  = "mongodb://shop_dir:shop_dir@ds023912.mlab.com:23912/shoppins";
mongoose.createConnection(urlStrings.connectionString,function (err) {
  if (err) {
    console.log(err);
  }
});
var ChatRoomSchema = new Schema({
	creator1: { type:Schema.ObjectId, ref:"User"}, 
	creator2: { type:Schema.ObjectId, ref:"User"},
	chats: [{ type:Schema.ObjectId, ref:"Chat" }],
	lastMessage: { type:Schema.ObjectId, ref:"Chat" },
	lastMessageTime: { type : Date }

});
ChatRoomSchema.index({ creator1: 1, creator2: 1}, { unique: true });
var ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
//x.replace(/\D/g,'');

var ChatSchema = new Schema({
	message: String,
	chatRoom : { type:Schema.ObjectId, ref:"ChatRoom",childPath:"chats" },
	time: { type : Date, default: Date.now },
	user: { type:Schema.ObjectId, ref:"User"}
});
ChatSchema.plugin(relationship, { relationshipPathName:'chatRoom' });
var Chat = mongoose.model("Chat", ChatSchema);
var ActivitySchema = new Schema({
	//activityFor:{ type:Schema.ObjectId, ref:"User"},
	creator: { type:Schema.ObjectId, ref:"User"}, //created by person
	creatorStore: { type:Schema.ObjectId, ref:"Store"}, //created by store
	offer:{ type:Schema.ObjectId, ref:"Offer" },
	review:{ type:Schema.ObjectId, ref:"Review" },
	followed: { type:Schema.ObjectId, ref:"User"},
	store: { type:Schema.ObjectId, ref:"Store"},
	product: { type:Schema.ObjectId, ref:"Product"},
	statement: String,
    time : { type : Date, default: Date.now }
});

var ReportStoreSchema = new Schema({
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"reports" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"storeReports" },
    description: String,
    subject: String
});

ReportStoreSchema.plugin(relationship, { relationshipPathName:'user' });
ReportStoreSchema.plugin(relationship, { relationshipPathName:'store' });



var VisitSchema = new Schema({
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"visits" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"visits" },
    product:{type:Schema.ObjectId, ref:"Product",childPath:"visits"},
    type: String
},{ collection : 'visits' });

VisitSchema.plugin(relationship, { relationshipPathName:'user' });
VisitSchema.plugin(relationship, { relationshipPathName:'store' });
VisitSchema.plugin(relationship, { relationshipPathName:'product' });


var UpvoteSchema = new Schema({
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"upvotes" },
    product : { type:Schema.ObjectId, ref:"Product",childPath:"upvotes" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"upvotes" },
    review : { type:Schema.ObjectId, ref:"Review",childPath:"upvotes" },
    type: String
},{ collection : 'upvotes' });

UpvoteSchema.plugin(relationship, { relationshipPathName:'user' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'store' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'product' });
UpvoteSchema.plugin(relationship, { relationshipPathName:'review' });

var OfferSchema = new Schema({
    headline  : String,
    description  : String,
    startDate  : { type : Date, default: Date.now},
    endDate  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"offers"},
    category:[String],
    subCategory:[String],
	bannerImage:{type:String},
  	images:[String],
  	imagesMin:[String]
    
},{ collection : 'offers' });
OfferSchema.plugin(relationship, { relationshipPathName:'store' });
var ReviewSchema = new Schema({
    description  : String,
    date  : { type : Date, default: Date.now},
    time : { type : Date, default: Date.now },
    store : { type:Schema.ObjectId, ref:"Store",childPath:"reviews" },
    product : { type:Schema.ObjectId, ref:"Product",childPath:"reviews" },
    user : { type:Schema.ObjectId, ref:"User",childPath:"reviews" },
    upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
    rating:{type:String,default:'0'}
},{ collection : 'reviews' });


ReviewSchema.post('init', function () {
	try{
		this.upvotesCount = this.upvotes.length || 0;
  
	}
	catch(err){
		this.upvotesCount =  0;
  
	}
  
  
  //next();
});
/*ReviewSchema.post('save', function(doc) {
	console.log("**************************-");
  console.log(doc.store);
  Store.aggregate([{$match: {id: doc.store}}, {$project: {lengthA: {$size: '$reviews'}}}]);
  Store.findById(doc.store)
				.select('reviews -_id')
				.exec(function(err, result) {
						if(err){
						res.send(err);
					}
					else{
						
						//res.json(avg/result.length);
					}
				});
});*/
ReviewSchema.plugin(relationship, { relationshipPathName:'user' });
ReviewSchema.plugin(relationship, { relationshipPathName:'store' });
ReviewSchema.plugin(relationship, { relationshipPathName:'product' });

var UserSchema = new Schema({
	"firstName":String,
	"lastName":String,
	'verified': Boolean,
	'email':{ type: String, unique: true },
	"password":String,
	"facebook": String,
	"picture":{type:String,default:'https://cdn3.iconfinder.com/data/icons/black-easy/512/538303-user_512x512.png'},
	"displayName": String,
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	visits:[{ type:Schema.ObjectId, ref:"Visit" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
	followers:[{ type:Schema.ObjectId, ref:"User" }],
	following:[{ type:Schema.ObjectId, ref:"User" }],
	storeFollowing:[{ type:Schema.ObjectId, ref:"Store" }],
	followersCount:Number,
	followingCount:Number,
	reviewsCount :Number,
	visitsCount :Number, 
	upvotesCount :Number,
	storeId:[{ type:Schema.ObjectId, ref:"Store" }],

},{ collection : 'users' });


var FollowSchema = new Schema({
	followerId : { type:Schema.ObjectId, ref:"User" },
	storeId: { type:Schema.ObjectId, ref:"Store" },
	productId: { type:Schema.ObjectId, ref:"Product" },
	userId: { type:Schema.ObjectId, ref:"User" },
	type: String
})
/*Nuber of Followers a single user has*/
var FollowersSchema = new Schema({
	user:{ type:Schema.ObjectId, ref:"User" },
	
});

/*The number of users a person follows*/
var FollowingSchema = new Schema({
	user:{ type:Schema.ObjectId, ref:"User" },
	
});
UserSchema.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;
	return user;

}

UserSchema.methods.comparePasswords = function(password,callback){
	bcrypt.compare(password,this.password,callback);

}

var User = mongoose.model('User',UserSchema);
var Visit = mongoose.model('Visit',VisitSchema);
var Review = mongoose.model('Review',ReviewSchema);
var ReportStore = mongoose.model('ReportStore',ReportStoreSchema);
UserSchema.pre('save',function(next){
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
});
UserSchema.post('init', function () {
	
	try{
		
		this.followersCount = this.followers.length || 0;
  		this.followingCount = this.following.length || 0;
		this.reviewsCount = this.reviews.length || 0;
		this.visitsCount = this.visits.length || 0;
		this.upvotesCount = this.upvotes.length || 0;
	}
	catch(err){
		this.followersCount = 0;
  		this.followingCount = 0;
		this.reviewsCount =  0;
  		this.upvotesCount =  0;
  		this.visitsCount = 0;
	}
  
  
  //next();
});


var Address = new Schema({
	doorNo:String,
	city:String,
	state:String,
	zone:String,
	country:String,
	district:String,
	zipCode:String,
	area:String,
	locality:String,
	landmark:String,
	latitude:Number,
	longitude:Number
});

var Price = new Schema({
	value:Number,
	currency:String
});

var StoreSchema = new Schema({
	name:String,
	admin:{ type:Schema.ObjectId, ref:"User" },
	userFollowers:[{ type:Schema.ObjectId, ref:"User" }],
	address:Address,
	category:[String],
	subCategory:[String],
	keywords:[String],
	phone:String,
	description:String,
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	products:[{ type:Schema.ObjectId, ref:"Product" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
	offers:[{ type:Schema.ObjectId, ref:"Offer" }],
	bannerImage:{type:String,default:'https://upload.wikimedia.org/wikipedia/commons/3/3a/SM_Department_Store_Cubao.jpg'},
  	storeImages:[String],
	visits:[{ type:Schema.ObjectId, ref:"Visit" }],
	visitsCount: Number,
	productsCount:Number,
	reviewsCount:Number
},{ collection : 'stores' });

StoreSchema.post('init', function () {
	try{
		this.reviewsCount = this.reviews.length || 0;
  this.productsCount = this.products.length || 0;
  this.visitsCount = this.visits.length || 0;		
	}
	catch(err){
		this.reviewsCount =  0;
  this.productsCount =  0;
  this.visitsCount = 0;
	}
  
  
  //next();
});
var ProductSchema = new Schema({
	name:String,
	address:Address,
	description:String,
	category:[String],
	subCategory:[String],
	price:Price,
	sizesAvailable:String,
	reviews:[{ type:Schema.ObjectId, ref:"Review" }],
	upvotes:[{ type:Schema.ObjectId, ref:"Upvote" }],
	visits:[{ type:Schema.ObjectId, ref:"Visit" }],
	bannerImage: String,
	productImages:[String],
	images:[String],
	imagesMin:[String],
	visitsCount: Number,
	reviewsCount:Number,
	upvotesCount:Number,
	store: { type:Schema.ObjectId, ref:"Store", childPath:"products" }
});
var autoPopulateStore = function(next) {
  this.populate('store');
  //this.cityName = this.store.address.city;
  next();
};

ProductSchema.
  pre('findOne', autoPopulateStore).
  pre('find', autoPopulateStore);
ProductSchema.post('init', function () {
	
	try{
this.reviewsCount = this.reviews.length || 0;
  this.upvotesCount = this.upvotes.length || 0;
  this.visitsCount = this.visits.length || 0;
	}
	catch(err){
		this.reviewsCount =  0;
  this.upvotesCount =  0;
  this.visitsCount = 0;
	}
  
  
  //next();
});


ProductSchema.plugin(relationship, { relationshipPathName:'store' });



//.replace(/[^a-z0-9]/gi,'')
StoreSchema.plugin(URLSlugs("name address.area address.city address.state address.country", {field: 'myslug'}));
StoreSchema.plugin(mongoosePaginate);
ProductSchema.plugin(mongoosePaginate);

var MailVerifySchema = new Schema({
	email:{ type: String, unique: true },
	token:String,
	date  : { type : Date, default: Date.now}
	
});

exports.MailVerify = mongoose.model('MailVerify',MailVerifySchema);
exports.Store = mongoose.model('Store',StoreSchema);
exports.Product = mongoose.model("Product", ProductSchema);
exports.User = User;
exports.Review = Review;
exports.Chat = Chat;
exports.ChatRoom = ChatRoom;
exports.Visit = Visit;
exports.ReportStore = ReportStore;
exports.Activity = mongoose.model("Activity",ActivitySchema);
exports.Upvote = mongoose.model('Upvote',UpvoteSchema);


/*

var ParentSchema = new Schema({
    children:[{ type:Schema.ObjectId, ref:"Child" }]
});
var Parent = mongoose.model("Parent", ParentSchema);

var ChildSchema = new Schema({
    parent: { type:Schema.ObjectId, ref:"Parent", childPath:"children" }
});
ChildSchema.plugin(relationship, { relationshipPathName:'parent' });
var Child = mongoose.model("Child", ChildSchema)
*/


/*
var parent = new Parent({});
parent.save();
var child = new Child({parent:parent._id});
child.save() //the parent children property will now contain child's id
child.remove() //the parent children property will no longer contain the child's id
*/
