import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import app from './app';

import constants from './config/constants';

mongoose.connect(constants.mongourl).then((con) => {
  console.log('database is connected successfully');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`server is running on port ${PORT}`);
});
