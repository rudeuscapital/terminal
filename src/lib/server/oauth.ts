import { GitHub } from 'arctic';
import { env } from '$env/dynamic/private';

const clientId = env.GITHUB_CLIENT_ID;
const clientSecret = env.GITHUB_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('Missing GitHub OAuth env vars (GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET)');
}

export const github = new GitHub(
  clientId,
  clientSecret,
  // ganti ini dengan URL production kamu nanti
  `${env.BASE_URL ?? 'http://localhost:5173'}/login/github/callback`
);
