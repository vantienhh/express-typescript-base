import mongoose from 'mongoose';

export const mongooseConnect = () => {
  const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs';

  void mongoose.connect(dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
    // server: {
    //   poolSize: 10,
    //   useMongoClient: true,
    //   auto_reconnect: true
    // }
  });
};
