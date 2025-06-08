const Boom = require('@hapi/boom');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { inputSiswa, getSiswa, getSiswabyId, updateSiswa, deleteSiswa } = require('../services/siswa.service');

const inputSiswaHandler = async (request, h) => {
    try {
        const user = request.auth.credentials;
        const payload = request.payload;

        const siswa = await inputSiswa(user.id, payload);

        return h.response({ message: 'Data berhasil disimpan', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data siswa');
    }
};

const GetSiswa = async (request, h) => {
    try {
        const user = request.auth.credentials;
        const sekolah = await getSiswa(user.id);

        return h.response({ message: 'Data berhasil disimpan', data: sekolah }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data sekolah');
    }
}

const GetSiswaById = async (request, h) => {
    try {
        const siswa = await getSiswabyId(request.params.id);

        return h.response({ message: 'Data siswa berhasil didapatkan', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data siswa');
    }
}

const UpdateSiswa = async (request, h) => {
    try {
        const payload = request.payload;

        const siswa = await updateSiswa(request.params.id, payload);

        return h.response({ message: 'Data berhasil disimpan', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal input data sekolah');
    }
}

const DeleteSiswa = async (request, h) => {
    try {
        const siswa = await deleteSiswa(request.params.id);

        return h.response({ message: 'Berhasil menghapus data', data: siswa }).code(201);
    } catch (err) {
        console.error(err);
        throw Boom.internal('Gagal menghapus data siswa');
    }
}

const importSiswaExcelHandler = async (request, h) => {
    const user = request.auth.credentials;

    const file = request.payload.file;

    if (!file || !file.hapi) {
        return Boom.badRequest('File tidak ditemukan');
    }
    try {
        // Baca file dari buffer langsung
        const workbook = XLSX.read(file._data, { type: 'buffer' });

        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        for (const row of data) {

            const siswa = {
                namaSiswa: row['Nama'],
                alatTransportasi: row['Alat Transportasi'],
                pekerjaanOrtu: row['Pekerjaan Orang Tua'],
                penghasilan: row['Penghasilan Orang Tua'].toString(),
                tanggungan: row['Jumlah Tanggungan'],
                statusKIP: row['Pemilik KIP'],
                statusPKH: row['Pemilik KPS'],
            };

            if (Object.values(siswa).some(val => val === undefined)) {
                console.warn('Baris tidak lengkap, dilewati:', row);
                continue;
            }

            await inputSiswa(user.id, siswa);
        }

        return h.response({ message: 'Data siswa berhasil diimpor.' }).code(201);
    } catch (err) {
        console.error('Gagal parsing Excel:', err);
        return Boom.internal('Terjadi kesalahan saat mengimpor file');
    }
};

module.exports = { inputSiswaHandler, GetSiswa, GetSiswaById, UpdateSiswa, DeleteSiswa, importSiswaExcelHandler };
