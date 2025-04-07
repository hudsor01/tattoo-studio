import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'fennyg83@gmail.com'
  const password = 'godmode'

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Upsert the admin user
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Admin user seeded:', email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
