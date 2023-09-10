import { fail } from '@sveltejs/kit';
import { sendPasswordlessLink } from '$lib/server/auth0';

export const actions = {
  default: async ({ cookies, request, url }) => {
    const data = await request.formData();
    const email = data.get('email');

    if (!email) {
      return fail(400, { email, error: 'missing' });
    }
    if (!/^.+@.+$/.test(email)) {
      return fail(400, { email, error: 'invalid_format' });
    }

    // stateはログインのリクエストがこのページから送られてきたことを確認するための文字列(コールバックURLの処理で一致していることを確かめる)
    // 通常はNode.jsはcrypto関数は利用できないが、SvelteKitがブラウザ互換のcrypto関数を用意しているため利用できるようになっている
    const state = crypto.randomUUID();
    const redirectUri = `${url.origin}/api/auth/callback`;
    await sendPasswordlessLink(email, state, redirectUri);

    cookies.set('state', state, { path: '/' });
    return { success: true };
  }
}