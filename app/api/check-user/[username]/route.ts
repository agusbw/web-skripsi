import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const user = await prisma.user.count({
    where: {
      username: params.username,
    },
  });

  if (user < 1) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({
    message: "User found",
  });
}
