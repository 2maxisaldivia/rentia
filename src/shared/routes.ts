export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  OWNER_DASHBOARD: '/owner/dashboard',
  OWNER_PROPERTIES: '/owner/properties',
  OWNER_PROPERTY_CREATE: '/owner/properties/new',
  OWNER_CONTRACTS: '/owner/contracts',
  OWNER_TENANT_DETAIL: '/owner/contracts/:contractId/tenant',
  OWNER_PROPERTY_DETAIL: '/owner/properties/:id',
  OWNER_PROFILE: '/owner/profile',

  TENANT_EXPLORE: '/tenant/explore',
  TENANT_RENTAL: '/tenant/rental',
  TENANT_CONTRACTS: '/tenant/contracts',
  TENANT_PROFILE: '/tenant/profile',
  TENANT_PROPERTY_DETAIL: '/tenant/properties/:id',
  TENANT_OWNER_DETAIL: '/tenant/properties/:propertyId/owner',
  TENANT_RENTAL_APPLICATION: '/tenant/properties/:id/apply',
};
