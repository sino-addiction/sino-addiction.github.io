export type DownloadEntry = {
  label: string;
  href: string;
  filename: string;
  description?: string;
};

export const downloadEntries: DownloadEntry[] = [
  {
    label: "研究计划v1.0",
    href: "/assets/downloads/research-plan-v1.0.doc",
    filename: "研究计划v1.0.doc",
    description: "Sino-Addiction Neuroimaging Initiatives 研究计划模板中文版",
  },
];
