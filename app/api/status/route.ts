import { NextRequest, NextResponse } from 'next/server';
import { getCaseStatus } from '@/lib/graph';

export async function POST(req: NextRequest) {
  try {
    const { caseId, contactNumber } = await req.json();
    if (!caseId || !contactNumber) {
      return NextResponse.json({ error: 'Case ID and contact number are required' }, { status: 400 });
    }
    const result = await getCaseStatus(caseId.trim(), contactNumber.trim());
    if (!result) {
      return NextResponse.json({ found: false }, { status: 200 });
    }
    return NextResponse.json({ found: true, case: result });
  } catch (error) {
    console.error('Status lookup error:', error);
    return NextResponse.json({ error: 'Failed to look up case status' }, { status: 500 });
  }
}
