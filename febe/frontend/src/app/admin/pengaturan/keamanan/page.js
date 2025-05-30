"use client";

import { useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { ShieldCheck } from "lucide-react";

export default function PengaturanKeamananPage() {
  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Form state
  const [form, setForm] = useState({
    timeout: "30",
    passwordPolicy: "kuat",
    loginAttempts: "5",
    twoFactorAuth: false,
    logActivity: true,
    notifLogin: true,
    notifLoginFailed: true,
    notifPasswordChange: true,
  });

  const passwordPolicyOptions = [
    { value: "kuat", label: "Kuat (minimal 10 karakter, huruf, angka, dan simbol)" },
    { value: "sedang", label: "Sedang (minimal 8 karakter, huruf dan angka)" },
    { value: "lemah", label: "Lemah (minimal 6 karakter)" },
  ];

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    alert("Perubahan keamanan berhasil disimpan (simulasi)");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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
        <Typography color="text.secondary" gutterBottom>
          Kelola pengaturan sistem pendukung keputusan
        </Typography>

        {/* Pengaturan Keamanan */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Pengaturan Keamanan"
            subheader="Kelola pengaturan keamanan sistem"
            avatar={<ShieldCheck size={24} />}
          />
          <Divider />
          <CardContent>
            <Stack spacing={3} maxWidth={600}>
              <TextField
                label="Timeout Sesi (menit)"
                name="timeout"
                type="number"
                value={form.timeout}
                onChange={handleChange}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Kebijakan Password</InputLabel>
                <Select
                  name="passwordPolicy"
                  value={form.passwordPolicy}
                  onChange={handleChange}
                  label="Kebijakan Password"
                >
                  {passwordPolicyOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Batas Percobaan Login"
                name="loginAttempts"
                type="number"
                value={form.loginAttempts}
                onChange={handleChange}
                fullWidth
              />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Autentikasi Dua Faktor</Typography>
                <Switch
                  name="twoFactorAuth"
                  checked={form.twoFactorAuth}
                  onChange={handleChange}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Aktifkan autentikasi dua faktor untuk keamanan tambahan
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Log Aktivitas</Typography>
                <Switch
                  name="logActivity"
                  checked={form.logActivity}
                  onChange={handleChange}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Catat semua aktivitas pengguna dalam sistem
              </Typography>
            </Stack>
          </CardContent>

          {/* Pengaturan Notifikasi */}
          <CardContent sx={{ borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Pengaturan Notifikasi
            </Typography>

            <Stack spacing={3} maxWidth={600}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Notifikasi Login</Typography>
                <Switch
                  name="notifLogin"
                  checked={form.notifLogin}
                  onChange={handleChange}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Notifikasi Login Gagal</Typography>
                <Switch
                  name="notifLoginFailed"
                  checked={form.notifLoginFailed}
                  onChange={handleChange}
                />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Notifikasi Perubahan Password</Typography>
                <Switch
                  name="notifPasswordChange"
                  checked={form.notifPasswordChange}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
          </CardContent>

          <CardContent sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSave} startIcon={<ShieldCheck />}>
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
