const express = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors')
const path = require('path');
const database = require('./config/dbConnect.js');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://smartdsm.com.bd',
  'http://smartdsm.com.bd'
];

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')));


const userRoutes = require('./routes/auth.routes.js');
// const cartRoutes = require('./routes/cart.routes');
const categoryRoutes = require('./routes/categories.routes');
const brandRoutes = require('./routes/brand.routes.js');
const productRoutes = require('./routes/product.routes');
const vendorRoutes = require('./routes/vendor.routes.js');
// const reviewRoutes = require('./routes/reviews.routes');
// const wishlistRoutes = require('./routes/wishlist.routes');
const siteDataRoutes = require('./routes/siteData.route');



app.use('/api/v1/auth', userRoutes);
// app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/brands', brandRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/vendors', vendorRoutes);
// app.use('/api/v1/reviews', reviewRoutes);
// app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/siteData', siteDataRoutes);


if (process.env.NODE_ENV === 'production') {
    const next = require('next'); 
    const nextApp = next({ dev: false, dir: path.join(__dirname, '..') });
    const handle = nextApp.getRequestHandler();
    nextApp.prepare().then(() => {
        app.all('*', (req, res) => {
            return handle(req, res);
        });
        app.listen(PORT, () => {
            console.log(`Production Server listening on port ${PORT}`);
        });
    }).catch((ex) => {
        console.error('Error preparing Next.js in production:', ex.stack);
        process.exit(1);
    });
} else {
    app.listen(PORT, () => {
        console.log(`Development Server listening on port ${PORT}`);
        console.log('mySql connected');
    });
}
module.exports = database