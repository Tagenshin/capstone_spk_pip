"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Checkbox,
  Chip,
} from "@mui/material";
import { ArrowLeft, FileText, Download } from "lucide-react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function CetakHasilPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [filterStatus, setFilterStatus] = useState("");
  const [searchName, setSearchName] = useState("");

  // Dummy data
  const data = [
    { id: 1, name: "Ahmad Fauzi", nisn: "1234567890", class: "XII IPA 1", score: 92, status: "Layak" },
    { id: 2, name: "Siti Nurhaliza", nisn: "0987654321", class: "XI IPS 2", score: 85, status: "Layak" },
    { id: 3, name: "Budi Santoso", nisn: "2345678901", class: "X IPA 3", score: 45, status: "Tidak Layak" },
    { id: 4, name: "Dewi Lestari", nisn: "3456789012", class: "XII IPS 1", score: 78, status: "Layak" },
    { id: 5, name: "Eko Prasetyo", nisn: "4567890123", class: "XI IPA 2", score: 32, status: "Tidak Layak" },
  ];

  // Filter data berdasarkan nama dan status
  const filteredData = data.filter((item) => {
    const matchName = item.name.toLowerCase().includes(searchName.toLowerCase());
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    return matchName && matchStatus;
  });

  const statusColor = (status) => {
    return status === "Layak" ? "success" : "error";
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
          p: 3,
          ml: sidebarOpen ? "256px" : "64px",
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          bgcolor: "#f9fafb",
        }}
      >
        {/* Breadcrumb */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Dashboard &gt; Hasil Prediksi &gt; Cetak Hasil
        </Typography>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Cetak Hasil Prediksi
            </Typography>
            <Typography color="text.secondary">
              Cetak hasil prediksi penerima bantuan PIP
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft />}
              onClick={() => window.history.back()}
            >
              Kembali
            </Button>
            <Button
              variant="contained"
              startIcon={<FileText />}
              disabled={filteredData.length === 0}
              onClick={() => alert("Fitur cetak belum tersedia")}
            >
              Cetak
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              disabled={filteredData.length === 0}
              onClick={() => alert("Fitur unduh PDF belum tersedia")}
            >
              Unduh PDF
            </Button>
          </Box>
        </Box>

        {/* Filter */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Cari siswa..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Semua Status</MenuItem>
                <MenuItem value="Layak">Layak</MenuItem>
                <MenuItem value="Tidak Layak">Tidak Layak</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent sx={{ overflowX: "auto" }}>
            <Table size="small" aria-label="cetak hasil prediksi table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox disabled />
                  </TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>NISN</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell>Skor</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>{row.name}</TableCell>
                      <TableCell>{row.nisn}</TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.score}%</TableCell>
                      <TableCell>
                        <Chip label={row.status} color={statusColor(row.status)} size="small" />
                      </TableCell>
                      <TableCell>
                        <Button variant="text" size="small" startIcon={<FileText />}>
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Tidak ada data yang cocok
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <Box sx={{ p: 2, color: "text.secondary" }}>
            {filteredData.length} dari {data.length} data dipilih
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
