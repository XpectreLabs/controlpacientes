async function findUser(username, password) { 

  console.log(username, password)
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


module.exports = findUser;