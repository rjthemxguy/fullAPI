const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.evn' });

const Bootcamp = require('./models/Bootcamp');

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://rj:Hapkido@cluster0.fegx2.mongodb.net/devCamp?retryWrites=true&w=majority");

    console.log("Seeder Connected!!!".green)
}
  
  // Read JSON files
  const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8')
  );

  const importData = async () => {
    try {
      await Bootcamp.create(bootcamps);
      //await Course.create(courses);
      //await User.create(users);
      //await Review.create(reviews);
  
      console.log('Data Imported...'.green.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  
  // Delete data
  const deleteData = async () => {
    try {
      await Bootcamp.deleteMany();
      //await Course.deleteMany();
      //await User.deleteMany();
      //await Review.deleteMany();
      console.log('Data Destroyed...'.red.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }