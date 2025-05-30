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
  OutlinedInput,
  Switch,
  Typography,
  Stack,
} from "@mui/material";
import { Database, RefreshCcw } from "lucide-react";

export default function PengaturanDatabasePage() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Form state
  const [formData, setFormData] = useState({
    host: "localhost",
    port: "3306",
    databaseName: "pip_decision_system",
    username: "admin",
    password: "********",
    backupOtomatis: true,
  });

  // Handler toggle backup otomatis
  const handleToggleBackup = () => {
    setFormData((prev) => ({
      ...prev,
      backupOtomatis: !prev.backupOtomatis,
    }));
  };

  // Handler input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simulasi fungsi uji koneksi database
  const handleUjiKoneksi = () => {
    alert("Fungsi Uji Koneksi Database belum diimplementasikan");
  };

  // Simulasi fungsi simpan perubahan
  const handleSimpan = () => {
    alert("Perubahan berhasil disimpan (simulasi)");
  };

  // Simulasi fungsi backup dan restore
  const handleBackup = () => {
    alert("Backup database berhasil (simulasi)");
  };

  const handleRestore = () => {
    alert("Restore database berhasil (simulasi)");
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
        {/* Header & Breadcrumb */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pengaturan
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Kelola pengaturan sistem pendukung keputusan
        </Typography>

        {/* Card Pengaturan Database */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Pengaturan Database"
            subheader="Kelola pengaturan database sistem"
            avatar={<Database size={24} />}
          />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="host">Host Database</InputLabel>
                <OutlinedInput
                  id="host"
                  name="host"
                  value={formData.host}
                  onChange={handleChange}
                  label="Host Database"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="port">Port Database</InputLabel>
                <OutlinedInput
                  id="port"
                  name="port"
                  value={formData.port}
                  onChange={handleChange}
                  label="Port Database"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="databaseName">Nama Database</InputLabel>
                <OutlinedInput
                  id="databaseName"
                  name="databaseName"
                  value={formData.databaseName}
                  onChange={handleChange}
                  label="Nama Database"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="username">Username Database</InputLabel>
                <OutlinedInput
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  label="Username Database"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password Database</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Password Database"
                />
              </FormControl>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Backup Otomatis</Typography>
                <Switch
                  checked={formData.backupOtomatis}
                  onChange={handleToggleBackup}
                />
              </Stack>

              <Typography color="text.secondary" variant="body2">
                Lakukan backup database secara otomatis setiap hari
              </Typography>

              <Button
                variant="outlined"
                onClick={handleUjiKoneksi}
                startIcon={<RefreshCcw />}
              >
                Uji Koneksi
              </Button>
            </Stack>
          </CardContent>

          <CardContent sx={{ borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Backup & Restore
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<Database />}
                onClick={handleBackup}
                fullWidth
              >
                Backup Database
              </Button>
              <Button
                variant="outlined"
                startIcon={<Database />}
                onClick={handleRestore}
                fullWidth
              >
                Restore Database
              </Button>
            </Stack>
          </CardContent>

          <CardContent sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSimpan}>
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
