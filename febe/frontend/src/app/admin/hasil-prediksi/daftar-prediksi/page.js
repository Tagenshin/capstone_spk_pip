"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
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
import { Download, Delete } from "lucide-react"; // Hanya menggunakan ikon Download dan Delete
import AdminNavbar from "../../../components/AdminNavbar";
import html2pdf from "html2pdf.js"; // Import html2pdf.js

export default function HasilPrediksiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [results, setResults] = useState([]);

  // Mendapatkan hasil prediksi
  const getResults = async () => {
    try {
      const response = await fetch("https://pip-clasification-app-production.up.railway.app/hasil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setResults(data.hasil.hasil);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  const dataPrediksi = results.map((d) => ({
    id: d.id,
    name: d.siswa?.namaSiswa || "Tidak Diketahui",
    score: parseFloat(d.skor) * 100,
    status: d.status,
    date: new Date(d.tanggal).toISOString().split("T")[0],
  }));

  const filteredData = dataPrediksi.filter((item) => {
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    const matchDate = filterDate ? item.date === filterDate : true;
    const matchSearch = searchKeyword ? item.name.toLowerCase().includes(searchKeyword) : true;
    return matchStatus && matchDate && matchSearch;
  });

  const statusColor = (status) => {
    if (status === "Layak") return "success";
    if (status === "Tidak Layak") return "error";
    return "default";
  };

  const scoreColor = (score) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  const handleDelete = async (hasilId) => {
    try {
      const response = await fetch(`https://pip-clasification-app-production.up.railway.app/hasil/${hasilId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Gagal menghapus data");
      setResults(prev => prev.filter(item => item.id !== hasilId));

      alert("Hasil prediksi berhasil dihapus!");
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  // Fungsi untuk mendownload hasil prediksi dalam format PDF menggunakan html2pdf.js
  const handleDownloadPDF = () => {
    const element = document.getElementById("pdf-content"); // Ambil elemen yang akan dicetak
    const options = {
      filename: 'hasil_prediksi.pdf', // Nama file PDF yang akan diunduh
      html2canvas: { scale: 2 }, // Mengatur kualitas rendering
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // Konfigurasi PDF
    };
    html2pdf().from(element).set(options).save(); // Menggunakan html2pdf untuk mengonversi HTML menjadi PDF
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
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hasil Prediksi
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Hasil prediksi penerima bantuan PIP berdasarkan model Machine Learning
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Cari siswa..."
              sx={{ flexGrow: 1, minWidth: 200 }}
              onChange={e => setSearchKeyword(e.target.value.toLowerCase())}
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

        {/* Button untuk mengunduh PDF */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Download />}
            color="secondary"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </Box>

        {/* Tabel Hasil Prediksi */}
        <Card id="pdf-content">
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
                        {Math.round(row.score)}%
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
                        onClick={() => handleDelete(row.id)}
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
