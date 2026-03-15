export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SiteStat = {
  label: string;
  value: string;
};

export type SiteMetric = {
  label: string;
  value: string;
};

type SiteData = {
  siteName: string;
  siteShortName: string;
  description: string;
  navigation: SiteLink[];
  footerLinks: SiteLink[];
  portal: {
    label: string;
    available: boolean;
    href?: string;
    note: string;
  };
  contact: {
    email: string;
    note: string;
  };
  homepage: {
    stats: SiteStat[];
    modalities: SiteMetric[];
    addictionTypes: SiteMetric[];
  };
  collaborationFlow: string[];
  networkMap: {
    label: string;
    city: string;
    x: number;
    y: number;
  }[];
};

export const siteData: SiteData = {
  siteName: "中国成瘾神经影像协作计划",
  siteShortName: "SANI",
  description:
    "SANI 致力于构建国内成瘾神经影像数据库，以多中心协作为基础推动标准化、可复现和高质量研究。",
  navigation: [
    { label: "首页", href: "/" },
    { label: "协作模式", href: "/collaboration" },
    { label: "项目管理", href: "/working-groups" },
    { label: "研究成果", href: "/publications" },
    { label: "关于我们", href: "/about" },
    { label: "加入我们", href: "/join-us" },
  ],
  footerLinks: [
    { label: "隐私政策", href: "mailto:sani@placeholder.org", external: true },
    { label: "联系我们", href: "mailto:sani@placeholder.org", external: true },
  ],
  portal: {
    label: "数据门户",
    available: false,
    note: "数据门户正在整理公开访问规则，当前站点仅展示合作信息。",
  },
  contact: {
    email: "sani@placeholder.org",
    note: "当前阶段为静态站点，合作申请与问题咨询统一通过邮箱收取。",
  },
  homepage: {
    stats: [
      { label: "参与站点", value: "10+" },
      { label: "被试人数", value: "2,000+" },
      { label: "在研项目", value: "4" },
    ],
    modalities: [
      { label: "结构 MRI", value: "待更新" },
      { label: "任务 MRI", value: "待更新" },
      { label: "静息态 MRI", value: "待更新" },
      { label: "静息态 EEG", value: "待更新" },
      { label: "任务 EEG", value: "待更新" },
    ],
    addictionTypes: [
      { label: "酒精使用障碍", value: "待更新" },
      { label: "尼古丁使用障碍", value: "待更新" },
      { label: "甲基苯丙胺使用障碍", value: "待更新" },
      { label: "新型精神活性物质相关", value: "待更新" },
      { label: "行为成瘾（网络/赌博）", value: "待更新" },
      { label: "健康对照", value: "待更新" },
    ],
  },
  collaborationFlow: ["数据提交", "集中处理", "分析产出", "成果沉淀"],
  networkMap: [
    { city: "北京", label: "张三", x: 332, y: 92 },
    { city: "上海", label: "王五", x: 394, y: 136 },
    { city: "广州", label: "陈八", x: 372, y: 230 },
    { city: "成都", label: "周八", x: 120, y: 180 },
    { city: "武汉", label: "李四", x: 330, y: 186 },
    { city: "西安", label: "赵六", x: 272, y: 138 },
  ],
};
