"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterList, Search, MoreVert, Add, Upload } from "@mui/icons-material";

import AdminNavbar from "../../components/AdminNavbar";

export default function DataSiswaPage() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Dummy data
  const studentsData = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      nisn: "1234567890",
      class: "XII IPA 1",
      gender: "Laki-laki",
      address: "Jl. Merdeka No. 123, Jakarta",
      parentIncome: "Rp 2.500.000",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      nisn: "0987654321",
      class: "XI IPS 2",
      gender: "Perempuan",
      address: "Jl. Pahlawan No. 45, Bandung",
      parentIncome: "Rp 1.800.000",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Budi Santoso",
      nisn: "2345678901",
      class: "X IPA 3",
      gender: "Laki-laki",
      address: "Jl. Sudirman No. 78, Surabaya",
      parentIncome: "Rp 3.200.000",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      nisn: "3456789012",
      class: "XII IPS 1",
      gender: "Perempuan",
      address: "Jl. Gatot Subroto No. 12, Semarang",
      parentIncome: "Rp 2.100.000",
      status: "Aktif",
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      nisn: "4567890123",
      class: "XI IPA 2",
      gender: "Laki-laki",
      address: "Jl. Ahmad Yani No. 56, Yogyakarta",
      parentIncome: "Rp 2.800.000",
      status: "Aktif",
    },
    {
      id: 6,
      name: "Rina Wati",
      nisn: "5678901234",
      class: "X IPS 3",
      gender: "Perempuan",
      address: "Jl. Diponegoro No. 34, Malang",
      parentIncome: "Rp 1.950.000",
      status: "Aktif",
    },
    {
      id: 7,
      name: "Doni Kusuma",
      nisn: "6789012345",
      class: "XII IPA 3",
      gender: "Laki-laki",
      address: "Jl. Imam Bonjol No. 67, Medan",
      parentIncome: "Rp 2.300.000",
      status: "Aktif",
    },
    {
      id: 8,
      name: "Maya Sari",
      nisn: "7890123456",
      class: "XI IPS 1",
      gender: "Perempuan",
      address: "Jl. Veteran No. 23, Makassar",
      parentIncome: "Rp 2.750.000",
      status: "Aktif",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Navbar sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const classesOptions = [
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
  ];

  // Filter data
  const filteredStudents = studentsData.filter((s) => {
    return (
      (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nisn.includes(searchTerm)) &&
      (filterClass === "all" || s.class === filterClass) &&
      (filterGender === "all" || s.gender === filterGender)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
        {/* Title and description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Data Siswa
          </Typography>
          <Typography color="text.secondary">
            Kelola data siswa untuk seleksi penerima bantuan PIP
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            component={Link}
            href="/admin/data-siswa/tambah-siswa"
            sx={{ whiteSpace: "nowrap" }}
          >
            Tambah Siswa
          </Button>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            sx={{ whiteSpace: "nowrap" }}
          >
            Import Data
          </Button>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
            alignItems: "center",
            justifyContent: isSmUp ? "flex-start" : "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-class-label">Semua Kelas</InputLabel>
            <Select
              labelId="filter-class-label"
              value={filterClass}
              label="Semua Kelas"
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <MenuItem value="all">Semua Kelas</MenuItem>
              {classesOptions.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-gender-label">Semua</InputLabel>
            <Select
              labelId="filter-gender-label"
              value={filterGender}
              label="Semua"
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <MenuItem value="all">Semua</MenuItem>
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            overflowX: "auto",
          }}
        >
          <Table stickyHeader aria-label="data siswa table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                  Nama
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 110 }}>
                  NISN
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                  Kelas
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 130 }}>
                  Jenis Kelamin
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    minWidth: 220,
                    maxWidth: 220,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Alamat
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 140 }}>
                  Penghasilan Ortu
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 70 }} align="right">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredStudents.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredStudents
              ).map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.nisn}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 220,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={student.address}
                  >
                    {student.address}
                  </TableCell>
                  <TableCell>{student.parentIncome}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={student.status === "Aktif" ? "success" : "default"}
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label="menu aksi">
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    Tidak ada data siswa ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} dari ${count}`
            }
            backIconButtonProps={{ "aria-label": "Halaman sebelumnya" }}
            nextIconButtonProps={{ "aria-label": "Halaman berikutnya" }}
          />
        </TableContainer>
      </Box>
    </Box>
  );
}
