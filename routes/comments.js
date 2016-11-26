/*Products filter attempt using mongoose-paginate*/
/*parents
.find({})
.populate({
  path: 'children',
  match: { age: { $gte: 18 }},
  select: 'name age -_id'
})
.exec()

storeRouter.route('/products/:category/:pageNo')
	.get(function(req,res){
		strCat = req.params.category;
		Store.populate({
  							path: 'products',
  							match: { category: { $eq: ""+req.params.category+"" }}
		}).
		paginate({
			'products.name': { $eq: 'product1'}
		}, {  
			populate:{
				path: 'Product',
  				match: { 
  					category: { $eq: strCat }
  								{ $elemMatch: { $eq: strCat, $lt: 85 } }
  				}
  			},page: req.params.pageNo, limit: 10 }, function(err, result) {
		    if(err){
				res.send(err);
			}
			else{
				res.json(result);
			}
		});
		
	})*/