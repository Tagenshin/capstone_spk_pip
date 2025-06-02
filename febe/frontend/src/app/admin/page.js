"use client";

import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const monthlyData = [
  { name: "Jan", penerima: 65, total: 240 },
  { name: "Feb", penerima: 59, total: 238 },
  { name: "Mar", penerima: 80, total: 245 },
  { name: "Apr", penerima: 81, total: 250 },
  { name: "Mei", penerima: 56, total: 252 },
  { name: "Jun", penerima: 55, total: 248 },
  { name: "Jul", penerima: 40, total: 245 },
  { name: "Agu", penerima: 45, total: 250 },
  { name: "Sep", penerima: 62, total: 255 },
  { name: "Okt", penerima: 78, total: 262 },
  { name: "Nov", penerima: 91, total: 270 },
  { name: "Des", penerima: 125, total: 280 },
];

const criteriaData = [
  { name: "Ekonomi", value: 45, color: "#003d80" },
  { name: "Prestasi", value: 25, color: "#0056b3" },
  { name: "Kehadiran", value: 15, color: "#0074e8" },
  { name: "Jarak", value: 10, color: "#3498db" },
  { name: "Lainnya", value: 5, color: "#5dade2" },
];

const COLORS = criteriaData.map((c) => c.color);

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [tabIndex, setTabIndex] = useState(0);
  const [year, setYear] = useState("2025");

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Navbar */}
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          ml: sidebarOpen ? "256px" : "64px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Dashboard
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Selamat datang di Sistem Pendukung Keputusan Penerima Bantuan PIP
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="year-label">Tahun Ini</InputLabel>
              <Select
                labelId="year-label"
                value={year}
                label="Tahun Ini"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <CalendarTodayIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          sx={{ mb: 3 }}
          aria-label="dashboard tabs"
        >
          <Tab label="Ikhtisar" value={0} />
          <Tab label="Analitik" value={1} />
          <Tab label="Laporan" value={2} />
        </Tabs>

        {/* Tab Contents */}
        {tabIndex === 0 && (
          <>
            {/* Summary cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <PeopleIcon fontSize="large" color="action" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Total Siswa
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="green">
                      1,248
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "green",
                        fontSize: "0.75rem",
                      }}
                    >
                      <TrendingUpIcon fontSize="small" />
                      <span>+12% dari bulan lalu</span>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <EmojiEventsIcon fontSize="large" color="action" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Penerima PIP
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="green">
                      324
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "green",
                        fontSize: "0.75rem",
                      }}
                    >
                      <TrendingUpIcon fontSize="small" />
                      <span>+4% dari bulan lalu</span>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <SchoolIcon fontSize="large" color="action" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Kelas Aktif
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="text.primary">
                      24
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Sama dengan bulan lalu
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <WarningAmberIcon fontSize="large" color="action" />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Perlu Verifikasi
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="error">
                      12
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "error.main",
                        fontSize: "0.75rem",
                      }}
                    >
                      <TrendingDownIcon fontSize="small" />
                      <span>-2 dari bulan lalu</span>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Charts side by side */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Paper
                  elevation={1}
                  sx={{ p: 3, borderRadius: 2, height: 400, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Statistik Penerima PIP
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Distribusi penerima PIP berdasarkan bulan
                  </Typography>
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="penerima" stroke="#003d80" strokeWidth={2} />
                        <Line type="monotone" dataKey="total" stroke="#c00000" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={1}
                  sx={{ p: 3, borderRadius: 2, height: 400, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Distribusi Kriteria
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Persentase kriteria penerima PIP
                  </Typography>
                  <Box sx={{ flexGrow: 1, width: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={criteriaData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {criteriaData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Persentase"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}

        {tabIndex === 1 && (
          <Paper sx={{ p: 3, borderRadius: 2, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Analitik Lanjutan
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Analisis mendalam tentang data penerima PIP
            </Typography>
            <Box sx={{ height: "calc(100% - 64px)" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="penerima" name="Penerima PIP" fill="#003d80" />
                  <Bar dataKey="total" name="Total Siswa" fill="#c00000" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        )}

        {tabIndex === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Laporan Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Laporan November 2023
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      91
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Penerima PIP
                    </Typography>
                    <Button fullWidth variant="outlined" size="small">
                      Lihat Detail
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Laporan Oktober 2023
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      78
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Penerima PIP
                    </Typography>
                    <Button fullWidth variant="outlined" size="small">
                      Lihat Detail
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                      Laporan September 2023
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      62
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Penerima PIP
                    </Typography>
                    <Button fullWidth variant="outlined" size="small">
                      Lihat Detail
                    </Button>
                  </Card>
                </Grid>
              </Grid>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Lihat Semua Laporan
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}
