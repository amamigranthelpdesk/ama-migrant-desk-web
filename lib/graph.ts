export type CaseStatusValue = 'New' | 'In Review' | 'Referred' | 'Escalated' | 'Resolved' | 'Closed';

export interface CaseStatusResult {
  caseId: string;
  status: CaseStatusValue;
  referredTo: string | null;
  assignedTo: string | null;
  receivedBy: string | null;
  urgency: string | null;
  modified: string;
  summary: string | null;
  clientName: string | null;
}

export interface CreateCaseResult {
  caseId: string;
  itemId: string;
}

const TENANT_ID = process.env.AZURE_TENANT_ID;
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const LIST_ID = process.env.SHAREPOINT_LIST_ID;

/**
 * Requests an app-only access token via the client credentials flow.
 *
 * Requires an Azure AD app registration with the application permissions
 * `Sites.Read.All` (for getCaseStatus) and `Sites.ReadWrite.All` (for
 * createCase), with admin consent granted. See .env.local.example for the
 * environment variables this depends on.
 */
async function getAccessToken(): Promise<string> {
  const response = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      scope: 'https://graph.microsoft.com/.default',
    }),
  });
  const data = await response.json();
  if (!data.access_token) throw new Error('Failed to get access token');
  return data.access_token;
}

/**
 * Looks up a case by reference number only in the SharePoint list
 * backing the Operations Centre.
 */
export async function getCaseStatus(caseId: string): Promise<CaseStatusResult | null> {
  const token = await getAccessToken();

  console.log('[Graph] Looking up case:', caseId);
  console.log('[Graph] Site ID:', SITE_ID);
  console.log('[Graph] List ID:', LIST_ID);

  const filter = encodeURIComponent(`fields/Title eq '${caseId}'`);
  const url = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items?expand=fields&$filter=${filter}`;

  console.log('[Graph] URL:', url);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      ConsistencyLevel: 'eventual',
      Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly',
    },
  });

  const responseText = await response.text();
  console.log('[Graph] Status:', response.status);
  console.log('[Graph] Response:', responseText.slice(0, 500));

  if (!response.ok) {
    throw new Error(`Graph API request failed: ${response.status} ${responseText}`);
  }

  const data = JSON.parse(responseText);

  if (!data.value || data.value.length === 0) return null;

  const fields = data.value[0].fields;
  return {
    caseId: fields.Title,
    status: fields.CaseStatus,
    referredTo: fields.Referredto ?? null,
    assignedTo: fields.AssignedPersonnel ?? null,
    receivedBy: fields.Receivedby ?? null,
    urgency: fields.UrgencyLevel ?? null,
    modified: fields.Modified,
    summary: fields.SummaryofComplaint ?? null,
    clientName: fields.NameofClient ?? null,
  };
}

/**
 * Creates a new case item in the SharePoint list from a public form
 * submission, generating a case reference number in the form
 * AMA-MIG-YYMMDD-HHMM.
 */
export async function createCase(data: Record<string, string>): Promise<CreateCaseResult> {
  const token = await getAccessToken();

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const caseId = `AMA-MIG-${now.getFullYear().toString().slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

  const url = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${LIST_ID}/items`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Title: caseId,
        NameofClient: data.fullName || '',
        ContactNo: data.contactNumber || '',
        EmailAddress: data.email || '',
        ResidentialGPSAddress: data.location || '',
        ModeofComplaint: data.mode || 'Website',
        Gender: data.gender || '',
        Nationality: data.nationality || 'Ghanaian',
        MigrationStatus: data.migrationStatus || '',
        SummaryofComplaint: data.situation || '',
        Comments_x002f_Remarks: data.otherInfo || '',
        CaseStatus: 'New',
        Receivedby: 'Public Form',
        UrgencyLevel: 'Medium',
        AssignedPersonnel: 'Samson Asamoah-Okyere',
        Referredto: 'AMA Social Welfare',
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create case: ${err}`);
  }

  const result = await response.json();
  return { caseId, itemId: result.id };
}
