# SANI Site Survey Mailer

This is a minimal Cloudflare Worker that receives the site survey form and forwards it through Resend.

## Required setup

1. Create a Resend account.
2. Verify a sending domain or subdomain in Resend.
   - Recommended: a subdomain such as `mail.sino-addiction.org`.
3. Set the `MAIL_FROM` value in `wrangler.toml` to a verified sender, for example:
   - `SANI Survey <survey@mail.sino-addiction.org>`
4. Set the recipient address in `MAIL_TO`.
5. Create a Resend API key and store it as a Cloudflare secret:
   - `npx wrangler secret put RESEND_API_KEY`

## Deploy

From this directory:

```bash
npx wrangler deploy
```

After deployment, copy the Worker URL and set it as the GitHub Pages build variable:

```text
PUBLIC_SURVEY_ENDPOINT
```

The frontend will use that value to send form submissions directly to this Worker.
