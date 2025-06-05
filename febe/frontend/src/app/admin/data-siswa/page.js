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
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FilterList,
  Search,
  MoreVert,
  Add,
  Upload,
  Edit,
  Delete,
  PlaylistAddCheck,
} from "@mui/icons-material";

import AdminNavbar from "../../components/AdminNavbar";
import { useRouter } from "next/navigation";

export default function DataSiswaPage() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

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
      transportation: "Sepeda Motor",
      fatherOccupation: "PNS",
      siblings: 2,
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      nisn: "0987654321",
      class: "XI IPS 2",
      gender: "Perempuan",
      address: "Jl. Pahlawan No. 45, Bandung",
      parentIncome: "Rp 1.800.000",
      transportation: "Angkutan Umum",
      fatherOccupation: "Petani",
      siblings: 1,
    },
    {
      id: 3,
      name: "Budi Santoso",
      nisn: "2345678901",
      class: "X IPA 3",
      gender: "Laki-laki",
      address: "Jl. Sudirman No. 78, Surabaya",
      parentIncome: "Rp 3.200.000",
      transportation: "Mobil Pribadi",
      fatherOccupation: "Karyawan Swasta",
      siblings: 3,
    },
    {
      id: 4,
      name: "Dewi Lestari",
      nisn: "3456789012",
      class: "XII IPS 1",
      gender: "Perempuan",
      address: "Jl. Gatot Subroto No. 12, Semarang",
      parentIncome: "Rp 2.100.000",
      transportation: "Sepeda",
      fatherOccupation: "Wiraswasta",
      siblings: 2,
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      nisn: "4567890123",
      class: "XI IPA 2",
      gender: "Laki-laki",
      address: "Jl. Ahmad Yani No. 56, Yogyakarta",
      parentIncome: "Rp 2.800.000",
      transportation: "Jalan Kaki",
      fatherOccupation: "Buruh",
      siblings: 4,
    },
    {
      id: 6,
      name: "Rina Wati",
      nisn: "5678901234",
      class: "X IPS 3",
      gender: "Perempuan",
      address: "Jl. Diponegoro No. 34, Malang",
      parentIncome: "Rp 1.950.000",
      transportation: "Sepeda Motor",
      fatherOccupation: "Tidak Bekerja",
      siblings: 1,
    },
    {
      id: 7,
      name: "Doni Kusuma",
      nisn: "6789012345",
      class: "XII IPA 3",
      gender: "Laki-laki",
      address: "Jl. Imam Bonjol No. 67, Medan",
      parentIncome: "Rp 2.300.000",
      transportation: "Angkutan Umum",
      fatherOccupation: "PNS",
      siblings: 2,
    },
    {
      id: 8,
      name: "Maya Sari",
      nisn: "7890123456",
      class: "XI IPS 1",
      gender: "Perempuan",
      address: "Jl. Veteran No. 23, Makassar",
      parentIncome: "Rp 2.750.000",
      transportation: "Mobil Pribadi",
      fatherOccupation: "Karyawan Swasta",
      siblings: 3,
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

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

  // State untuk menu opsi titik tiga
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  // State untuk mode prediksi dan selected siswa
  const [predictMode, setPredictMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const togglePredictMode = () => {
    setPredictMode(true);
    setSelectedIds(new Set()); // Reset selection on start predict mode
    handleMenuClose();
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCancelPredict = () => {
    setPredictMode(false);
    setSelectedIds(new Set());
  };

  const handleDoPredict = () => {
    if (selectedIds.size === 0) {
      alert("Pilih siswa terlebih dahulu untuk prediksi.");
      return;
    }
    // Kirim selected ids via query param (contoh: ?ids=1,3,5)
    const idsParam = Array.from(selectedIds).join(",");
    router.push(`/admin/hasil-prediksi/daftar-prediksi?ids=${idsParam}`);
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
            href="/admin/data-siswa/input-data"
            sx={{ whiteSpace: "nowrap" }}
            disabled={predictMode}
          >
            Tambah Siswa
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
            disabled={predictMode}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-class-label">Semua Kelas</InputLabel>
            <Select
              labelId="filter-class-label"
              value={filterClass}
              label="Semua Kelas"
              onChange={(e) => setFilterClass(e.target.value)}
              disabled={predictMode}
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
              disabled={predictMode}
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
                {predictMode && (
                  <TableCell
                    padding="checkbox"
                    sx={{ minWidth: 40 }}
                    align="center"
                  >
                    {/* Checkbox header to select all */}
                    <Checkbox
                      indeterminate={selectedIds.size > 0 && selectedIds.size < filteredStudents.length}
                      checked={filteredStudents.length > 0 && selectedIds.size === filteredStudents.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(new Set(filteredStudents.map((s) => s.id)));
                        } else {
                          setSelectedIds(new Set());
                        }
                      }}
                      inputProps={{ "aria-label": "select all siswa" }}
                    />
                  </TableCell>
                )}
                <TableCell sx={{ fontWeight: "bold", minWidth: 120, textAlign: "center" }}>Nama</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 140, textAlign: "center" }}>Penghasilan Ortu</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 140, textAlign: "center" }}>Alat Transportasi</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 150, textAlign: "center" }}>Jumlah Tanggungan</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 140, textAlign: "center" }}>Pekerjaan Orang Tua</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 70, textAlign: "center" }}>Aksi</TableCell>
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
                  {predictMode && (
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        checked={selectedIds.has(student.id)}
                        onChange={() => handleSelect(student.id)}
                        inputProps={{ "aria-label": `select siswa ${student.name}` }}
                      />
                    </TableCell>
                  )}
                  <TableCell sx={{ textAlign: "center" }}>{student.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.parentIncome}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.transportation}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.siblings}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.fatherOccupation}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {!predictMode && (
                      <>
                        <IconButton
                          size="small"
                          aria-label="menu aksi"
                          onClick={(e) => handleMenuOpen(e, student.id)}
                        >
                          <MoreVert />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={menuRowId === student.id}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <MuiMenuItem
                            onClick={() => {
                              alert(`Edit data siswa ID ${student.id}`);
                              handleMenuClose();
                            }}
                          >
                            <Edit fontSize="small" sx={{ mr: 1 }} />
                            Edit
                          </MuiMenuItem>
                          <MuiMenuItem
                            onClick={() => {
                              alert(`Hapus data siswa ID ${student.id}`);
                              handleMenuClose();
                            }}
                          >
                            <Delete fontSize="small" sx={{ mr: 1 }} />
                            Delete
                          </MuiMenuItem>
                          <MuiMenuItem onClick={togglePredictMode}>
                            <PlaylistAddCheck fontSize="small" sx={{ mr: 1 }} />
                            Predict
                          </MuiMenuItem>
                        </Menu>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={predictMode ? 7 : 6} align="center" sx={{ py: 4 }}>
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

        {/* Predict Buttons */}
        {predictMode && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button variant="outlined" onClick={handleCancelPredict}>
              Batal Prediksi
            </Button>
            <Button
              variant="contained"
              startIcon={<PlaylistAddCheck />}
              onClick={handleDoPredict}
            >
              Prediksi
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
