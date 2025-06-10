"use client";
import { useEffect, useState } from "react";
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
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://pip-clasification-app-production.up.railway.app/siswa", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data);
      });
  }, []);

  const [model, setModel] = useState(null);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const loadModel = async () => {
      try {
        if (model) {
          model.dispose();
        }

        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
        loadedModel.summary();
      } catch (error) {
        console.error("❌ Gagal memuat model:", error);
      }
    };

    loadModel();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPenghasilan, setFilterPenghasilan] = useState("all");
  const [filterTransportasi, setFilterTransportasi] = useState("all");
  const [filterPekerjaanOrtu, setFilterPekerjaanOrtu] = useState("all");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Filter data
  const filteredStudents = students.filter((s) => {
    return (
      (s.namaSiswa.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPenghasilan === "all" || s.penghasilan === filterPenghasilan) &&
      (filterTransportasi === "all" || s.alatTransportasi === filterTransportasi) &&
      (filterPekerjaanOrtu === "all" || s.pekerjaanOrtu === filterPekerjaanOrtu)
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
  const [predictedStudents, setPredictedStudents] = useState([]);

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

  const handleSaveResults = async (predictedStudents) => {
    try {
      const response = await fetch("https://pip-clasification-app-production.up.railway.app/hasil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          results: predictedStudents.map((siswa) => ({
            siswaId: siswa.id,
            status: siswa.prediksi,
            skor: siswa.score,
          })),
        }),
      });

      const data = await response.json();
      console.log("Sukses simpan:", data);
      alert("Seluruh hasil prediksi berhasil disimpan.");
    } catch (error) {
      console.log("Gagal menyimpan:", error);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  const handleDoPredict = async () => {
    const tf = await import('@tensorflow/tfjs');
    const model = await tf.loadLayersModel('/model/model.json');
    setResult(null);
    setPredictedStudents([]); // reset

    if (selectedIds.size === 0) {
      alert("Pilih siswa terlebih dahulu untuk prediksi.");
      return;
    }

    if (!model) {
      alert("Model belum siap!");
      return;
    }

    const mapToNumber = (value, map) => map[value] ?? 0;

    const pekerjaanOrtuMap = {
      "Wirausaha": 4,
      "Lainnya": 1,
      "Peternak": 3,
      "Petani": 2,
      "Buruh": 0,
    };

    const transportasiMap = {
      "Jalan Kaki": 0,
      "Sepeda Motor": 2,
      "Lainnya": 1
    };

    const yaTidakMap = {
      "Ya": 1,
      "Tidak": 0,
    };

    const tanggunganMap = {
      "1": 0,
      "Lebih dari 3": 3,
      "2": 1,
      "3": 2,
    };

    const penghasilanMap = (penghasilan) => {
      if (penghasilan <= 1500000) return 0;
      if (penghasilan <= 3000000) return 1;
      return 2;
    };

    const selectedStudents = students.filter((student) => selectedIds.has(student.id));

    const selectedData = selectedStudents.map((student) => [
      mapToNumber(student.alatTransportasi, transportasiMap),
      mapToNumber(student.pekerjaanOrtu, pekerjaanOrtuMap),
      Number(penghasilanMap(student.penghasilan)),
      mapToNumber(student.tanggungan, tanggunganMap),
      mapToNumber(student.statusKIP, yaTidakMap),
      mapToNumber(student.statusPKH, yaTidakMap),
    ]);

    if (selectedData.length === 0) {
      alert("Data siswa tidak ditemukan.");
      return;
    }

    try {
      const inputTensor = tf.tensor2d(selectedData);
      const prediction = model.predict(inputTensor);
      const values = await prediction.data();
      const resultArray = Array.from(values);

      setResult(resultArray);

      const resultWithStudent = selectedStudents.map((student, index) => ({
        ...student,
        prediksi: resultArray[index] >= 0.5 ? "Layak" : "Tidak Layak", // threshold bisa disesuaikan
        score: resultArray[index]
      }));

      setPredictedStudents(resultWithStudent);
      await handleSaveResults(resultWithStudent);
      console.log("Hasil prediksi:", resultWithStudent);
    } catch (error) {
      console.log("Gagal melakukan prediksi:", error);
      alert("Terjadi kesalahan saat memproses prediksi.");
    }
  };

  const handleEditSiswa = (id) => {
    router.push(`/admin/data-siswa/input-data?id=${id}`);
  };

  const handleDeleteSiswa = (id) => {
    try {
      fetch(`https://pip-clasification-app-production.up.railway.app/siswa/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(response => {
        if (response.ok) {
          alert("Data siswa berhasil dihapus.");
          window.location.reload();
        } else {
          alert("Gagal menghapus data siswa.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Format penghasilan untuk tampilan
  const formatRupiah = (angka) => {
    if (!angka) return "";
    return "Rp " + new Intl.NumberFormat("id-ID").format(angka);
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Data Siswa
          </Typography>
          <Typography color="text.secondary">
            Kelola data siswa untuk seleksi penerima bantuan PIP
          </Typography>
        </Box>

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

          <Button
            variant="contained"
            startIcon={<PlaylistAddCheck />}
            onClick={togglePredictMode}
            disabled={predictMode}
          >
            Prediksi
          </Button>
        </Box>

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
              startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            sx={{ minWidth: 200 }}
            disabled={predictMode}
          />
        </Box>

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
                <TableCell sx={{ fontWeight: "bold", minWidth: 140, textAlign: "center" }}>Status Memiliki KIP</TableCell>
                <TableCell sx={{ fontWeight: "bold", minWidth: 140, textAlign: "center" }}>Status Memiliki KPS</TableCell>
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
                  <TableCell sx={{ textAlign: "center" }}>{student.namaSiswa}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {formatRupiah(student.penghasilan)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.alatTransportasi}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.tanggungan}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.pekerjaanOrtu}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.statusKIP}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{student.statusPKH}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
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
                      <MuiMenuItem onClick={() => handleEditSiswa(student.id)}>
                        <Edit fontSize="small" sx={{ mr: 1 }} />
                        Edit
                      </MuiMenuItem>

                      <MuiMenuItem onClick={() => handleDeleteSiswa(student.id)}>
                        <Delete fontSize="small" sx={{ mr: 1 }} />
                        Delete
                      </MuiMenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={predictMode ? 9 : 8} align="center" sx={{ py: 4 }}>
                    Tidak ada data siswa ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
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

        {/* Predict Buttons Outside */}
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
