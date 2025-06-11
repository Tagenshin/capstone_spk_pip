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
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import Loading from "../../../components/AdminNavbar";

export default function StudentInputPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const defaultForm = {
    namaSiswa: "",
    alatTransportasi: "",
    pekerjaanOrtu: "",
    penghasilan: "",
    tanggungan: "",
    statusKIP: "",
    statusPKH: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://pip-clasification-app-production.up.railway.app/siswa/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const siswa = data?.data || {};
          setFormData({
            namaSiswa: siswa.namaSiswa || "",
            alatTransportasi: siswa.alatTransportasi || "",
            pekerjaanOrtu: siswa.pekerjaanOrtu || "",
            penghasilan: siswa.penghasilan || "",
            tanggungan: siswa.tanggungan || "",
            statusKIP: siswa.statusKIP || "",
            statusPKH: siswa.statusPKH || "",
          });
        });
        setLoading(false);
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
    setLoading(true);
    try {
      const response = await fetch(
        "https://pip-clasification-app-production.up.railway.app/siswa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Gagal menyimpan data");
      setLoading(false);
      router.push("/admin/data-siswa");
      Swal.fire({
        icon: "success",
        title: "Data siswa berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat menyimpan data.",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://pip-clasification-app-production.up.railway.app/siswa/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      
      if (!response.ok) throw new Error("Gagal mengupdate data");
      
      setLoading(false);
      router.push("/admin/data-siswa");
       Swal.fire({
        icon: "success",
        title: "Data siswa berhasil disimpan!",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat menyimpan data.",
        showConfirmButton: false,
        timer: 1500,
      })
    }
  };

  const occupationOptions = ["Wirausaha", "Peternak", "Petani", "Buruh", "Lainnya"];
  const transportationOptions = ["Jalan kaki", "Sepeda motor"];
  {loading && <Loading />}
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {id ? "Edit Data Siswa" : "Input Data Siswa"}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {id
              ? "Ubah data siswa yang sudah ada"
              : "Tambahkan data siswa baru ke dalam sistem"}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="/admin/data-siswa" passHref legacyBehavior={false}>
              <Button variant="outlined" startIcon={<ArrowLeft />} component="a">
                Kembali
              </Button>
            </Link>
          </Box>
        </Box>

        <Card sx={{ width: "100%", maxWidth: 800, mx: "auto" }}>
          <form onSubmit={id ? handleUpdate : handleSubmit}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nama Siswa"
                name="namaSiswa"
                value={formData.namaSiswa}
                onChange={handleChange}
                required
              />

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

              <TextField
                label="Penghasilan Orang Tua"
                name="penghasilan"
                value={formData.penghasilan}
                onChange={handleChange}
                required
              />

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

              <FormControl required>
                <InputLabel>Status PKH</InputLabel>
                <Select
                  name="statusPKH"
                  value={formData.statusPKH}
                  onChange={handleChange}
                  label="Status PKH"
                >
                  <MenuItem value="ya">Ya</MenuItem>
                  <MenuItem value="tidak">Tidak</MenuItem>
                </Select>
              </FormControl>

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
              <Button type="button" variant="outlined" onClick={() => setFormData(defaultForm)}>
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
