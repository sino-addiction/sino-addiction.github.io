interface Env {
  RESEND_API_KEY: string;
  MAIL_FROM: string;
  MAIL_TO: string;
  ALLOWED_ORIGINS: string;
}

type SurveyPayload = {
  study_name?: string;
  pi_name?: string;
  institution?: string;
  email?: string;
  additional_contact?: string;
  addiction_category?: string;
  addiction_detail?: string;
  article_reference?: string;
  modalities?: string[];
  data_types?: string[];
  notes?: string;
  company_website?: string;
  submitted_at?: string;
  page_path?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const parseCsv = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const textValue = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const listValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => textValue(item)).filter(Boolean);
  }

  const single = textValue(value);
  return single ? [single] : [];
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });

const json = (body: Record<string, unknown>, status = 200, extraHeaders: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });

const corsHeaders = (origin: string | null, allowedOrigins: string[]) => {
  const resolvedOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0] ?? "*";

  return {
    "Access-Control-Allow-Origin": resolvedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
};

const buildTextSection = (title: string, entries: Array<[string, string | string[]]>) => {
  const lines: string[] = [];

  for (const [label, rawValue] of entries) {
    const value = Array.isArray(rawValue) ? rawValue.filter(Boolean).join(", ") : rawValue.trim();
    if (!value) continue;

    const [firstLine, ...restLines] = value.split(/\r?\n/);
    lines.push(`- ${label}: ${firstLine}`);

    for (const line of restLines) {
      lines.push(`  ${line}`);
    }
  }

  if (lines.length === 0) return null;
  return [`[${title}]`, ...lines].join("\n");
};

const buildHtmlSection = (title: string, entries: Array<[string, string | string[]]>) => {
  const rows = entries
    .map(([label, rawValue]) => {
      const value = Array.isArray(rawValue) ? rawValue.filter(Boolean).join(", ") : rawValue.trim();
      if (!value) return "";
      return `<tr><th style="text-align:left;padding:8px 12px;border:1px solid #d7dfdb;background:#f7f9f8;">${escapeHtml(
        label,
      )}</th><td style="padding:8px 12px;border:1px solid #d7dfdb;">${escapeHtml(value).replace(/\n/g, "<br />")}</td></tr>`;
    })
    .filter(Boolean)
    .join("");

  if (!rows) return "";

  return `
    <section style="margin:0 0 20px;">
      <h3 style="margin:0 0 10px;font-size:16px;line-height:1.4;color:#102132;">${escapeHtml(title)}</h3>
      <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
        <tbody>
          ${rows}
        </tbody>
      </table>
    </section>
  `;
};

const buildEmail = (payload: SurveyPayload) => {
  const submittedAt = payload.submitted_at || new Date().toISOString();
  const pagePath = payload.page_path || "/";

  const sections = [
    buildTextSection("Basic information", [
      ["Study / site name", textValue(payload.study_name)],
      ["PI name", textValue(payload.pi_name)],
      ["Institution", textValue(payload.institution)],
      ["Email", textValue(payload.email)],
      ["Additional contact", textValue(payload.additional_contact)],
    ]),
    buildTextSection("Addiction category", [
      ["Main category", textValue(payload.addiction_category)],
      ["Detail", textValue(payload.addiction_detail)],
    ]),
    buildTextSection("Article", [["Reference", textValue(payload.article_reference)]]),
    buildTextSection("Modalities and data", [
      ["Modalities", listValue(payload.modalities)],
      ["Data types", listValue(payload.data_types)],
    ]),
    buildTextSection("Notes", [["Notes", textValue(payload.notes)]]),
    buildTextSection("Metadata", [
      ["Submitted at", submittedAt],
      ["Page path", pagePath],
    ]),
  ].filter(Boolean) as string[];

  const text = ["SANI site survey submission", ...sections].join("\n\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#162434;line-height:1.6;">
      <h2 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#102132;">SANI site survey submission</h2>
      ${buildHtmlSection("Basic information", [
        ["Study / site name", textValue(payload.study_name)],
        ["PI name", textValue(payload.pi_name)],
        ["Institution", textValue(payload.institution)],
        ["Email", textValue(payload.email)],
        ["Additional contact", textValue(payload.additional_contact)],
      ])}
      ${buildHtmlSection("Addiction category", [
        ["Main category", textValue(payload.addiction_category)],
        ["Detail", textValue(payload.addiction_detail)],
      ])}
      ${buildHtmlSection("Article", [["Reference", textValue(payload.article_reference)]])}
      ${buildHtmlSection("Modalities and data", [
        ["Modalities", listValue(payload.modalities)],
        ["Data types", listValue(payload.data_types)],
      ])}
      ${buildHtmlSection("Notes", [["Notes", textValue(payload.notes)]])}
      ${buildHtmlSection("Metadata", [
        ["Submitted at", submittedAt],
        ["Page path", pagePath],
      ])}
    </div>
  `;

  const subject = `SANI site survey - ${textValue(payload.study_name) || "new submission"}`;

  return { subject, text, html };
};

const hasAllowedOrigin = (origin: string | null, allowedOrigins: string[]) => {
  if (!origin) return true;
  return allowedOrigins.includes(origin);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = parseCsv(env.ALLOWED_ORIGINS);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, allowedOrigins);

    if (!hasAllowedOrigin(origin, allowedOrigins)) {
      return json({ error: "Forbidden origin" }, 403, cors);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    const contentType = request.headers.get("Content-Type") || "";
    let payload: SurveyPayload;

    if (contentType.includes("application/json")) {
      payload = (await request.json()) as SurveyPayload;
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      payload = {
        study_name: textValue(formData.get("study_name")),
        pi_name: textValue(formData.get("pi_name")),
        institution: textValue(formData.get("institution")),
        email: textValue(formData.get("email")),
        additional_contact: textValue(formData.get("additional_contact")),
        addiction_category: textValue(formData.get("addiction_category")),
        addiction_detail: textValue(formData.get("addiction_detail")),
        article_reference: textValue(formData.get("article_reference")),
        modalities: listValue(formData.getAll("modalities")),
        data_types: listValue(formData.getAll("data_types")),
        notes: textValue(formData.get("notes")),
        company_website: textValue(formData.get("company_website")),
        submitted_at: textValue(formData.get("submitted_at")),
        page_path: textValue(formData.get("page_path")),
      };
    } else {
      return json({ error: "Unsupported content type" }, 415, cors);
    }

    if (textValue(payload.company_website)) {
      return json({ ok: true, skipped: true }, 200, cors);
    }

    const { subject, text, html } = buildEmail(payload);
    const submitterEmail = textValue(payload.email);

    const resendPayload: Record<string, unknown> = {
      from: env.MAIL_FROM,
      to: [env.MAIL_TO],
      subject,
      text,
      html,
    };

    if (submitterEmail) {
      resendPayload.reply_to = submitterEmail;
    }

    const emailResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      return json(
        {
          error: "Failed to send email",
          details: errorText,
        },
        502,
        cors,
      );
    }

    return json({ ok: true }, 200, cors);
  },
};
