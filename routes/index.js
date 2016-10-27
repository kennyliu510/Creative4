var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getcity',function(req,res) {
        console.log("In getcity route");
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) { 
		var myRe = new RegExp("^" + req.query.q);
  		console.log(myRe);
		
		if(err) throw err;
		var jsonresult = []; 
		var cities = data.toString().split("\n");
		for(var i = 0; i < cities.length; i++) { 
			var result = cities[i].search(myRe);
 			if(result != -1) {
			     jsonresult.push({city:cities[i]});
 			     console.log(cities[i]);
 		        }
	        }
		console.log(jsonresult);
		res.status(200).json(jsonresult);
	 }); 
 });
     

router.get('/getdefenition' ,function(req,res) {
	  res.header('Access-Control-Allow-Origin', 'example.com');
      	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	
          console.log("In getanimal route");
          console.log("req.query.q");
	  var URL = "https://owlbot.info/api/v1/dictionary/" + req.query.q + "?/format=json";
          request(URL).pipe(res);
 });    

var word = [
'few', 'satisfaction', 'program', 'time'
];

var current = 0;

router.get('/guess', function(req,res){
	
	var rword = {word: word[current]};
	res.status(200).json(rword);
	current++;
	if(current >= word.length){
  		current = 0;
  	}

});





module.exports = router;








