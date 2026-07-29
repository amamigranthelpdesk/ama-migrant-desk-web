import { NextRequest, NextResponse } from 'next/server';
import { createCase } from '@/lib/graph';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.fullName || !data.contactNumber || !data.situation || !data.consent) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }
    const result = await createCase(data);
    return NextResponse.json({ success: true, caseId: result.caseId });
  } catch (error) {
    console.error('Case submission error:', error);
    return NextResponse.json({ error: 'Failed to submit case' }, { status: 500 });
  }
}
