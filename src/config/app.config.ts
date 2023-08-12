interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Real Estate Investor'],
  customerRoles: ['Customer'],
  tenantRoles: [
    'Real Estate Investor',
    'Due Diligence Uploader',
    'Private Funding Provider',
    'Creative Finance Partner',
  ],
  tenantName: 'Organization',
  applicationName: 'The Keith Lane Organization',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
