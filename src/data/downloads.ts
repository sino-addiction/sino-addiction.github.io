export type DownloadEntry = {
  label: string;
  href: string;
  filename: string;
  description?: string;
};

export const downloadEntries: DownloadEntry[] = [
  {
    label: "SANI 合作备忘录 v1",
    href: "/assets/downloads/sani-cooperation-mou-v1.doc",
    filename: "SANI合作备忘录v1.doc",
    description: "中国成瘾神经影像协作计划（SANI）合作备忘录中文版本",
  },
  {
    label: "研究计划 v1.0",
    href: "/assets/downloads/research-plan-v1.0.doc",
    filename: "研究计划v1.0.doc",
    description: "SANI 研究计划模板中文版本",
  },
];
