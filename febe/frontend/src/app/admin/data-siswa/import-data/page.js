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
  Typography,
  Box,
} from "@mui/material";

import {
  ArrowLeft,
  FileUp,
  Download,
  Loader2,
} from "lucide-react";

export default function ImportStudentsPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, success, error

  function handleFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/siswa/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
        setFile(null);
        setIsUploading(false);
      } else {
        setUploadStatus("error");
        setIsUploading(false);
      }
    } catch (error) {
      console.log("Error uploading file:", error);
      setUploadStatus("error");
      setIsUploading(false);
    }
    
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
              Pilih File CSV/Excel
            </label>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                id="fileInput"
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleFileChange}
                style={{
                  flexGrow: 1,
                  padding: "6px 8px",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
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
                <Typography variant="body2" sx={{ color: "#15803d" }}>
                  Data siswa berhasil diimport.{" "}
                  <Link
                    href="/admin/data-siswa "
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
                <Typography variant="body2" sx={{ color: "#b91c1c" }}>
                  Terjadi kesalahan saat mengimport data. Silakan periksa format
                  file dan coba lagi.
                </Typography>
              </Box>
            )}
          </CardContent>

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
      </main>
    </div>
  );
}
