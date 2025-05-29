-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "logo" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hasil" (
    "id" TEXT NOT NULL,
    "namaSiswa" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "Agama" TEXT NOT NULL,
    "alatTransportasi" TEXT NOT NULL,
    "pekerjaanOrtu" TEXT NOT NULL,
    "penghasilan" INTEGER NOT NULL,
    "tanggungan" TEXT NOT NULL,
    "statusKIP" TEXT NOT NULL,
    "statusPKH" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Hasil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekapHasil" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalLayak" INTEGER NOT NULL,
    "totalTidak" INTEGER NOT NULL,
    "totalSiswa" INTEGER NOT NULL,

    CONSTRAINT "RekapHasil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RekapHasil_userId_key" ON "RekapHasil"("userId");

-- AddForeignKey
ALTER TABLE "Hasil" ADD CONSTRAINT "Hasil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapHasil" ADD CONSTRAINT "RekapHasil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
