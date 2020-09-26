import mongoose from 'mongoose';

export const mongooseConnect = (): void => {
  const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs';

  void mongoose.connect(dbUri, {
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
