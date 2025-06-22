import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus },
  });

  return NextResponse.json(order);
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const userId = currentUser.id;

    const body = await req.json();
    const { cartProducts, totalAmount } = body;

    const paymentIntentId = Math.random().toString(36).substring(2);

    // Sanitize cartProducts: ensure brand is always a string
    const sanitizedProducts = (cartProducts ?? []).map((product: any) => ({
      ...product,
      brand: typeof product.brand === 'string' && product.brand ? product.brand : 'N/A',
    }));

    const order = await prisma.order.create({
      data: {
        userId,
        amount: totalAmount,
        currency: 'GHS',
        status: 'paid',
        paymentIntentId,
        products: sanitizedProducts,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order', details: error }, { status: 500 });
  }
}
