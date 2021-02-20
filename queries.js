// see all databases
show databases

// using a database
// use <database>
use sample_airbnb

// check current active database
db

// see all collections
show collections

// display all documents from a collection
// db.<collection>.find()
db.listingsAndReviews.find();

// prettify the output
db.listingsAndReviews.find().pretty();

// projecting (criteria -keys / projections)
// select which keys to display 
db.listingsAndReviews.find({},{
    name: 1,
    address: 1
}).pretty()

// project a key of an embeded document
db.listingsAndReviews.find({},{
    name: 1,
    'address.country': 1
}).pretty()

// finding by criteria
db.listingsAndReviews.find({
    beds:5
},{
    name: 1,
    beds: 1
}).pretty()

//  find by a key in an embedded document aka sub-document aka nested object
//  find all listings in Brazil
db.listingsAndReviews.find({
    'address.country': 'Brazil'
},{
    name: 1,
    'address.country': 1
}).pretty()

// multiple criteria; find listings that have 5 beds and 5 bedrooms
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5
},{
    name: 1,
    beds: 1,
    bedrooms: 1
}).pretty()

// find listings with 5 beds and 5 bedrooms in Brazil
db.listingsAndReviews.find({
    'address.country': 'Brazil', 
    beds: 5,
    bedrooms: 5
},{
    name: 1,
    'address.country': 1,
    beds: 1,
    bedrooms: 1
}).pretty()

// we want to find listings that have more than 3 beds
db.listingsAndReviews.find({
    beds: {
        '$gt': 3
    }
},{
    name: 1,
    beds: 1
}).pretty()

// find listings less thab 4 beds
db.listingsAndReviews.find({
    beds: {
        '$lt': 4
    }
},{
    name: 1,
    beds: 1
}).pretty()

// find listings that have 4 to 8 beds
db.listingsAndReviews.find({
    beds: {
        '$gte': 4,
        '$lte': 8
    }
},{
    name: 1,
    beds: 1
}).pretty()

// find listings that have 4 to 8 beds in brazil
db.listingsAndReviews.find({
    'address.country' : 'Brazil',
    beds: {
        '$gte': 4,
        '$lte': 8
    }
},{
    name: 1,
    beds: 1,
    'address.country': 1
}).pretty()

//find all listings that allows pets
db.listingsAndReviews.find({
    'amenities' : 'Pets allowed'
},{
    name: 1,
    amenities: 1
}).pretty()

//find all listings that allows pets & pets lives on the property
db.listingsAndReviews.find({
    'amenities' : { 
        '$all' : ['Pets allowed', 'Pets live on this property', 'Dog(s)','Cat(s)']
    }
},{
    name: 1,
    amenities: 1
}).pretty()

//find # of listing with criterias
db.listingsAndReviews.find({
    'amenities' : { 
        '$all' : ['Pets allowed', 'Pets live on this property', 'Dog(s)','Cat(s)']
    }
},{
    name: 1,
    amenities: 1
}).count()

//find all listings that has dogs OR cats listed in amenities
db.listingsAndReviews.find({
    'amenities' : { 
        '$in' : ['Dog(s)','Cat(s)']
    }
},{
    name: 1,
    amenities: 1
}).pretty()

// select document by id
db.listingsAndReviews.find({
    '_id' : '11567997'
},{}).pretty()

// select a document by object ID
use sample_mflix
db.movies.find({
    '_id' : ObjectId('573a1390f29313caabcd4135')
}).pretty()

// how to find a substring
// look for all listings that have the word 'spacious' in the name
db.listingsAndReviews.find({
    'name' : {
        '$regex' : 'spacious', '$options' : 'i'
    }
}, {
    'name' : 1
})

// compound criteria AND/OR ***
db.listingsAndReviews.find({
    'name' : {
        '$regex' : 'spacious', '$options' : 'i',
        },
    'address.country' : 'Brazil'
}, {
    'name' : 1,
    'address.country' : 1
}).pretty()

// OR
db.listingsAndReviews.find({
    '$or' : [
        {
            'address.country' : 'Brazil'
        },
        {
            'address.country' : 'Canada'
        }
    ]
}, {
    'name' : 1,
    'address.country': 1
}).pretty()

// has more than 3beds
db.listingsAndReviews.find({
    '$or' : [
        {
            'address.country' : 'Brazil'
        },
        {
            'address.country' : 'Canada',
            'beds' : {
                '$gt' : 3
            }
        }
    ]
}, {
    'name' : 1,
    'address.country' : 1,
    'beds' : 1
}).pretty()

// mongoLAB P1
// Q1

use sample_restaurants
db.restaurants.find({
    'cuisine' : 'Hamburgers'
},{
    name : 1,
    cuisine : 1
}).pretty()

// Q2
db.restaurants.find({
    'cuisine' : 'American',
    'borough' : 'Bronx'
},{
    name : 1,
    cuisine : 1,
    borough : 1
}).pretty()

// Q3
db.restaurants.find({
    'address.street' : 'Stillwell Avenue',
},{
    name : 1,
    'address.street' : 1
}).pretty()

// // mongoLAB P2
use sample_mflix
// Q1a
db.movies.find().count()

// Q1b
db.movies.find({
    'year' : {
        '$lt' : 2000
    }
},{}).count()

// Q1c
db.movies.find({
    'countries' : 'USA'
},{
    'title' : 1,
    'countries' : 1
}).pretty().limit(10)

// Q1d
db.movies.find({
    'countries' : {
        '$ne' : 'USA'
    }
},{
    'title' : 1,
    'countries' : 1
}).pretty().limit(10)

db.movies.find({
    'countries' : {
        '$nin' : ['USA']
    }
},{
    'title' : 1,
    'countries' : 1
}).pretty().limit(10)

// Q1e
db.movies.find({
    'awards.wins' : {
        '$gte' : 3
    }
},{
    'title' : 1,
    'awards.wins' : 1
}).pretty()

// Q1f
db.movies.find({
    'awards.nominations' : {
        '$gte' : 3
    }
},{
    'title' : 1,
    'awards.nominations' : 1
}).pretty()

// Q1g
db.movies.find({
    'cast' : 'Tom Cruise'
},{
    'title' : 1,
    'cast' : 1
}).pretty()

// Q1h
db.movies.find({
    'directors' : 'Charles Chaplin'
},{
    'title' : 1,
    'directors' : 1
}).pretty()

// mongoLAB P3
use sample_weatherdata
// Q1
db.data.find({
    'wind.speed.rate' : {
        '$gt' : 5
    }
},{}).count()

// Q2
db.data.find({
    'wind.speed.rate' : {
        '$gt' : 5,
        '$ne' : 999.9
    }
},{}).count()

// mongoLAB P3
use sample_supplies

// Q1
db.sales.find({
    'items.name' : 'laptop'
},{}).count()

// Q2
db.sales.find({
    'items.name' : 'laptop',
    'storeLocation' : 'Denver'
},{}).count()

// Q3
db.sales.find({
    'storeLocation' : {
        '$in' : ['Denver', 'Seattle']
    }
},{}).pretty()

// Q4
db.sales.find({
    'customer.email' : 'beecho@wic.be'
},{
    'storeLocation' : 1
}).pretty()

// Q5
// Q6