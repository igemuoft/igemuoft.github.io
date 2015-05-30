---
layout: post
title:  "MEAN Stack Tutorial"
date:   2015-05-30 12:12:17
categories: tutorials
---

#### *from the ground up*

The source code for this tutorial can be found [here](https://github.com/thejmazz/naivednageneration).

## NodeJS/Express/Mongoose Tutorial

Read the source! It is commented and filled with links to external resources.

First thing to do is set up our NodeJS/Express environment:

~~~bash
$ npm init
$ npm install --save express body-parser child-process mongoose morgan colors
~~~

`npm init` will create a `package.json` file. `npm install` will download our
dependencies into the `node_modules` folder. The `--save` option ensures
the dependencies will be added to the `dependencies` object within the
`package.json` file. Now let's create a basic app that responds to a `GET` and
`POST` http request at the root route. Create `app.js` as follows:

~~~js
var express = require('express');
var port = process.argv[2];
var app = express();

app.get('/', function(request, response) {
    res.send('got a GET request');
});

app.post('/', function(req, res) {
    res.send('got a POST request');
});

app.listen(port);
console.log('Express server listening on port ' + port);
~~~

Open up the [Postman - REST Client](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en)
chrome app. You *cannot* test `POST` requests easily from your browser's
navigation bar. Instead, Postman allows you to easily send any http request to
a url and provide headers and other useful data. Point Postman to
`http://localhost:9001/` and choose `GET` from the dropdown. Click send. Notice
that the response is `got a GET request`. Similarily, select `POST` and send.
Notice how on *the same url*, you have received a different response: `got a
POST request`. This is due to the use of http verbs - `GET, POST, PUT, DELETE,
PATCH,...` there are a [bunch] of different methods. `GET` (asking the 'embassy'
for your record), `POST` (sending the embassy personal info and they send back a
personalized passport), `PUT` (informing the embassy of a mistake in the
passport and they fix it, may send back confirmation of fix), `DELETE` (this is
what you do when you escape to a faraway island and remove your personal
information from inside the embassy's database).

Okay, so that's working, but wouldn't it be nice if the Node server logged some
info every time a request was sent? Just for our development purposes, to see
which routes are getting called, etc. This is an example of *[middleware](expressjs.com/guide/using-middleware.html)*.
"An Express application is essentially a series of middleware calls". We can use
middleware to `console.log('got a request')` on every route - just so we are
aware of what our server is doing! Insert the following into your code:

~~~js
app.use(function(req, res, next) {
    console.log('got a request!');
    next();
});
~~~ 

Now send a bunch of get or post requests from Postman and you will see the 
console light up with messages. Notice how it happens on both of our routes - 
we did not specify a route in our `app.use(route, middleware)` call, so it will
apply the middleware to *all* routes. The `next` parameter and `next()` call are
required so that the next function in the middleware stack will be called,
otherwise our application will hang at the log.There are two alternative ways to
specify specific middleware for specific routes, but first let's rename our two
root routes to something more specific:

~~~js
app.get('/getDNAs', function(req, res) {
    res.send('here is some DNA: ATGGGGGGGGGGTAG');
});

app.post('/genDNA', function(req, res) {
    res.send('gonna generate some DNA now..');
});
~~~

If we wanted to log our GET and POST routes with middleware, we could do it like
this:

~~~js
app.use('/getDNAs', function(req, res, next) {
    console.log('got a GET to /getDNAs');
    next();
});

app.use('/genDNA', function(req, res, next) {
    console.log('got a POST to /genDNA');
});
~~~

or we can define middleware functions that need to explicitly called:

~~~js
var getDNALog = function(req, res, next) {
    console.log('got a GET to /getDNAs');
    next();
});

var postDNALog = function(req, res, next) {
    console.log('got a POST to /genDNA');
});

app.get('/getDNAs', getDNALog, function(req, res) {
    // route stuff
});

app.post('/genDNA', postDNALog, function(req, res) {
    // route stuff
});
~~~

Now, that was just to introduce you to the topic of middleware. I highly 
recommend reading through the Express guides for [routing](http://expressjs.com/guide/routing.html)
and [middleware](http://expressjs.com/guide/using-middleware.html). In reality,
no one writes their own custom log messages. There is already an [npm](https://www.npmjs.org/package/grunt-bowercopy)
package for that. We will use [morgan](https://www.npmjs.com/package/morgan).
Morgan is easy to use, and like all other well-developed community middleware,
modules, etc, a quick read through the readme on the repo should be enough
to get you up to speed with the basics. Essentially you are importing a module,
and then finding out which functions from it to call. All the annoying, tedious
stuff has been done for and tested. For example, morgan is currently on version
1.5.3 and has 135 commits from 7 contributors. Any ways, to use morgan you just
need to require it and then apply it as middleware:

~~~js
var morgan = require('morgan');

app.use(morgan('tiny'));
~~~

`tiny` is one of the predefined formats..something I just now figured out by
browsing the readme file. I would like to stress here the importance of simply
reading documentation and readmii (plural of readme) before asking someone your
question - most often you will be able to find the answer, and learn a bunch in
the process. If you also import [`colors`](https://www.npmjs.com/package/colors)
you can stylize our console output a bit more, and in this way I've made my own
morgan logger style:

~~~js
var morgan = require('morgan');
var colors = require('colors');

app.use(morgan(
    ':method '.magenta + 
    ':url '.green + 
    ':status '.blue +
    ':res[content-length] '.italic.grey + 'bits '.italic.grey 
    + 'sent in ' + ':response-time ms'.grey
));
~~~

Now lets move on to developing our routes, so far we have one `GET` endpoint and
one `POST` endpoint. We will be using `POST /genDNA` to allow the client to send
over a single numerical argument `n` which will be used as the command-line
argument for a Python child process that generates a random DNA sequence that
is `n` nucleotides long. The python3 script is:

~~~python
import sys
import random

nts = int(sys.argv[1])
seq = ""

# A *very* naive random DNA generation algorithm
# But can you do better?
for nt in range(nts):
    r = random.random()
    if (r > 0.75):
        seq += "A"
    elif (r > 0.5):
        seq += "T"
    elif (r > 0.25):
        seq += "C"
    else:
        seq += "G"

print(seq, end="")
~~~

You can store the script in `genDNA.py` and test it from your terminal like so:

~~~bash
$ python3 genDNA.py 512
~~~

which will print out a random arrangement of 512 nucleotides.

Let's look at how we can get `n` from the client. We will be using a `POST`
request since we are reguesting certain information from the client which we
will use to perform a specific function, in this case, get an argument for our 
Python script so we can send back a sequence of the desired length. Other
applications for `POST` requests can range from logging in to uploading an
image.  We will use [body-parser](https://www.npmjs.com/package/body-parser) to
ease this process. bodyParser fills the `req.body` object with useful data. The
`req` object already has a ton of information, but most of it is not required
on a regular basis. Try out `console.log(req)` on a route to see what I mean.
To get `urlencoded` bodies we can use bodyParser as so:

~~~js
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.post('/genDNA', function(req, res) {
    res.send(req.body);
});
~~~ 

Now open up Postman, set the url to `http://localhost:9001/genDNA`, choose
`POST`, make sure Headers are empty, and add some random Key/Value pairs to
`x-www-form-urlencoded`. Click send, you should receive a json of your key/value
pairs. Now let's set up raw json data, add in:

~~~js
app.use(bodyParser.json());
~~~

Remove all of your key/value pairs, add the following Header/Value pair: 
`Content-Type`/`application/json`, and add in some raw data in json format, for
example:

~~~json
{
    "n": 42
}
~~~

Click send, and as before, you should get a json back with your sent data. 
So, we are able to retrieve `n` from the client, let's get started on setting
up the Python [child process](https://nodejs.org/api/child_process.html):

~~~js
var cp = require('child_process');

app.post('/genDNA', function(req, res) {
    var n = req.body.n;
    
    var results = {
        output: null,
        errorlog: null,
        exitcode: null
    };

    var genDNAScript = cp.spawn('python3', ['genDNA.py', n]);

    // get stdout
    genDNAScript.stdout.on('data', function(stdout) {
        results.output = stdout.toString();
    });

    // get stderr
    genDNAScript.stderr.on('data', function(stderr) {
        results.errorlog = stderr.toString();
    });

    // script finished
    genDNAScript.on('close', function(code) {
        results.exitcode = code; 

        // Respond on process close
        // otherwise, async problems!
        res.send(results);
    });   
})
~~~

Send the same request as the last with Postman and you should get back
a randomized DNA sequence! But what is going on here? First you need to 
understand the three core *data streams* associated with a *process*. There is
standard input (`stdin`), standout output (`stdout`) and standard error
(`stderr`). Conforming to these three core idioms allows the stringing together
of simple commands into complex processes. For example, I can send the contents
of a file to `stdout` with `cat`, then pipe that into `grep` (in this way the
`stdout` becomes the `stdin` for `grep`), search for all lines containg "todo"
and then store that result in my clipboard using `xclip`:

~~~bash
$ cat notes.txt | grep todo | xclip -i -selection clipboard
~~~

We won't be using `stdin` in this tutorial. ChildProcess is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).
So essentially, `cp.spawn()` returns an object that we can 'catch' events
with, in our case we watch for data to come from the `stdout` and `stderr` 
streams. Then all that is left to do is store the output in our `results` object
with the callback function. Finally we catch the `close` event, store the exit
code (which every process must return, 0 means success, anything else is an
error code), and finally send the entire `results` object back to the client.

Now we have a working `POST /genDNA` endpoint which sends back a random DNA
sequence of length specified by the client. Now let's finish up the API by
storing all results in a database! We will use [MongoDB](https://www.mongodb.org)
for our database, and interact with it from Node with [mongoose](mongoosejs.com).

The first step with mongoose is to require the module and connect to our
database (either local or online):

~~~js
var mongoose = require('mongoose');

// use local MongoDB
var url = 'mongodb://localhost/dbName';
// or use mongolab      
var url = 'mongodb://myuser:mypass@ds028017.mongolab.com:28017/mydb';
mongoose.connect(url);
~~~

The next step is to define a [Schema](http://mongoosejs.com/docs/guide.html)
that our `documents` within a `collection` within a `database` will follow:

~~~js
var DNASchema = mongoose.Schema({
    'sequence': String,
    'len': Number
}); 
~~~ 

Essentially, we are enforcing the `types` of each of our `attributes` within an
individual `document`. A `collection` is a list of `documents`. The `database` 
holds a number of `collections`. Be sure to check the docs for Schema mentioned
above to learn about all the other valid types, `Date`, `Buffer`, `ObjectID`,...
are just a few. Once we have set up a schema, it's simple to define a mongoose
[model](http://mongoosejs.com/docs/models.html):

~~~js
var DNASeq = mongoose.model('dna', DNASchema);
~~~

Typically, you would capitalize your models. It does not matter which case
we use in the first argument to `model(name,schema)` since the collection name
will be all lowercase anyways (it will also have an 's' added to so don't use
the plural form for `name`). This is enough setup for us to save sequences to
the database! Let's add the following just before our `res.send(results)` in
`POST /genDNA`:

~~~js
if (code === 0) {
    // success, store sequence in DB
    var seq = new DNASeq({
        sequence: results.output,
        len: arg 
    });

    seq.save(function(err, sequence) {
        if (err) console.error(err);
        
        console.log('saved sequence');
    });
}
~~~

First we make a new instance of our model following the schema, and then we
simply save the model. Models have a bunch of predefined methods like
`save(function(err, savedItem))` and you can even add your own!

Another model method is `find()`. We can use `Model.find(conditions,
[projection], [options], [callback])` and pass in no conditions to return
all items in the collection for that model:

~~~js
app.get('/dnas', function(req, res) {
    DNASeq.find(function(err, dnas) {
        if (err) console.error(err);
        
        res.send(dnas);
    });
});
~~~

Awesome! We now have built a RESTful API using NodeJS/Express and
MongoDB/mongoose! Verify that `POST /genDNA` and `GET /dnas` work as expected.
Now it is time to build the AngularJS webapp that will use our API. First,
one last thing: we need to enable CORS - cross-origin resource sharing.
Basically, if we don't do this some browsers won't let use get resources from
an API at another origin, even different port. But it's easy to fix, just apply
the following global middleware that sets response headers to allow CORS:

~~~js
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
~~~ 

## AngularJS Tutorial 

First, make sure you are on the `pre-angular` branch:
(or keep using your own code if you have been following along until now)
~~~bash
$ git clone https://github.com/thejmazz/naivednageneration.git
$ cd naivednageneration
$ git checkout pre-angular
~~~

Now we have a RESTful API with two endpoints (`POST /genDNA` and `GET /dnas`),
and we will build the frontend app using AngularJS.  First, we need to make a
folder for static content. This can be served easily from Node, and essentially
allows us to make a simple html website. So:

~~~bash
$ mkdir public
$ cd public
$ touch index.html
~~~

Fill your `index.html` file as so:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>naive dna gen.</title>
    
    <!-- bower:css -->
    
    <!-- endbower -->
</head>
<body>
    <h1> A Naive DNA Generation Algorithm </h1>
    
    <!-- bower:js -->
    
    <!-- endbower -->
</body>
</html>
~~~

Then to serve this from Node, add the following to the end of `app.js`:

~~~js
app.use(express.static('public'));
console.log('Serving content from ' + 'public'.blue);
~~~

Start the server:
~~~bash
$ node app.js 9001
~~~

And visit the page at `http://localhost:9001`.

From inside `public`, run
~~~bash
$ bower init
~~~

Change the name if you'd like, just enter through everything else. When that is
finished, a `bower.json` file will have been created. This file is very similar
to `package.json` except `package.json` is used by Node and most often for
backend dependencies (like Express, body-parser), or for command-line tools like
Gulp or Grunt, whereas `bower.json` is used for managing frontend dependencies
(like jQuery, bootstrap), and will install these into `bower_components`. Lets
get started by installing AngularJS:

~~~bash
$ bower install --save angular
~~~

The `--save` option will add `angular` to our `dependencies` object within
`bower.json`. Look at the file if you would like to see for yourself. If you
take a peek inside `bower_components`, you will see there is now a folder
`angular` and within there `angular.js`, the main file we are looking for. We
*could* manually add that script to our html, but there is an easier way to do
it. Remember those 

~~~html
<!-- bower:js -->
<!-- endbower -->
~~~

comments? They are for a tool called `wiredep` to add in our dependencies.
First, make sure you have `wiredep` installed globally:

~~~bash
$ npm install -g wiredep
~~~

And then wire up those dependencies into your _source_ file `index.html`:

~~~bash
$ wiredep -s index.html
~~~

Now the `<script src="...angular.js"></script>` will have been added to
`index.html` and we can really get started. Let's make a folder called `js`
within `public` and create a file `main.js` within. Fill `main.js`with the
following (also make sure to add `<script src="js/main.js"></script>` to
`index.html`, after the bower stuff):

~~~js
angular.module('naiveDNA', [])

.controller('bodyCtrl', ['$scope', function($scope) {
    $scope.mainTitle = 'A Naive DNA Generation Algorithm'
    $scope.subTitle = "But what isn't?"
}]);
~~~

A few things just happened. First, we have defined our main app as `naiveDNA`,
to reconcile this with our html modify the opening `<html>` tag like so:

~~~html
<html lang="en" ng-app="naiveDNA">
~~~

Second, we have defined our first controller. A controller is what is what it
sounds like..used to add/remove/modify/'use' the elements within it's context.
Again, let's reconcile this with our html:

~~~html
<body ng-controller="bodyCtrl">
~~~

Now, what is `$scope`? I like to think of `$scope` as the object containing the
variables available to the context of that controller. In this case, any
`ng-model="foo"` (which we will see soon) will be available from the controller
as `$scope.foo`. So let's put `$scope` to use, replace the current `<h1>` in
`index.html` with the following:

~~~html
<h1>{{mainTitle}}</h1>
<h2>{{subTitle}}</h2>
~~~

Refresh the page, and you should see your new titles. Time to get a little more
interesting. We have a `GET` endpoint on our api at `/dnas`. You can test this
by pointing Postman or your browser to `http://localhost:9001/dnas`. (If you
have not generated any sequences before, this will be empty). Let's add a button
to our page that will retreive all of our seqeunces and display them on the
page, below your headings add:

~~~html
<hr> <center> <button ng-click="getSeqs()">All Sequences</button> </center>
<div ng-repeat="seq in seqs">
    <p>{{seq.len}}</p>
    <textarea>{{seq.sequence}}</textarea>
</div>
~~~

And add the corresponding function and object to `main.js`:

~~~js
$scope.seqs = {};

$scope.getSeqs = function() {
    $http.get('http://localhost:9001/dnas').success(function(data) {
        $scope.seqs = data;
    });
};
~~~

But wait, not so fast! What is `$http`? It is service provided by Angular and as
such we need to properly define the dependencies of our controller, change the
controller declaration to:

~~~js
.controller('bodyCtrl', ['$scope', '$http', function($scope, $http) {
    // our stuff
}]);
~~~

Okay so what has happened? We defined a function `getSeqs` and since the
`$scope` is shared between our controller and it's respective DOM element (in
this case, `<body>`) we call that function on the button's click with
`ng-click="getSeqs()"`. Then we are using
[`$http`](https://docs.angularjs.org/api/ng/service/$http) to perform a `GET`
request to `/dnas`, which returns a
[promise](https://docs.angularjs.org/api/ng/service/$q) with two specific
methods: `success` and `error`. You can also use the promise method `then`.
Essentially, we have requested a resource, some async stuff goes off, we get our
callback with the results (`.success(function(results){...})`) and store the
results into `$scope.seqs`. The `ng-repeat` part of this loops through the
`$scope.seqs` array and outputs some nice html.

Now let's add the ability to add sequences to the database from our app. The
markup for `index.html`:

~~~html
<input type="number" ng-model="numNts" placeholder="how many nucleotides?"></input>
<button ng-click="genDNA()">Generate DNA!</button>
<div ng-show="currentSeq">
    You just generated: <textarea>{{currentSeq}}</textarea>
</div>
~~~

And the associated JavaScript in `main.js`:

~~~js
$scope.genDNA = function() {
    var envelopeContents = {
        arg: $scope.numNts
    };
    
    var sentEnvelope = $http.post('http://localhost:9001', envelopeContents);
    
    // could handle this like we did with .success in getSeqs, but for
    // the sake of variety/learning we will use the promise method then
    // see https://docs.angularjs.org/api/ng/service/$q
    // promise.then(success,error,update);
    sentEnvelope.then(function(reply) {
        // person got our envelope, did some stuff, sent us back a reply
        $scope.currentSeq = reply.output;
    }, function(reason) {
        alert('Failed: ' + reason);
    }, function(update) {
        alert('Got notification: ' + update);
    });
};
~~~

[`ngShow`](https://docs.angularjs.org/api/ng/directive/ngShow) will enforce css
styles so that the div will show or not show depending on if it's associated
expression is truthy. In our case, `if(currentSeq)` would return false until
`genDNA()` is ran, at which point `if(notNullVariable)` will return true and the
div will show.

Questions? Errors? Please let me know! Next steps: work through some
[tutorials](http://campus.codeschool.com/courses/shaping-up-with-angular-js/intro)
and read the [docs](https://docs.angularjs.org/api)!

Cheers,<br>
thejmazz
