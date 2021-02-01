const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {useNewUrlParser:true , useCreateIndex:true , useUnifiedTopology:true});

const db =mongoose.connection;
db.on("error", console.error.bind(console,"Connection Error"));
db.once("open",() =>{ console.log("Database Connected"); });

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          author: '601651546a8c08643c1bfa4b',
          location: `${cities[random].city}, ${cities[random].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          image: "https://source.unsplash.com/collection/483251",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum delectus fugit eos sed dolore a quam velit enim, architecto sapiente fuga quas ad assumenda soluta id ipsa porro maxime accusamus.",
          price
        });
        await camp.save();
    }
}
seedDB().then( ()=>{mongoose.connection.close();})