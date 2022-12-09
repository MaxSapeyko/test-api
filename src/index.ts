import 'dotenv/config';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const app = express();

const databaseName = process.env.DATABASE_NAME;

app.use(
  cors({
    credentials: true,
    origin: [/localhost:\d+$/, /\.vercel\.app$/, /\.herokuapp\.com$/],
    allowedHeaders: 'origin, content-type, accept',
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use('/users', routes.users);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://unicode:yslY5G8yagSMk9H7@users.lpuxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
};

start();
