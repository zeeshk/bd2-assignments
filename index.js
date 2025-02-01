const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
//const hotel = require('./hotels');
const myModule = require('./myModule');


const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Exercise 7
app.get('/hotels', (req, res) => {
  res.json(myModule.hotels);
});

//Exercise 2
function sortByPricing(a,b,pricing){
  if(pricing == 'low-to-high'){
    return a.price - b.price;
  }else if(pricing == 'high-to-low'){
    return b.price - a.price;
  }    
}
app.get('/hotels/sort/pricing',(req,res)=>{
  let pricing = req.query.pricing;
  let hotels = myModule.hotels.slice();
  let result = hotels.sort((a,b)=>sortByPricing(a,b,pricing));
  return res.json(result);
});

//Exercise 2
function sortByRating(a,b,rating){
  if(rating == 'low-to-high'){
    return a.rating - b.rating;
  }else if(rating == 'high-to-low'){
    return b.rating - a.rating;
  }
}
app.get('/hotels/sort/rating',(req,res)=>{
  let rating = req.query.rating;
  let hotels = myModule.hotels.slice();
  let result = hotels.sort((a,b)=>sortByRating(a,b,rating));
  return res.json(result);
});

//Exercise 3
function sortByReview(a,b,review){
  if(review == 'least-to-most'){
    return a.review - b.review;
  }else if(review == 'most-to-least'){
    return b.review - a.review;
  }
}
app.get('/hotels/sort/review',(req,res)=>{
  let review = req.query.review;
  let hotels = myModule.hotels.slice();
  let result = hotels.sort((a,b)=>sortByReview(a,b,review));
  return res.json(result);
});

//Exercise 4
function filterByAmenity(hotelObj,amenity){
  return hotelObj.amenity == amenity;
}
app.get('/hotels/filter/amenity',(req,res)=>{
  let amenity = req.query.amenity;
  let hotels = myModule.hotels.slice();
  let result = hotels.filter((hotelObj)=>filterByAmenity(hotelObj,amenity));
  return res.json(result);
});

//Exercise 5
function filterByCountry(hotelObj,country){
  return hotelObj.country == country;
}
app.get('/hotels/filter/country',(req,res)=>{
  let country = req.query.country;
  let hotels = myModule.hotels.slice();
  let result = hotels.filter((hotelObj)=>filterByCountry(hotelObj,country));
  return res.json(result);
});

//Exercise 6
function filterByCategory(hotelObj,category){
  return hotelObj.category == category;
}
app.get('/hotels/filter/category/:category',(req,res)=>{
  let category = req.params.category;
  let hotels = myModule.hotels.slice();
  let result = hotels.filter((hotelObj)=>filterByCategory(hotelObj,category));
  return res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
