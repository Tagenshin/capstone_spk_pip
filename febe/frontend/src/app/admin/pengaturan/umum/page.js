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
import Swal from "sweetalert2";

export default function PengaturanUmumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
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

  fetch("https://pip-clasification-app-production.up.railway.app/user", {
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
      setLoading(true);
      const token = localStorage.getItem("token");

      const body = {
        ...formData,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log("Server Error:", result);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Gagal menyimpan pengaturan!",
          showConfirmButton: false,
          timer: 1500,
        })
        return;
      }

      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Pengaturan berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan pengaturan!",
        showConfirmButton: false,
        timer: 1500,
      })
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
            </Stack>
          </CardContent>
          <Box sx={{ p: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" size="large" onClick={handleSubmit}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
