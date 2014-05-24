var express = require('express');
var ejs = require('ejs');
var Twit = require('twit');
var T = require('./config');

var app = express();

app.use(express.bodyParser());
app.use(express.static('public'));
app.use(app.router);
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log('Listening on ' + port + '... Happy hacking!');
});

app.get('/', function(req, res) {
	var psi = false;
	T.get('statuses/user_timeline', { screen_name: 'NEAsg', count: 5}, function(err, reply) {
		for (var i = 0; i < 5; i++) {
			if(psi === false) {
				psi = getPsiFromTweet(reply[i].text);
			}
		}
		getTweets();
		res.render('index.ejs', { psi: psi });
	});
});

// js functions for parsing @NEAsg's tweets

function hasPSI(text) {
	text = text.toUpperCase();
	for (var i = 0; i < text.length; i++) {
		if (i >= 2) {
			if (text[i-2] + text[i-1] + text[i] === 'PSI') {
				console.log('has psi!');
				return true;
			}
		}
	}
	console.log('has no psi!')
	return false;
}

function psiTweet(text) {
	if (hasPSI(text)) {
		return true;
	} else {
		return false;
	}
}

function is24hrPsi(text) {
	text = text.toUpperCase();
	console.log(text);
	for (var i = 0; i < text.length; i++) {
		if (i >= 6) {
			if (text[i-6] + text[i-5] + text[i-4] + text[i-3] + text[i-2] + text[i-1] + text[i] === '24-HOUR') {
				console.log('it is a 24 hour psi reading');
				return true;
			}
		}
	}
	console.log('it is not a 24hr psi reading')
	return false;
}

function getPsiFromTweet(text) {
	if (psiTweet(text) && !is24hrPsi(text)) {
    if(!isNaN(text[14]) && !isNaN(text[15])) {
		  var psi = text[22] + text[23];
		  return psi;
    } else if (!isNaN(text[14])) {
      var psi = text[21] + text[22];
      return psi;
    }
	} else {
		return false;
	}
}

function getTweets() {
	var tweets = { tweet: [], user: [] };
	T.get('search/tweets', { q:'sghaze', count: 20 }, function(err, reply) {
		console.log(reply.statuses);
		// for (var i = 0; i < 20; i++) {
		// 	tweets.tweet[i] = reply[0].text[i];
		// 	tweets.user[i] = reply[0].
		// }
	});
}
