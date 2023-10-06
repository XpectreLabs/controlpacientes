const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUser(username, password) {
  const users = await prisma.users.findFirst({
    where: {
      username,
      password,
    },
    select: {
      user_id: true,
    },
  });

  if (users == null) return 0;

  return users.user_id;
}

module.exports = { findUser }