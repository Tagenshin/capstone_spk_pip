const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDB() {
  const users = await prisma.user.findMany();
  console.log(users);
  await prisma.$disconnect();
}

checkDB();