import { NextRequest, NextResponse } from 'next/server';
import { getCaseStatus } from '@/lib/graph';

export async function POST(request: NextRequest) {
  try {
    const { caseId, contactNumber } = await request.json();

    if (!caseId || !contactNumber) {
      return NextResponse.json({ found: false, message: 'Case reference and contact number are required' }, { status: 400 });
    }

    // TODO: Replace with Microsoft Graph API call once Azure AD app is registered.
    // GET https://graph.microsoft.com/v1.0/sites/{siteId}/lists/{listId}/items
    // Filter: fields/Title eq '{caseId}' and fields/ContactNo eq '{contactNumber}'
    // See lib/graph.ts for the full implementation, ready to uncomment.
    const result = await getCaseStatus(caseId, contactNumber);

    if (!result) {
      return NextResponse.json({ found: false, message: 'Graph API not yet configured' });
    }

    return NextResponse.json({ found: true, case: result });
  } catch (error) {
    return NextResponse.json({ found: false, message: 'Failed to check case status' }, { status: 500 });
  }
}
