const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error:"));
db.once('open', () => {
    console.log('database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]



const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd67b6fa95ffd2b8491881d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           price,
           geometry: { 
               type: 'Point', 
               coordinates: [
                   cities[random1000].longitude,
                   cities[random1000].latitude,
                ]
            },
           images: [
            {
             
              url: 'https://res.cloudinary.com/dxkmogknq/image/upload/v1609408881/YelpCamp/photo-1609377232795-609b7f46126d_hgi5ch.jpg',
              filename: 'YelpCamp/sjcoz1sghmaztqieisw3'
            }
          ],
           description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut iusto accusamus maxime numquam odit aliquid iste at perspiciatis, error ea vero, delectus, accusantium ducimus sapiente quidem sit aut unde. Nobis recusandae fuga sit, et fugit enim quae eos ipsam, facilis numquam delectus voluptate ut perspiciatis optio eum veniam inventore voluptates.',
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})