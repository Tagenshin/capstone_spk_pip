"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { ArrowLeft, Save } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function StudentInputPage() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Dummy options
  const incomeOptions = [
    "Rp. 500.000 - Rp. 1.500.000",
    "Rp. 1.500.000 - Rp. 3.000.000",
    "Rp. 3.000.000 - Rp. 5.000.000",
    "> Rp. 5.000.000",
  ];

  const occupationOptions = [
    "Wirausaha",
    "Peternak",
    "Petani",
    "Buruh",
    "Lainnya"
  ];

  const transportationOptions = [
    "Jalan kaki",
    "Sepeda motor",
  ];

  const [statusKIP, setStatusKIP] = useState("");
  const [statusKPS, setStatusKPS] = useState("");
  const [tanggungan, setTanggungan] = useState("");

  const handleStatusKIPChange = (event) => {
    setStatusKIP(event.target.value);
  };

  const handleStatusKPSChange = (event) => {
    setStatusKPS(event.target.value);
  };

  const handleTanggunganChange = (event) => {
    setTanggungan(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Navbar */}
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Input Data Siswa
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Tambahkan data siswa baru ke dalam sistem
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="/admin/data-siswa" passHref legacyBehavior={false}>
              <Button variant="outlined" startIcon={<ArrowLeft />} component="a">
                Kembali
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Card Form */}
        <Card>
          <CardContent>
            {/* Data Input */}
            <Box component="form" noValidate autoComplete="off" sx={{ display: "grid", gap: 2 }}>
              {/* Alat Transportasi */}
              <FormControl fullWidth required>
                <InputLabel>Alat Transportasi</InputLabel>
                <Select defaultValue="" label="Alat Transportasi" name="transportation">
                  {transportationOptions.map((transport) => (
                    <MenuItem key={transport} value={transport}>
                      {transport}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Pekerjaan Orang Tua */}
              <FormControl fullWidth required>
                <InputLabel>Pekerjaan Orang Tua</InputLabel>
                <Select defaultValue="" label="Pekerjaan Orang Tua" name="parent_occupation">
                  {occupationOptions.map((occ) => (
                    <MenuItem key={occ} value={occ}>
                      {occ}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Penghasilan Orang Tua */}
              <FormControl fullWidth required>
                <InputLabel>Penghasilan Orang Tua</InputLabel>
                <Select defaultValue="" label="Penghasilan Orang Tua" name="parent_income">
                  {incomeOptions.map((income) => (
                    <MenuItem key={income} value={income}>
                      {income}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Status KIP */}
              <FormControl fullWidth required>
                <InputLabel>Status KIP</InputLabel>
                <Select value={statusKIP} onChange={handleStatusKIPChange} label="Status KIP" name="status_kip">
                  <MenuItem value="">Pilih Status Memiliki KIP</MenuItem>
                  <MenuItem value="memiliki_kip">Ya</MenuItem>
                  <MenuItem value="tidak_memiliki_kip">Tidak</MenuItem>
                </Select>
              </FormControl>

              {/* Status KPS */}
              <FormControl fullWidth required>
                <InputLabel>Status KPS</InputLabel>
                <Select value={statusKPS} onChange={handleStatusKPSChange} label="Status KPS" name="status_kps">
                  <MenuItem value="">Pilih Status Memiliki KPS</MenuItem>
                  <MenuItem value="memiliki_kps">Ya</MenuItem>
                  <MenuItem value="tidak_memiliki_kps">Tidak</MenuItem>
                </Select>
              </FormControl>

              {/* Jumlah Tanggungan (Dropdown) */}
              <FormControl fullWidth required>
                <InputLabel>Jumlah Tanggungan</InputLabel>
                <Select value={tanggungan} onChange={handleTanggunganChange} label="Jumlah Tanggungan" name="siblings">
                  <MenuItem value="">Pilih Jumlah Tanggungan</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="lebih_dari_3">Lebih dari 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>

          {/* Footer Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Button variant="outlined" onClick={() => alert("Batalkan input data")}>
              Batal
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={() => alert("Simpan data siswa (fungsi belum dibuat)")}
            >
              Simpan Data
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
