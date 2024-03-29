var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

// Daftarkan menu registrasi 
router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);

// Alamat yang perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanrahasia);

module.exports =router;
