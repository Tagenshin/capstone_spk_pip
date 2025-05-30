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
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { User } from "lucide-react";

export default function PengaturanPenggunaPage() {
  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Form state
  const [form, setForm] = useState({
    registrationApproval: "admin_approval",
    defaultRole: "pengguna",
    emailVerification: true,
    profileVisibility: false,
  });

  // Peran dan Izin data statis contoh
  const roles = [
    {
      name: "Administrator",
      description: "Akses penuh ke semua fitur sistem",
    },
    {
      name: "Manajer",
      description: "Akses ke sebagian besar fitur, tidak dapat mengubah pengaturan sistem",
    },
    {
      name: "Pengguna",
      description: "Akses terbatas ke fitur dasar",
    },
    {
      name: "Tamu",
      description: "Akses hanya untuk melihat",
    },
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
    alert("Perubahan pengaturan pengguna berhasil disimpan (simulasi)");
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

        {/* Tidak ada tabs */}

        {/* Pengaturan Pengguna */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Pengaturan Pengguna"
            subheader="Kelola pengaturan pengguna sistem"
            avatar={<User size={24} />}
          />
          <Divider />
          <CardContent>
            <Stack spacing={3} maxWidth={600}>
              <FormControl fullWidth>
                <InputLabel>Pendaftaran Pengguna</InputLabel>
                <Select
                  name="registrationApproval"
                  value={form.registrationApproval}
                  onChange={handleChange}
                  label="Pendaftaran Pengguna"
                >
                  <MenuItem value="admin_approval">Persetujuan Admin</MenuItem>
                  <MenuItem value="auto_approval">Otomatis</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Peran Default</InputLabel>
                <Select
                  name="defaultRole"
                  value={form.defaultRole}
                  onChange={handleChange}
                  label="Peran Default"
                >
                  <MenuItem value="admin">Administrator</MenuItem>
                  <MenuItem value="manager">Manajer</MenuItem>
                  <MenuItem value="pengguna">Pengguna</MenuItem>
                  <MenuItem value="tamu">Tamu</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Verifikasi Email</Typography>
                <Switch
                  name="emailVerification"
                  checked={form.emailVerification}
                  onChange={handleChange}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Wajibkan verifikasi email untuk pengguna baru
              </Typography>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Visibilitas Profil Pengguna</Typography>
                <Switch
                  name="profileVisibility"
                  checked={form.profileVisibility}
                  onChange={handleChange}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Izinkan pengguna melihat profil pengguna lain
              </Typography>
            </Stack>
          </CardContent>

          {/* Peran dan Izin */}
          <CardContent sx={{ borderTop: "1px solid #e0e0e0" }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Peran dan Izin
            </Typography>

            <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
              <Table size="small" aria-label="peran dan izin">
                <TableHead>
                  <TableRow>
                    <TableCell>Peran</TableCell>
                    <TableCell>Deskripsi</TableCell>
                    <TableCell align="right">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((role, index) => (
                    <TableRow key={index}>
                      <TableCell>{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined">
                          Edit Izin
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>

          <CardContent sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleSave}>
              Simpan Perubahan
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
