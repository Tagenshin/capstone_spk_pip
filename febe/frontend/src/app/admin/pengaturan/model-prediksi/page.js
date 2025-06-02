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
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Download, Upload, RefreshCw } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function PengaturanModelPrediksiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modelType, setModelType] = useState("Random Forest");
  const [threshold, setThreshold] = useState(65);
  const [weights, setWeights] = useState({
    ekonomi: 45,
    prestasi: 25,
    kehadiran: 15,
    jarak: 10,
    lainnya: 5,
  });
  const [autoUpdate, setAutoUpdate] = useState(true);

  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({
      ...prev,
      [key]: value,
    }));
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

        {/* No tabs */}

        {/* Form Model Prediksi */}
        <Card sx={{ mb: 5 }}>
          <CardHeader
            title="Pengaturan Model Prediksi"
            subheader="Konfigurasi model machine learning untuk prediksi penerima PIP"
          />
          <Divider />
          <CardContent>
            <Stack spacing={3} maxWidth={600}>
              {/* Jenis Model */}
              <FormControl fullWidth>
                <InputLabel>Jenis Model</InputLabel>
                <Select
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value)}
                  label="Jenis Model"
                >
                  <MenuItem value="Random Forest">Random Forest</MenuItem>
                  <MenuItem value="SVM">SVM</MenuItem>
                  <MenuItem value="Logistic Regression">Logistic Regression</MenuItem>
                  <MenuItem value="Neural Network">Neural Network</MenuItem>
                </Select>
              </FormControl>

              {/* Threshold Kelayakan */}
              <Typography gutterBottom>Threshold Kelayakan</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Slider
                  value={threshold}
                  onChange={(e, val) => setThreshold(val)}
                  min={0}
                  max={100}
                  aria-label="Threshold Kelayakan"
                  valueLabelDisplay="auto"
                  sx={{ flexGrow: 1 }}
                />
                <Typography>{threshold}%</Typography>
              </Box>

              {/* Bobot Kriteria */}
              <Typography variant="h6" gutterBottom>
                Bobot Kriteria
              </Typography>
              {[
                { label: "Ekonomi", key: "ekonomi" },
                { label: "Prestasi", key: "prestasi" },
                { label: "Kehadiran", key: "kehadiran" },
                { label: "Jarak", key: "jarak" },
                { label: "Lainnya", key: "lainnya" },
              ].map(({ label, key }) => (
                <Box key={key} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography sx={{ width: 100 }}>{label}</Typography>
                  <Slider
                    value={weights[key]}
                    onChange={(e, val) => handleWeightChange(key, val)}
                    min={0}
                    max={100}
                    aria-label={`${label} weight`}
                    valueLabelDisplay="auto"
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography sx={{ width: 40 }}>{weights[key]}%</Typography>
                </Box>
              ))}

              {/* Pembaruan Model Otomatis */}
              <FormControlLabel
                control={
                  <Switch
                    checked={autoUpdate}
                    onChange={() => setAutoUpdate((prev) => !prev)}
                  />
                }
                label="Pembaruan Model Otomatis"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Perbarui model secara otomatis saat ada data baru
              </Typography>

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshCw />}
                  onClick={() => alert("Latih ulang model")}
                >
                  Latih Ulang Model
                </Button>
                <Button variant="contained" sx={{ ml: "auto" }}>
                  Simpan Perubahan
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Ekspor/Impor Model */}
        <Card>
          <CardHeader
            title="Ekspor/Impor Model"
            subheader="Ekspor atau impor model machine learning"
          />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, maxWidth: 400 }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => alert("Ekspor model")}
                fullWidth
              >
                Ekspor Model
              </Button>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                onClick={() => alert("Impor model")}
                fullWidth
              >
                Impor Model
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
