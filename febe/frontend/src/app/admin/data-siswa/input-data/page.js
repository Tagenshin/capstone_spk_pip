"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Typography,
} from "@mui/material";
import { ArrowLeft, Save, Upload } from "lucide-react";

import AdminNavbar from "../../../components/AdminNavbar";

export default function StudentInputPage() {
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Tab state
  const [activeTab, setActiveTab] = useState("personal");

  // Dummy options
  const classOptions = [
    "X IPA 1",
    "X IPA 2",
    "X IPA 3",
    "X IPS 1",
    "X IPS 2",
    "XI IPA 1",
    "XI IPA 2",
    "XI IPS 1",
    "XI IPS 2",
    "XII IPA 1",
    "XII IPA 2",
    "XII IPS 1",
    "XII IPS 2",
  ];

  const incomeOptions = [
    "< Rp 1.000.000",
    "Rp 1.000.000 - Rp 2.000.000",
    "Rp 2.000.000 - Rp 3.000.000",
    "Rp 3.000.000 - Rp 4.000.000",
    "> Rp 4.000.000",
  ];

  const occupationOptions = [
    "PNS",
    "Karyawan Swasta",
    "Wiraswasta",
    "Petani",
    "Buruh",
    "Tidak Bekerja",
    "Lainnya",
  ];

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
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Dashboard &gt; Data Siswa &gt; Input Data Siswa
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Input Data Siswa
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Tambahkan data siswa baru ke dalam sistem
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="/admin/data-siswa" passHref>
              <Button variant="outlined" startIcon={<ArrowLeft />}>
                Kembali
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Card Form */}
        <Card>
          <CardHeader>
            <CardTitle>Formulir Data Siswa</CardTitle>
            <CardDescription>
              Isi formulir berikut dengan data siswa yang valid
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Tab Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              {["personal", "family", "economic", "academic"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "contained" : "outlined"}
                  onClick={() => setActiveTab(tab)}
                >
                  {(() => {
                    switch (tab) {
                      case "personal":
                        return "Data Pribadi";
                      case "family":
                        return "Data Keluarga";
                      case "economic":
                        return "Data Ekonomi";
                      case "academic":
                        return "Data Akademik";
                      default:
                        return "";
                    }
                  })()}
                </Button>
              ))}
            </Box>

            {/* Tab Contents */}
            {activeTab === "personal" && (
              <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{ display: "grid", gap: 2 }}
              >
                <TextField
                  label="Nama Lengkap *"
                  required
                  fullWidth
                  name="name"
                  placeholder="Masukkan nama lengkap siswa"
                />
                <TextField
                  label="NISN *"
                  required
                  fullWidth
                  name="nisn"
                  placeholder="Masukkan NISN"
                />
                <TextField
                  label="NIS"
                  fullWidth
                  name="nis"
                  placeholder="Masukkan NIS"
                />
                <FormControl fullWidth required>
                  <InputLabel>Kelas</InputLabel>
                  <Select defaultValue="" label="Kelas" name="class">
                    {classOptions.map((cls) => (
                      <MenuItem key={cls} value={cls}>
                        {cls}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl component="fieldset" required>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Jenis Kelamin *
                  </Typography>
                  <RadioGroup row name="gender" defaultValue="laki-laki">
                    <FormControlLabel
                      value="laki-laki"
                      control={<Radio />}
                      label="Laki-laki"
                    />
                    <FormControlLabel
                      value="perempuan"
                      control={<Radio />}
                      label="Perempuan"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  label="Tanggal Lahir *"
                  required
                  fullWidth
                  name="birthdate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Tempat Lahir *"
                  required
                  fullWidth
                  name="birthplace"
                  placeholder="Masukkan tempat lahir"
                />
                <TextField
                  label="Alamat *"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  name="address"
                  placeholder="Masukkan alamat lengkap"
                />
                <TextField
                  label="Nomor Telepon"
                  fullWidth
                  name="phone"
                  placeholder="Masukkan nomor telepon"
                />
                <TextField
                  label="Email"
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Masukkan email"
                />
              </Box>
            )}

            {activeTab === "family" && (
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="Nama Ayah *"
                  required
                  fullWidth
                  name="father_name"
                  placeholder="Masukkan nama ayah"
                />
                <TextField
                  label="Nama Ibu *"
                  required
                  fullWidth
                  name="mother_name"
                  placeholder="Masukkan nama ibu"
                />
                <FormControl fullWidth required>
                  <InputLabel>Pekerjaan Ayah</InputLabel>
                  <Select defaultValue="" label="Pekerjaan Ayah" name="father_occupation">
                    {occupationOptions.map((occ) => (
                      <MenuItem key={occ} value={occ}>
                        {occ}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Pekerjaan Ibu</InputLabel>
                  <Select defaultValue="" label="Pekerjaan Ibu" name="mother_occupation">
                    {occupationOptions.map((occ) => (
                      <MenuItem key={occ} value={occ}>
                        {occ}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Nomor Telepon Orang Tua *"
                  required
                  fullWidth
                  name="parent_phone"
                  placeholder="Masukkan nomor telepon orang tua"
                />
                <TextField
                  label="Jumlah Saudara Kandung *"
                  required
                  fullWidth
                  name="siblings"
                  type="number"
                  inputProps={{ min: 0 }}
                  placeholder="Masukkan jumlah saudara kandung"
                />
                <TextField
                  label="Alamat Orang Tua *"
                  required
                  fullWidth
                  multiline
                  rows={3}
                  name="parent_address"
                  placeholder="Masukkan alamat lengkap orang tua"
                />
                <FormControl component="fieldset" required>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Status Orang Tua *
                  </Typography>
                  <RadioGroup
                    name="parent_status"
                    defaultValue="lengkap"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <FormControlLabel
                      value="lengkap"
                      control={<Radio />}
                      label="Lengkap"
                    />
                    <FormControlLabel
                      value="ayah_meninggal"
                      control={<Radio />}
                      label="Ayah Meninggal"
                    />
                    <FormControlLabel
                      value="ibu_meninggal"
                      control={<Radio />}
                      label="Ibu Meninggal"
                    />
                    <FormControlLabel
                      value="yatim_piatu"
                      control={<Radio />}
                      label="Yatim Piatu"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}

            {activeTab === "economic" && (
              <Box sx={{ display: "grid", gap: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel>Penghasilan Orang Tua per Bulan *</InputLabel>
                  <Select
                    defaultValue=""
                    label="Penghasilan Orang Tua"
                    name="parent_income"
                  >
                    {incomeOptions.map((income) => (
                      <MenuItem key={income} value={income}>
                        {income}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl component="fieldset" required>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Status Kepemilikan Rumah *
                  </Typography>
                  <RadioGroup
                    name="home_status"
                    defaultValue="milik_sendiri"
                    sx={{ flexDirection: "column" }}
                  >
                    <FormControlLabel
                      value="milik_sendiri"
                      control={<Radio />}
                      label="Milik Sendiri"
                    />
                    <FormControlLabel value="sewa" control={<Radio />} label="Sewa/Kontrak" />
                    <FormControlLabel value="menumpang" control={<Radio />} label="Menumpang" />
                  </RadioGroup>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Kondisi Rumah *</InputLabel>
                  <Select defaultValue="" label="Kondisi Rumah" name="home_condition">
                    <MenuItem value="permanen">Permanen</MenuItem>
                    <MenuItem value="semi_permanen">Semi Permanen</MenuItem>
                    <MenuItem value="tidak_permanen">Tidak Permanen</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Jarak Rumah ke Sekolah (km) *"
                  required
                  fullWidth
                  name="distance"
                  type="number"
                  step={0.1}
                  inputProps={{ min: 0 }}
                  placeholder="Masukkan jarak dalam kilometer"
                />
                <FormControl fullWidth required>
                  <InputLabel>Transportasi ke Sekolah *</InputLabel>
                  <Select defaultValue="" label="Transportasi" name="transportation">
                    <MenuItem value="jalan_kaki">Jalan Kaki</MenuItem>
                    <MenuItem value="sepeda">Sepeda</MenuItem>
                    <MenuItem value="motor">Sepeda Motor</MenuItem>
                    <MenuItem value="angkutan_umum">Angkutan Umum</MenuItem>
                    <MenuItem value="antar_jemput">Antar Jemput</MenuItem>
                    <MenuItem value="lainnya">Lainnya</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Fasilitas di Rumah
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {[ 
                    { id: "listrik", label: "Listrik" },
                    { id: "air_bersih", label: "Air Bersih" },
                    { id: "tv", label: "Televisi" },
                    { id: "kulkas", label: "Kulkas" },
                    { id: "sepeda_motor", label: "Sepeda Motor" },
                    { id: "mobil", label: "Mobil" },
                  ].map(({ id, label }) => (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox name={id} />}
                      label={label}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {activeTab === "academic" && (
              <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                  label="Nilai Rata-rata Rapor *"
                  required
                  fullWidth
                  name="average_score"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  placeholder="Masukkan nilai rata-rata"
                />
                <TextField
                  label="Persentase Kehadiran (%) *"
                  required
                  fullWidth
                  name="attendance"
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  placeholder="Masukkan persentase kehadiran"
                />
                <TextField
                  label="Prestasi Akademik"
                  fullWidth
                  multiline
                  rows={3}
                  name="achievements"
                  placeholder="Masukkan prestasi akademik (jika ada)"
                />
                <TextField
                  label="Kegiatan Ekstrakurikuler"
                  fullWidth
                  multiline
                  rows={3}
                  name="extracurricular"
                  placeholder="Masukkan kegiatan ekstrakurikuler (jika ada)"
                />
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Status Penerima Bantuan Lain
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[
                    { id: "kip", label: "Kartu Indonesia Pintar (KIP)" },
                    { id: "pkh", label: "Program Keluarga Harapan (PKH)" },
                    { id: "bsm", label: "Bantuan Siswa Miskin (BSM)" },
                    { id: "other_aid", label: "Bantuan Lainnya" },
                  ].map(({ id, label }) => (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox name={id} />}
                      label={label}
                    />
                  ))}
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Dokumen Pendukung
                </Typography>
                {[ 
                  { id: "kk_upload", label: "Kartu Keluarga" },
                  { id: "ktp_upload", label: "KTP Orang Tua" },
                  { id: "sktm_upload", label: "Surat Keterangan Tidak Mampu (jika ada)" },
                ].map(({ id, label }) => (
                  <Box key={id} sx={{ mb: 2 }}>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <input id={id} type="file" />
                      <Button variant="outlined" size="small" startIcon={<Upload />}>
                        Upload
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>

          {/* GANTI CardFooter DENGAN Box */}
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
