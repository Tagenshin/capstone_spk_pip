"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { Printer, Download, MoreHorizontal, Delete } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function HasilPrediksiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Contoh data dummy
  const dataPrediksi = [
    { name: "Ahmad Fauzi", nisn: "1234567890", class: "XII IPA 1", score: 92, status: "Layak", date: "2023-05-15" },
    { name: "Siti Nurhaliza", nisn: "0987654321", class: "XI IPS 2", score: 85, status: "Layak", date: "2023-05-15" },
    { name: "Budi Santoso", nisn: "2345678901", class: "X IPA 3", score: 45, status: "Tidak Layak", date: "2023-05-15" },
    { name: "Dewi Lestari", nisn: "3456789012", class: "XII IPS 1", score: 78, status: "Layak", date: "2023-05-15" },
    { name: "Eko Prasetyo", nisn: "4567890123", class: "XI IPA 2", score: 32, status: "Tidak Layak", date: "2023-05-15" },
    { name: "Rina Wati", nisn: "5678901234", class: "X IPS 3", score: 88, status: "Layak", date: "2023-05-16" },
    { name: "Doni Kusuma", nisn: "6789012345", class: "XII IPA 3", score: 67, status: "Layak", date: "2023-05-16" },
    { name: "Maya Sari", nisn: "7890123456", class: "XI IPS 1", score: 38, status: "Tidak Layak", date: "2023-05-16" },
  ];

  // Filtered data sesuai filter status dan tanggal
  const filteredData = dataPrediksi.filter(item => {
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    const matchDate = filterDate ? item.date === filterDate : true;
    return matchStatus && matchDate;
  });

  // Fungsi warna chip status
  const statusColor = (status) => {
    if (status === "Layak") return "success";
    if (status === "Tidak Layak") return "error";
    return "default";
  };

  // Fungsi warna progress score
  const scoreColor = (score) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  const handleDelete = (name) => {
    alert(`Hapus data untuk siswa: ${name}`);
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
        {/* Breadcrumb */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hasil Prediksi
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Hasil prediksi penerima bantuan PIP berdasarkan model Machine Learning
        </Typography>

        {/* Filter */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Cari siswa..."
              sx={{ flexGrow: 1, minWidth: 200 }}
              onChange={e => {
                // Implementasi cari nama jika perlu
              }}
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                label="Status"
                size="small"
              >
                <MenuItem value="">Semua Status</MenuItem>
                <MenuItem value="Layak">Layak</MenuItem>
                <MenuItem value="Tidak Layak">Tidak Layak</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Tanggal"
              type="date"
              size="small"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              sx={{ minWidth: 150 }}
              InputLabelProps={{ shrink: true }}
            />
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent sx={{ overflowX: "auto" }}>
            <Table size="small" aria-label="hasil prediksi table">
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Skor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ fontWeight: "bold" }}>{row.name}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: 80,
                          height: 10,
                          borderRadius: 5,
                          bgcolor: "#e0e0e0",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${row.score}%`,
                            height: "100%",
                            bgcolor: scoreColor(row.score),
                            position: "absolute",
                            top: 0,
                            left: 0,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ ml: 1 }}>
                        {row.score}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        color={statusColor(row.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDelete(row.name)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
