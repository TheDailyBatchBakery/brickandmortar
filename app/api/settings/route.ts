import { NextRequest, NextResponse } from 'next/server';

// In-memory settings - in production, use a database
let settings = {
  orderingEnabled: true,
  businessHours: {
    open: '09:00',
    close: '17:00',
    cutoffHours: 2,
  },
  allowedZipCodes: [] as string[],
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();
    settings = { ...settings, ...updates };
    return NextResponse.json({ message: 'Settings updated', settings });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

