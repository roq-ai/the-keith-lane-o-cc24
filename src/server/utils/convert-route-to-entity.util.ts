const mapping: Record<string, string> = {
  'due-diligences': 'due_diligence',
  'finance-partners': 'finance_partner',
  'funding-providers': 'funding_provider',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
