import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('emei');
    const collection = db.collection('waitlist');

    const lowerEmail = email.toLowerCase();
    
    // Check if email already exists
    const existingUser = await collection.findOne({ email: lowerEmail });
    if (existingUser) {
      return NextResponse.json({ 
        success: true, 
        message: 'You are already on the waitlist! We will be in touch.' 
      }, { status: 200 });
    }

    const timestamp = new Date();
    const headers = request.headers;
    
    // Get client IP
    const ip = headers.get('x-forwarded-for') || 'unknown';
    const userAgent = headers.get('user-agent') || 'unknown';
    const referer = headers.get('referer') || 'unknown';
    const language = headers.get('accept-language') || 'unknown';

    const result = await collection.insertOne({
      email: email.toLowerCase(),
      createdAt: timestamp,
      date: timestamp.toLocaleDateString(),
      time: timestamp.toLocaleTimeString(),
      metadata: {
        ip,
        userAgent,
        referer,
        language,
      }
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
