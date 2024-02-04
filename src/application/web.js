import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { publicRouter } from '../routes/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { router } from '../routes/api.js';
import { imagesUpload } from '../utils/imagesUpload.js';

const web = express();
web.use(cors());

// Enable Cors

// parse application/x-www-form-urlencoded
web.use(bodyParser.urlencoded({ extended: true }));

// Image Upload Middleware
web.use(imagesUpload);

// parse application/json
web.use(bodyParser.json());

// Router without auth
web.use(publicRouter);

// Router with auth
web.use(router);

web.use(errorMiddleware);

export { web };
