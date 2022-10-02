import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { Image } from './models/Image';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`)
});

const upload = multer(
  {
    storage,
    fileFilter: (req, file, cb) => {
      if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
      else cb(new Error('Invalid file type.'), false);
    },
    limits: {
      fileSize: 1024 * 1024 * 5 // 5mb
    }
  }
);
const app = express();
const PORT = 3100;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Conneted.')

    // Expose outside the image file
    app.use('/uploads', express.static("uploads"));
    app.post('/upload', upload.single("image"), async (req, res) => {
      console.log(req.file);
      await new Image({ key: req.file.filename, originFileName: req.file.originalname }).save();

      res.json({
        success: true,
        data: req.file
      });
    });

    app.listen(PORT, () => {
      console.log('Express server listening on PORT ' + PORT);
    });
  }).catch(err => {
    console.log(err);
  });