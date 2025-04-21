const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blog');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('App düzeyinde route çalışıyor!');
  });

// Test route
app.get('/', (req, res) => {
  res.send('Sunucu çalışıyor!');
});

// Blog rotaları
app.use('/api/blog', blogRoutes);

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB'ye başarıyla bağlanıldı"))
  .catch((err) => console.log("MongoDB bağlantısı hatası:", err));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
