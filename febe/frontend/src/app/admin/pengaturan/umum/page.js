"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Upload } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function PengaturanUmumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [logoFile, setLogoFile] = useState(null);
  const [formData, setFormData] = useState({
    namaSekolah: "",
    alamat: "",
    email: "",
    noHp: "",
    tingkat: "",
  });

  // Fetch data from backend
  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const data = res.data;
      setFormData({
        namaSekolah: data.namaSekolah || "",
        alamat: data.alamat || "",
        email: data.email || "",
        noHp: data.noHp || "",
        tingkat: data.tingkat || "",
      });
    })
    .catch((err) => {
      console.log("Gagal fetch data user:", err);
    });
}, []);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const body = {
        ...formData,
        ...(logoFile ? { logo: logoFile.name } : {}),
      };

      const res = await fetch("http://localhost:5000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Server Error:", result);
        alert(`Gagal menyimpan: ${result.message}`);
        return;
      }

      alert("Pengaturan berhasil diperbarui!");
      console.log(result);
    } catch (err) {
      console.error("Gagal menyimpan:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };


  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: sidebarOpen ? "256px" : "64px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          bgcolor: "#f9fafb",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pengaturan
        </Typography>
        <Typography color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Kelola pengaturan sistem pendukung keputusan
        </Typography>

        <Card sx={{ mb: 5 }}>
          <CardHeader
            title="Pengaturan Umum"
            subheader="Kelola pengaturan umum aplikasi"
          />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              <TextField
                label="Nama Sekolah"
                name="namaSekolah"
                fullWidth
                value={formData.namaSekolah}
                onChange={handleChange}
              />
              <TextField
                label="Alamat Sekolah"
                name="alamat"
                fullWidth
                multiline
                rows={3}
                value={formData.alamat}
                onChange={handleChange}
              />
              <TextField
                label="Email Sekolah"
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Nomor Telepon Sekolah"
                name="noHp"
                fullWidth
                value={formData.noHp}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="tingkat" className="block mb-1 text-sm font-medium text-gray-700">
                  Jenis Sekolah
                </label>
                <select
                  id="tingkat"
                  name="tingkat"
                  value={formData.tingkat}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>Pilih jenis sekolah</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                </select>
              </div>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "#f0f0f0",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#888",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Logo
                </Box>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<Upload />}
                >
                  Unggah Logo
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleLogoChange}
                  />
                </Button>
                {logoFile && (
                  <Typography variant="body2">{logoFile.name}</Typography>
                )}
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifEmail}
                    onChange={() => setNotifEmail((prev) => !prev)}
                  />
                }
                label="Notifikasi Email"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Aktifkan notifikasi email untuk pemberitahuan penting
              </Typography>
            </Stack>
          </CardContent>
          <Box sx={{ p: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Simpan Perubahan
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
