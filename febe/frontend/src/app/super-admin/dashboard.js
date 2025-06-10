"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Chip,
} from "@mui/material";
import AdminNavbar from "../../../components/AdminNavbar";
import { ArrowLeft, School, People, AccountBalance } from "lucide-react";

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [schoolsData, setSchoolsData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Dummy data for schools (replace with actual data from your backend)
  useEffect(() => {
    setSchoolsData([
      { id: 1, name: "SMK Negeri 1 Jakarta", numberOfStudents: 1200, location: "Jakarta", status: "Aktif" },
      { id: 2, name: "SMA Negeri 2 Bandung", numberOfStudents: 900, location: "Bandung", status: "Aktif" },
      { id: 3, name: "SMP Negeri 3 Surabaya", numberOfStudents: 800, location: "Surabaya", status: "Tidak Aktif" },
      { id: 4, name: "SD Negeri 4 Makassar", numberOfStudents: 500, location: "Makassar", status: "Aktif" },
      { id: 5, name: "SMA Negeri 5 Yogyakarta", numberOfStudents: 1000, location: "Yogyakarta", status: "Aktif" },
    ]);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const statusColor = (status) => {
    return status === "Aktif" ? "success" : "error";
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Navbar */}
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
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
          Dashboard &gt; Super Admin &gt; Kelola Data Sekolah
        </Typography>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Dashboard Super Admin
            </Typography>
            <Typography color="text.secondary">
              Kelola data sekolah dan jumlah sekolah yang terdaftar
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
              startIcon={<School />}
              component={Link}
              href="/super-admin/tambah-sekolah"
            >
              Tambah Sekolah
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Card sx={{ flex: 1 }}>
            <CardHeader title="Total Sekolah" />
            <CardContent>
              <Typography variant="h6">{schoolsData.length}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardHeader title="Sekolah Aktif" />
            <CardContent>
              <Typography variant="h6">
                {schoolsData.filter((school) => school.status === "Aktif").length}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardHeader title="Sekolah Tidak Aktif" />
            <CardContent>
              <Typography variant="h6">
                {schoolsData.filter((school) => school.status === "Tidak Aktif").length}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Table of Schools */}
        <Card>
          <CardContent sx={{ overflowX: "auto" }}>
            <Table size="small" aria-label="table of schools">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Sekolah</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell>Jumlah Siswa</TableCell>
                  <TableCell>Lokasi</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schoolsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((school) => (
                    <TableRow key={school.id}>
                      <TableCell sx={{ fontWeight: "bold" }}>{school.name}</TableCell>
                      <TableCell>{school.class}</TableCell>
                      <TableCell>{school.numberOfStudents}</TableCell>
                      <TableCell>{school.location}</TableCell>
                      <TableCell>
                        <Chip label={school.status} color={statusColor(school.status)} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <Box sx={{ p: 2, color: "text.secondary" }}>
            {schoolsData.length} dari {schoolsData.length} data dipilih
          </Box>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={schoolsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} dari ${count}`
            }
            backIconButtonProps={{ "aria-label": "Halaman sebelumnya" }}
            nextIconButtonProps={{ "aria-label": "Halaman berikutnya" }}
          />
        </Card>
      </Box>
    </Box>
  );
}

