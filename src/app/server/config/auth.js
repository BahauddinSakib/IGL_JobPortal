import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma"; 

export async function getAuthUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        u_details: true,
        u_addresses: true,
      },
    });

    if (!user) return null;

    const { u_password, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    return null;
  }
}
