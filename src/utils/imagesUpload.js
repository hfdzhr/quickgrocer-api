import multer from 'multer';

// Konfigurasi penyimpanan dan penamaan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images'); // Direktori penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nama file
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Ekspor instansi multer dengan konfigurasi di atas
const imagesUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

// Ekspor middleware single yang dapat digunakan di tempat lain
export { imagesUpload };
