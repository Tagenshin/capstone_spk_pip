"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Download } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";

export default function StatistikIkhtisarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Dashboard &gt; Statistik
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Statistik
            </Typography>
            <Typography color="text.secondary">
              Analisis data penerima bantuan PIP
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                variant="outlined"
              >
                {[new Date().getFullYear(), 2023, 2022, 2021].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year === new Date().getFullYear() ? "Tahun Ini" : year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<Download />}>
              Ekspor
            </Button>
          </Box>
        </Box>

        {/* Langsung tampilkan konten Ikhtisar */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            {
              title: "Total Siswa",
              value: "1,248",
              subtitle: "Dari 24 kelas aktif",
            },
            {
              title: "Penerima PIP",
              value: "324",
              subtitle: "26% dari total siswa",
            },
            {
              title: "Dana Tersalurkan",
              value: "Rp 486,000,000",
              subtitle: "Rp 1,500,000 per siswa",
            },
            {
              title: "Rata-rata Skor",
              value: "76%",
              subtitle: "Threshold: 65%",
            },
          ].map(({ title, value, subtitle }) => (
            <Grid item xs={12} md={3} key={title}>
              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Statistik Penerima PIP
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Distribusi penerima PIP berdasarkan bulan
              </Typography>
              <Box
                sx={{
                  height: 240,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                Grafik garis placeholder
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Distribusi Kriteria
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Persentase kriteria penerima PIP
              </Typography>
              <Box
                sx={{
                  height: 240,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                Grafik pie placeholder
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
