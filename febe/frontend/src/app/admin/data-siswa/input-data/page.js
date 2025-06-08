"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
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
import { useSearchParams } from "next/navigation";

export default function StudentInputPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  // Form state
  const [formData, setFormData] = useState({
    namaSiswa: "",
    alatTransportasi: "",
    pekerjaanOrtu: "",
    penghasilan: "",
    tanggungan: "",
    statusKIP: "",
    statusPKH: "",
  });

  console.log(formData);
  
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/siswa/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            namaSiswa: data.data.namaSiswa || "",
            alatTransportasi: data.data.alatTransportasi || "",
            pekerjaanOrtu: data.data.pekerjaanOrtu || "",
            penghasilan: data.data.penghasilan || "",
            tanggungan: data.data.tanggungan || "",
            statusKIP: data.data.statusKIP || "",
            statusPKH: data.data.statusPKH || "",
          });
        });
    }
  }, [id]);


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/siswa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data");

      alert("Data siswa berhasil disimpan!");
    } catch (err) {
      console.log(err);

      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/siswa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data");

      alert("Data siswa berhasil disimpan!");
    } catch (err) {
      console.log(err);

      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };


  // Dummy options
  const incomeOptions = [
    "Rp. 500.000 - Rp. 1.500.000",
    "Rp. 1.500.000 - Rp. 3.000.000",
    "Rp. 3.000.000 - Rp. 5.000.000",
    "> Rp. 5.000.000",
  ];

  const occupationOptions = ["Wirausaha", "Peternak", "Petani", "Buruh", "Lainnya"];
  const transportationOptions = ["Jalan kaki", "Sepeda motor"];

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

        {/* Form Card */}
        <Card sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
          <form onSubmit={id ? handleUpdate : handleSubmit}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Nama Siswa */}
              <TextField
                label="Nama Siswa"
                name="namaSiswa"
                value={formData.namaSiswa}
                onChange={handleChange}
                required
              />

              {/* Alat Transportasi */}
              <FormControl required>
                <InputLabel>Alat Transportasi</InputLabel>
                <Select
                  name="alatTransportasi"
                  value={formData.alatTransportasi}
                  onChange={handleChange}
                  label="Alat Transportasi"
                >
                  {transportationOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Pekerjaan Orang Tua */}
              <FormControl required>
                <InputLabel>Pekerjaan Orang Tua</InputLabel>
                <Select
                  name="pekerjaanOrtu"
                  value={formData.pekerjaanOrtu}
                  onChange={handleChange}
                  label="Pekerjaan Orang Tua"
                >
                  {occupationOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Penghasilan Orang Tua */}
              <FormControl required>
                <InputLabel>Penghasilan Orang Tua</InputLabel>
                <Select
                  name="penghasilan"
                  value={formData.penghasilan}
                  onChange={handleChange}
                  label="Penghasilan Orang Tua"
                >
                  {incomeOptions.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Status KIP */}
              <FormControl required>
                <InputLabel>Status KIP</InputLabel>
                <Select
                  name="statusKIP"
                  value={formData.statusKIP}
                  onChange={handleChange}
                  label="Status KIP"
                >
                  <MenuItem value="ya">Ya</MenuItem>
                  <MenuItem value="tidak">Tidak</MenuItem>
                </Select>
              </FormControl>

              {/* Status KPS */}
              <FormControl required>
                <InputLabel>Status KPS</InputLabel>
                <Select
                  name="statusPKH"
                  value={formData.statusPKH}
                  onChange={handleChange}
                  label="Status KPS"
                >
                  <MenuItem value="ya">Ya</MenuItem>
                  <MenuItem value="tidak">Tidak</MenuItem>
                </Select>
              </FormControl>

              {/* Jumlah Tanggungan */}
              <FormControl required>
                <InputLabel>Jumlah Tanggungan</InputLabel>
                <Select
                  name="tanggungan"
                  value={formData.tanggungan}
                  onChange={handleChange}
                  label="Jumlah Tanggungan"
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="lebih_dari_3">Lebih dari 3</MenuItem>
                </Select>
              </FormControl>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
              <Button type="button" variant="outlined" onClick={() => setFormData({})}>
                Batal
              </Button>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                {id ? "Update Data" : "Simpan Data"}
              </Button>
            </Box>

          </form>
        </Card>
      </Box>
    </Box>
  );
}
