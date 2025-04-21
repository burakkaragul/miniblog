const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Blog ekle 
router.post('/add', async (req, res) => {
  const { title, content } = req.body;

  // Veri eksikse hata
  if (!title || !content) {
    return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });
  }

  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.status(201).json({ message: 'Blog başarıyla eklendi.' });
  } catch (err) {
    res.status(500).json({ message: 'Blog eklenirken hata oluştu.', error: err });
  }
});

//  Blog güncelleme 
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const updated = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true } // Güncellenmiş halini döndür
      );
  
      if (!updated) {
        return res.status(404).json({ message: 'Blog bulunamadı.' });
      }
  
      res.status(200).json({ message: 'Blog güncellendi.', blog: updated });
    } catch (err) {
      res.status(500).json({ message: 'Güncelleme hatası.', error: err });
    }
  });

  //  Blog silme 
router.delete('/:id', async (req, res) => {
    try {
      const deleted = await Blog.findByIdAndDelete(req.params.id);
  
      if (!deleted) {
        return res.status(404).json({ message: 'Blog bulunamadı.' });
      }
  
      res.status(200).json({ message: 'Blog silindi.' });
    } catch (err) {
      res.status(500).json({ message: 'Silme hatası.', error: err });
    }
  });
  

// Listeele
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Yeniden eskiye
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Bloglar alınamadı.', error: err });
  }
});

module.exports = router;
