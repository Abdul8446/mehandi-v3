// /app/api/test-db/route.ts
import dbConnect from '@/lib/mongoose';

export async function GET() {
  try {
    await dbConnect();
    return new Response("Connected to DB!", { status: 200 });
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 });
  }
}