"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AdminNavbar from "../../../components/AdminNavbar";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  // CardFooter, // Hapus import ini
  Typography,
  Box,
} from "@mui/material";

import {
  ArrowLeft,
  FileUp,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ImportStudentsPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, success, error
  const [previewData, setPreviewData] = useState([]);

  function handleFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTimeout(() => {
        setPreviewData([
          {
            name: "Ahmad Fauzi",
            nisn: "1234567890",
            class: "XII IPA 1",
            gender: "Laki-laki",
            status: "Aktif",
          },
          {
            name: "Siti Nurhaliza",
            nisn: "0987654321",
            class: "XI IPS 2",
            gender: "Perempuan",
            status: "Aktif",
          },
          {
            name: "Budi Santoso",
            nisn: "2345678901",
            class: "X IPA 3",
            gender: "Laki-laki",
            status: "Aktif",
          },
        ]);
      }, 500);
    }
  }

  function handleUpload() {
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus("success");
    }, 2000);
  }

  return (
    <div className="flex">
      <AdminNavbar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-grow p-6 min-h-screen transition-all duration-300 ${
          sidebarOpen ? "ml-[256px]" : "ml-[64px]"
        }`}
        style={{ backgroundColor: "#f9fafb" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 mb-4 gap-3">
          <div>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Import Data Siswa
            </Typography>
            <Typography color="textSecondary">
              Import data siswa dari file CSV atau Excel
            </Typography>
          </div>

          <Button
            component={Link}
            href="/admin/data-siswa"
            variant="outlined"
            size="small"
            startIcon={<ArrowLeft />}
          >
            Kembali
          </Button>
        </div>

        <Card>
          <CardHeader
            title="Upload File"
            subheader="Upload file CSV atau Excel yang berisi data siswa"
          />
          <CardContent>
            <label
              htmlFor="fileInput"
              style={{ fontWeight: "600", display: "block", marginBottom: 8 }}
            >
              File CSV/Excel
            </label>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                id="fileInput"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                style={{
                  flexGrow: 1,
                  padding: "6px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <Button variant="outlined" size="small" startIcon={<Download />}>
                Template
              </Button>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 4 }}>
              Format file: CSV, XLS, atau XLSX. Ukuran maksimal: 5MB
            </p>

            {uploadStatus === "success" && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "#dcfce7",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CheckCircle2 color="#22c55e" />
                <Typography variant="body2" sx={{ color: "#15803d" }}>
                  Data siswa berhasil diimport.{" "}
                  <Link
                    href="/dashboard/students"
                    style={{ textDecoration: "underline", color: "#15803d" }}
                  >
                    Lihat data siswa
                  </Link>
                </Typography>
              </Box>
            )}

            {uploadStatus === "error" && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "#fee2e2",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AlertCircle color="#ef4444" />
                <Typography variant="body2" sx={{ color: "#b91c1c" }}>
                  Terjadi kesalahan saat mengimport data. Silakan periksa format
                  file dan coba lagi.
                </Typography>
              </Box>
            )}
          </CardContent>

          {/* Ganti CardFooter dengan Box */}
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Button
              variant="outlined"
              onClick={() => router.push("/admin/data-siswa")}
            >
              Batal
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading || uploadStatus === "success"}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                color: "#fff",
              }}
              startIcon={
                isUploading ? <Loader2 className="animate-spin" /> : <FileUp />
              }
            >
              {isUploading ? "Mengupload..." : "Upload dan Import"}
            </Button>
          </Box>
        </Card>

        {/* Preview Data */}
        {previewData.length > 0 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader
              title="Preview Data"
              subheader="Preview data yang akan diimport"
            />
            <CardContent sx={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 600,
                }}
              >
                <thead style={{ backgroundColor: "#f3f4f6" }}>
                  <tr>
                    <th
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "left",
                      }}
                    >
                      Nama
                    </th>
                    <th
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "left",
                      }}
                    >
                      NISN
                    </th>
                    <th
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "left",
                      }}
                    >
                      Kelas
                    </th>
                    <th
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "left",
                      }}
                    >
                      Jenis Kelamin
                    </th>
                    <th
                      style={{
                        padding: 12,
                        borderBottom: "1px solid #d1d5db",
                        textAlign: "left",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((student, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: 12, fontWeight: 600 }}>
                        {student.name}
                      </td>
                      <td style={{ padding: 12 }}>{student.nisn}</td>
                      <td style={{ padding: 12 }}>{student.class}</td>
                      <td style={{ padding: 12 }}>{student.gender}</td>
                      <td style={{ padding: 12 }}>
                        <span
                          style={{
                            backgroundColor: "#d1fae5",
                            color: "#065f46",
                            borderRadius: 9999,
                            padding: "0.125rem 0.625rem",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Typography
                sx={{ mt: 1, fontSize: "0.875rem", color: "#6b7280" }}
              >
                Menampilkan {previewData.length} dari {previewData.length} data
              </Typography>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
