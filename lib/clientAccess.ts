import 'server-only';

export const CLIENT_ACCESS_COOKIE = 'sweetpear-client-access';
export const CLIENT_ACCESS_VALUE = 'granted';

export function getClientPortalPassword() {
  return process.env.CLIENT_PORTAL_PASSWORD ?? '';
}
