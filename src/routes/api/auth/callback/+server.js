import { error, redirect } from '@sveltejs/kit';
import { createSession } from '$lib/server/session';
import { getProfile, getToken } from '$lib/server/auth0';

export async function GET({ cookies, url }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const redirectUri = `${url.origin}/api/auth/callback`;

  // stateを検証する(CSRF攻撃(Cross-Site Request Forgery)を防ぐため)
  const savedState = cookies.get('state');
  cookies.delete('state', { path: '/' });
  if (!state || !savedState || state !== savedState) {
    throw error(400, { message: 'state mismatch' });
  }

  // アクセストークンを取得する(redirectUriはなぜもう一度必要なのか)
  const auth0Token = await getToken(code, redirectUri);
  
  // ユーザー情報を取得する(subはAuth0のユーザーID)
  const { sub, email } = await getProfile(auth0Token);

  // MongoDBにセッション情報を保存する
  const sessionId = await createSession({ auth0Token, userId: sub, email });
  
  // セッションIDをクッキーに保存する
  cookies.set('svelte_ec_session', sessionId, { path: '/' });

  throw redirect(303, '/products/svelte-book');
}