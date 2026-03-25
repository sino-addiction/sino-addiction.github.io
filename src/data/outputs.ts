export type OutputTool = {
  name: string;
  description: string;
  href: string;
  sourceLabel: string;
  linkLabel: string;
  tags: string[];
};

export const paperPlaceholder = {
  eyebrow: "敬请期待",
  title: "期待你的加入",
  description:
    "当真实论文完成后，这里会按正式信息持续更新，不使用虚构题目、作者、期刊或 DOI。",
};

export const researchTools: OutputTool[] = [
  {
    name: "authordown",
    description: "用于多人作者信息管理与稿件前置信息生成的 R 工具，适合标准化署名和前置页整理。",
    href: "https://github.com/zh1peng/authordown",
    sourceLabel: "GitHub",
    linkLabel: "打开仓库",
    tags: ["R", "Manuscript", "Authorship"],
  },
  {
    name: "BrainEnrich",
    description: "用于影像衍生表型与转录组富集分析的 R 工具，帮助把脑影像表型与分子机制连接起来。",
    href: "https://github.com/zh1peng/BrainEnrich",
    sourceLabel: "GitHub",
    linkLabel: "打开仓库",
    tags: ["R", "Transcriptomics", "Enrichment"],
  },
  {
    name: "EEGflow",
    description: "面向 EEG 预处理与分析的 MATLAB 工作流，采用 state + pipeline 结构组织步骤。",
    href: "https://github.com/zh1peng/EEGflow",
    sourceLabel: "GitHub",
    linkLabel: "打开仓库",
    tags: ["MATLAB", "EEG", "Pipeline"],
  },
  {
    name: "roiflow",
    description: "用于 ROI 影像数据分析、预处理、质控与聚类的 R 工作流。",
    href: "https://github.com/zh1peng/roiflow",
    sourceLabel: "GitHub",
    linkLabel: "打开仓库",
    tags: ["R", "ROI", "QC"],
  },
  {
    name: "TaskBeacon",
    description: "标准化实验任务生态，聚合 canonical tasks、TAPS、PsyFlow 预览和贡献指南。",
    href: "https://taskbeacon.github.io/",
    sourceLabel: "Official site",
    linkLabel: "打开官网",
    tags: ["Task design", "Reproducibility", "Collaboration"],
  },
];
