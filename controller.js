'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok('Aplikasi Res Api berjalan!',res)
}

// Menampilkan semua data mahasiswa

exports.tampilsemuamahasiswa = function(req, res){
    connection.query('SELECT * FROM mahasiswa', function(error,rows,fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        }
    })
}

// menampilkan semua data mahasiswa berdasarkan id

exports.tampilberdasarkanid=function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa=?',[id],
    function(error,rows,field){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res);
        }
    })
}

// Menambah data mahasiswa

exports.tambahMahasiswa = function(req,res){
    
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)',
    [nim,nama,jurusan],
    
    function(error,rows,field){
        if(error){
            connection.log(error);
        }else{
            response.ok('Berhasil Menambahkan Data',res);
        }
    })
}


// Mengubah data berdasarkan id

exports.ubahDatabyId = function(req, res) {
    
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama,jurusan,id],
        function(error,rows,field){
            if(error){
                connection.log(error);
            }else{
                response.ok('Berhasil Mengubah Data',res);
            }
    })
}


// Menghapus data berdasarkan id

exports.hapusMahasiswa = function(req, res){
    
    var id = req.body.id_mahasiswa;

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?',[id],
        function(error,rows,field){
            if(error){
                connection.log(error);
            }else{
                response.ok('Berhasil Menghapus Data',res);
            }
    })
}


// Menampilkan matakuliah group

exports.tampilgroupmatakuliah= function(req, res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa;',
        function(error,rows,field){
            if(error){
                connection.log(error);
            }else{
                response.oknested(rows,res);
            }
        })
}