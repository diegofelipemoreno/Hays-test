let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let cors = require('cors');

let routes = require('./routes/routes.js')(app);
let database = require('./data.json');


let server = app.listen(3000, function () {
    console.log('Listening on port %s...', server.address().port);
});

let originsWhitelist = [ 'http://localhost:4200', 'http://localhost:3000'];

let corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send(database);
});

app.get('/hotels', function(req, res) {
    const keyHotel = 'hotel',
          keyAllStars = 'allstars';
    let queryObject = req.query || {},
        myarray= [];   

    Object.keys(queryObject).forEach(elem => {
    
        if (elem !== keyHotel) {
            JSON.parse(queryObject[elem]);
        }
    });      

    (function (queryObject) {
       let  word = queryObject[keyHotel] || '',
            allstars = queryObject[keyAllStars],
            hotelMatch = [],
            isStarsSelected = flagStars(),
            isWordSelected = word;

            if(isWordSelected.length === 0 ) {
                isWordSelected = JSON.parse(false);
            } else {
                isWordSelected = JSON.parse(true);
            }

            word = word.toLocaleLowerCase();

            function flagStars() {
                let isStar = false;

                database.forEach((hotel) => {
                    Object.keys(`star${hotel.stars}`).some(elem => {

                        if (JSON.parse(queryObject[`star${hotel.stars}`])) {
                            isStar = queryObject[`star${hotel.stars}`];
                        }
                     }); 
                });

                return isStar;
            }

            function filterOnlyWord(word) {
                let result;

                hotelMatch = database.filter((hotel) => {
                hotel.name = hotel.name.toLocaleLowerCase();

                    if (null !== hotel.name.match(word) && hotel.name.match(word)[0].length) {
                        result = true;
                    } else {
                        null === hotel.name.match(word) ? result = false : result = true;
                    }
                    return result;
                });

                return hotelMatch;
            }

            function filterOnlyStars(databaseArray) {
                hotelMatch = databaseArray.filter((hotel) => {

                    if (JSON.parse(queryObject[`star${hotel.stars}`])) {
                        return true;
                    }
                });

                return hotelMatch;
            }

            if (JSON.parse(allstars)) {
                filterOnlyWord(word);
            } else if (JSON.parse(isWordSelected) && !JSON.parse(isStarsSelected)) {
                filterOnlyWord(word);
            } else if (JSON.parse(isWordSelected) && JSON.parse(isStarsSelected)) {
                let filteredByWord = filterOnlyWord(word);

                hotelMatch = filterOnlyStars(filteredByWord);
            } else if (!JSON.parse(allstars) && !JSON.parse(isWordSelected) && JSON.parse(isStarsSelected) ) {
                filterOnlyStars(database);
            } else {
                hotelMatch = database;
            }

            if(!hotelMatch) {
                return res.send({'status': 'error', 'message': 'missing hotels'});
            } else {
                return res.send(hotelMatch);
            }

    })(queryObject);
});