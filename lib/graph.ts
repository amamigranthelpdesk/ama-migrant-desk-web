export type CaseStatusValue = 'New' | 'In Review' | 'Referred' | 'Escalated' | 'Resolved' | 'Closed';

export interface CaseStatusResult {
  caseId: string;
  status: CaseStatusValue;
  referredTo: string | null;
  lastUpdated: string;
}

/**
 * Looks up a case by reference number and contact number.
 *
 * TODO: Microsoft Graph API is not yet connected. Once the Azure AD app
 * registration is complete (see .env.local.example), replace this stub
 * with the implementation below.
 *
 * Steps to connect Microsoft Graph:
 * 1. Register an app in Azure AD (portal.azure.com > App registrations).
 * 2. Grant it the application permission `Sites.Read.All` and have an
 *    admin grant consent.
 * 3. Create a client secret and store AZURE_CLIENT_ID, AZURE_CLIENT_SECRET,
 *    and AZURE_TENANT_ID in .env.local.
 * 4. Find your SharePoint site ID:
 *    GET https://graph.microsoft.com/v1.0/sites/{hostname}:/sites/{site-path}
 *    Store it as SHAREPOINT_SITE_ID.
 * 5. Find the list ID for the cases list:
 *    GET https://graph.microsoft.com/v1.0/sites/{siteId}/lists
 *    Store it as SHAREPOINT_LIST_ID.
 * 6. Uncomment the implementation below. It is called from
 *    app/api/status/route.ts, which is a server-only route so the client
 *    secret is never exposed to the browser.
 */
export async function getCaseStatus(
  caseId: string,
  contactNumber: string
): Promise<CaseStatusResult | null> {
  // Stub implementation — no live Graph API connection yet.
  return null;

  /* ---- Full implementation, ready to uncomment once Azure AD is set up ----

  const tenantId = process.env.AZURE_TENANT_ID!;
  const clientId = process.env.AZURE_CLIENT_ID!;
  const clientSecret = process.env.AZURE_CLIENT_SECRET!;
  const siteId = process.env.SHAREPOINT_SITE_ID!;
  const listId = process.env.SHAREPOINT_LIST_ID!;

  // 1. Get an app-only access token via client credentials flow.
  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  );

  if (!tokenResponse.ok) {
    throw new Error('Failed to authenticate with Microsoft Graph');
  }

  const { access_token: accessToken } = await tokenResponse.json();

  // 2. Query the SharePoint list for a matching item.
  // Title is assumed to hold the case reference number, and a custom
  // field ContactNo holds the contact number used at submission.
  const filter = encodeURIComponent(
    `fields/Title eq '${caseId}' and fields/ContactNo eq '${contactNumber}'`
  );
  const listResponse = await fetch(
    `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields&$filter=${filter}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!listResponse.ok) {
    throw new Error('Failed to query case list');
  }

  const data = await listResponse.json();
  const item = data.value?.[0];

  if (!item) {
    return null;
  }

  return {
    caseId: item.fields.Title,
    status: item.fields.Status,
    referredTo: item.fields.ReferredTo ?? null,
    lastUpdated: item.fields.Modified,
  };

  ---- end full implementation ---- */
}
