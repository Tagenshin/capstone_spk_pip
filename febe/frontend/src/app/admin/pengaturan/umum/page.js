"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  Switch,
  TextField,
  Typography,
  MenuItem,
  Select,
  Slider,
  Stack,
} from "@mui/material";
import { Upload } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function PengaturanUmumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [theme, setTheme] = useState("Terang");
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [fontSize, setFontSize] = useState(14);

  const [logoFile, setLogoFile] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
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
        {/* Breadcrumb */}
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 1 }}
        >
          Dashboard &gt; Pengaturan
        </Typography>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pengaturan
        </Typography>
        <Typography color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Kelola pengaturan sistem pendukung keputusan
        </Typography>

        {/* Form Umum */}
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
                fullWidth
                defaultValue="SMA Negeri 1 Contoh"
              />
              <TextField
                label="Alamat Sekolah"
                fullWidth
                multiline
                rows={3}
                defaultValue="Jl. Contoh No. 123, Kota Contoh, Provinsi Contoh"
              />
              <TextField
                label="Email Sekolah"
                fullWidth
                defaultValue="info@sman1contoh.sch.id"
              />
              <TextField
                label="Nomor Telepon Sekolah"
                fullWidth
                defaultValue="(021) 1234567"
              />

              {/* Logo Upload */}
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
                    userSelect: "none",
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

              {/* Notifikasi Email */}
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
            <Button variant="contained" size="large">
              Simpan Perubahan
            </Button>
          </Box>
        </Card>

      </Box>
    </Box>
  );
}
