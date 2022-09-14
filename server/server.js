import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';

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

// Expose outside the image file
app.use('/uploads', express.static("uploads"));

app.post('/upload', upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    success: true,
    data: req.file
  });
});

app.listen(PORT, () => {
  console.log('Express server listening on PORT ' + PORT);
});
