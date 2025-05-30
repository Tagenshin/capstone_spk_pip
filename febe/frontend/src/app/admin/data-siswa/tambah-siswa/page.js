"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ArrowLeft, Loader2 } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function AddStudentPage() {
  const router = useRouter();

  // Sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    nisn: "",
    gender: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    class: "",
    parentName: "",
    parentOccupation: "",
    parentIncome: "",
    familyMembers: "",
    distance: "",
    transportation: "",
    hasKIP: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Form input change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Submit handler (simulation)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Data siswa berhasil ditambahkan (simulasi).");
      router.push("/admin/data-siswa");
    }, 1500);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          ml: sidebarOpen ? "256px" : "64px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          bgcolor: "#f5f7fa",
        }}
      >
        {/* Header & Breadcrumb */}
        <Box sx={{ mb: 4, maxWidth: 900 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Tambah Data Siswa
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Tambahkan data siswa baru untuk seleksi penerima bantuan PIP
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Link href="/admin/data-siswa" passHref legacyBehavior>
              <Button
                component="a"
                variant="outlined"
                size="small"
                startIcon={<ArrowLeft />}
              >
                Kembali
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 900,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
          noValidate
          autoComplete="off"
        >
          {/* Data Pribadi Siswa */}
          <Card sx={{ mb: 4, boxShadow: "none" }}>
            <CardHeader
              title="Data Pribadi Siswa"
              subheader="Masukkan informasi pribadi siswa"
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <TextField
                  label="Nama Lengkap"
                  name="name"
                  placeholder="Nama lengkap siswa"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="NISN"
                  name="nisn"
                  placeholder="Nomor Induk Siswa Nasional"
                  value={formData.nisn}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <FormControl fullWidth required>
                  <InputLabel>Jenis Kelamin</InputLabel>
                  <Select
                    label="Jenis Kelamin"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                    <MenuItem value="Perempuan">Perempuan</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Kelas</InputLabel>
                  <Select
                    label="Kelas"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                  >
                    <MenuItem value="X IPA 1">X IPA 1</MenuItem>
                    <MenuItem value="X IPA 2">X IPA 2</MenuItem>
                    <MenuItem value="X IPA 3">X IPA 3</MenuItem>
                    <MenuItem value="X IPS 1">X IPS 1</MenuItem>
                    <MenuItem value="X IPS 2">X IPS 2</MenuItem>
                    <MenuItem value="XI IPA 1">XI IPA 1</MenuItem>
                    <MenuItem value="XI IPA 2">XI IPA 2</MenuItem>
                    <MenuItem value="XI IPS 1">XI IPS 1</MenuItem>
                    <MenuItem value="XI IPS 2">XI IPS 2</MenuItem>
                    <MenuItem value="XII IPA 1">XII IPA 1</MenuItem>
                    <MenuItem value="XII IPA 2">XII IPA 2</MenuItem>
                    <MenuItem value="XII IPS 1">XII IPS 1</MenuItem>
                    <MenuItem value="XII IPS 2">XII IPS 2</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Tanggal Lahir"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Tempat Lahir"
                  name="birthPlace"
                  placeholder="Tempat lahir"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Alamat"
                  name="address"
                  placeholder="Alamat lengkap"
                  value={formData.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  required
                />
              </Box>
            </CardContent>
          </Card>

          {/* Data Keluarga */}
          <Card sx={{ mb: 4, boxShadow: "none" }}>
            <CardHeader
              title="Data Keluarga"
              subheader="Masukkan informasi keluarga siswa"
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <TextField
                  label="Nama Orang Tua/Wali"
                  name="parentName"
                  placeholder="Nama orang tua/wali"
                  value={formData.parentName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <FormControl fullWidth>
                  <InputLabel>Pekerjaan Orang Tua/Wali</InputLabel>
                  <Select
                    label="Pekerjaan Orang Tua/Wali"
                    name="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={handleChange}
                  >
                    <MenuItem value="pns">PNS</MenuItem>
                    <MenuItem value="swasta">Karyawan Swasta</MenuItem>
                    <MenuItem value="wiraswasta">Wiraswasta</MenuItem>
                    <MenuItem value="petani">Petani</MenuItem>
                    <MenuItem value="buruh">Buruh</MenuItem>
                    <MenuItem value="tidak-bekerja">Tidak Bekerja</MenuItem>
                    <MenuItem value="lainnya">Lainnya</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Penghasilan Orang Tua/Wali per Bulan</InputLabel>
                  <Select
                    label="Penghasilan Orang Tua/Wali per Bulan"
                    name="parentIncome"
                    value={formData.parentIncome}
                    onChange={handleChange}
                  >
                    <MenuItem value="<500000">Kurang dari Rp 500.000</MenuItem>
                    <MenuItem value="500000-1000000">Rp 500.000 - Rp 1.000.000</MenuItem>
                    <MenuItem value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</MenuItem>
                    <MenuItem value="2000000-3000000">Rp 2.000.000 - Rp 3.000.000</MenuItem>
                    <MenuItem value="3000000-5000000">Rp 3.000.000 - Rp 5.000.000</MenuItem>
                    <MenuItem value=">5000000">Lebih dari Rp 5.000.000</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Jumlah Anggota Keluarga"
                  name="familyMembers"
                  type="number"
                  placeholder="Jumlah anggota keluarga"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Informasi Tambahan */}
          <Card sx={{ boxShadow: "none" }}>
            <CardHeader
              title="Informasi Tambahan"
              subheader="Masukkan informasi tambahan untuk seleksi PIP"
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Jarak Rumah ke Sekolah (km)"
                  name="distance"
                  type="number"
                  placeholder="Jarak dalam kilometer"
                  value={formData.distance}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: 0, step: 0.1 }}
                />
                <FormControl fullWidth>
                  <InputLabel>Transportasi ke Sekolah</InputLabel>
                  <Select
                    label="Transportasi ke Sekolah"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                  >
                    <MenuItem value="jalan-kaki">Jalan Kaki</MenuItem>
                    <MenuItem value="sepeda">Sepeda</MenuItem>
                    <MenuItem value="motor">Sepeda Motor</MenuItem>
                    <MenuItem value="angkutan-umum">Angkutan Umum</MenuItem>
                    <MenuItem value="mobil">Mobil Pribadi</MenuItem>
                    <MenuItem value="lainnya">Lainnya</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasKIP}
                      onChange={handleCheckboxChange}
                      name="hasKIP"
                    />
                  }
                  label="Memiliki Kartu Indonesia Pintar (KIP)"
                />
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => router.push("/admin/data-siswa")}
                sx={{ mr: 2 }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading ? <Loader2 className="animate-spin" /> : null}
              >
                {isLoading ? "Menyimpan..." : "Simpan Data"}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
