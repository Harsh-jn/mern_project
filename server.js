import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import flightRouter from './routes/flightroutes.js'
import hotelRouter from './routes/hotelroutes.js'
import tourRouter from './routes/tourroutes.js'

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));}

app.use('/api/v1/flight' , flightRouter);
app.use('/api/v1/hotel',hotelRouter);
app.use('/api/v1/tour',tourRouter);



const port = process.env.PORT || 5100;

try{
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
}catch (error){
    console.log(error);
    process.exit(1);
}

