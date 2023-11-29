import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const city = await req.json();
  try {
    const res = await fetch(
      `${process.env.BASE_URL}forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=5`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
