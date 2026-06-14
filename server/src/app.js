import express from 'express';
import cookieParser from 'cookie-parser';
import { GlobalErrorHandler } from './shared/utils/global_error.js';
import helmet from 'helmet';
import cors from 'cors';
import Routes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin:[ "https://orufy-assignment-f33r.vercel.app","http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);

app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Productr backend',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', Routes);

//-------------------- 404 Handler ------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'No Route Found',
  });
});

//-----------------------global error handler-----------------------
app.use(GlobalErrorHandler);

export default app;
