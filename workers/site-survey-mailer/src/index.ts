interface Env {
  RESEND_API_KEY: string;
  MAIL_FROM: string;
  MAIL_TO: string;
  ALLOWED_ORIGINS: string;
}

type SelectedItem = {
  label?: string;
  case_count?: string;
  control_count?: string;
};

type SurveyPayload = {
  study_name?: string;
  pi_name?: string;
  institution?: string;
  email?: string;
  wechat_number?: string;
  additional_contact?: string;
  addiction_category?: string;
  addiction_detail?: string;
  article_reference?: string;
  modalities?: SelectedItem[] | string[];
  data_types?: SelectedItem[] | string[];
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

const normalizeSelectedItems = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") {
        const label = textValue(item);
        return label ? { label, case_count: "", control_count: "" } : null;
      }

      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;
      const label = textValue(record.label);
      if (!label) return null;

      return {
        label,
        case_count: textValue(record.case_count),
        control_count: textValue(record.control_count),
      };
    })
    .filter(Boolean) as SelectedItem[];
};

const formatSelectedItems = (items: SelectedItem[]) =>
  items.map((item) => [
    item.label || "",
    `case: ${item.case_count || "未填写"}，control: ${item.control_count || "未填写"}`,
  ] as [string, string]);

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
  const modalities = normalizeSelectedItems(payload.modalities);
  const dataTypes = normalizeSelectedItems(payload.data_types);

  const sections = [
    buildTextSection("站点基本信息", [
      ["站点 / 研究名称", textValue(payload.study_name)],
      ["PI 姓名", textValue(payload.pi_name)],
      ["机构", textValue(payload.institution)],
      ["邮箱", textValue(payload.email)],
      ["微信号", textValue(payload.wechat_number)],
      ["补充联系人", textValue(payload.additional_contact)],
    ]),
    buildTextSection("成瘾类别", [
      ["主要成瘾类别", textValue(payload.addiction_category)],
      ["补充类别说明", textValue(payload.addiction_detail)],
    ]),
    buildTextSection("文章信息", [["文章信息", textValue(payload.article_reference)]]),
    buildTextSection("模态", formatSelectedItems(modalities)),
    buildTextSection("数据类型", formatSelectedItems(dataTypes)),
    buildTextSection("备注", [["补充说明", textValue(payload.notes)]]),
    buildTextSection("元数据", [
      ["提交时间", submittedAt],
      ["页面路径", pagePath],
    ]),
  ].filter(Boolean) as string[];

  const text = ["SANI 站点调查表提交", ...sections].join("\n\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#162434;line-height:1.6;">
      <h2 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:#102132;">SANI 站点调查表提交</h2>
      ${buildHtmlSection("站点基本信息", [
        ["站点 / 研究名称", textValue(payload.study_name)],
        ["PI 姓名", textValue(payload.pi_name)],
        ["机构", textValue(payload.institution)],
        ["邮箱", textValue(payload.email)],
        ["微信号", textValue(payload.wechat_number)],
        ["补充联系人", textValue(payload.additional_contact)],
      ])}
      ${buildHtmlSection("成瘾类别", [
        ["主要成瘾类别", textValue(payload.addiction_category)],
        ["补充类别说明", textValue(payload.addiction_detail)],
      ])}
      ${buildHtmlSection("文章信息", [["文章信息", textValue(payload.article_reference)]])}
      ${buildHtmlSection("模态", formatSelectedItems(modalities))}
      ${buildHtmlSection("数据类型", formatSelectedItems(dataTypes))}
      ${buildHtmlSection("备注", [["补充说明", textValue(payload.notes)]])}
      ${buildHtmlSection("元数据", [
        ["提交时间", submittedAt],
        ["页面路径", pagePath],
      ])}
    </div>
  `;

  const subject = `SANI 站点调查表 - ${textValue(payload.study_name) || "新提交"}`;

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
    if (!contentType.includes("application/json")) {
      return json({ error: "Unsupported content type" }, 415, cors);
    }

    const payload = (await request.json()) as SurveyPayload;

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
