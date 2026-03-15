export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SiteStat = {
  label: string;
  value: string;
  note: string;
};

export type SiteStatusItem = {
  name: string;
  status: "available" | "integrating" | "planned";
  note: string;
};

export type CollaborationSite = {
  id: string;
  city: string;
  label: string;
  institution: string;
  sampleSize: string;
  memberCount: string;
  x: number;
  y: number;
  panelPlacement: "top-left" | "top-right" | "right" | "bottom-left" | "bottom-right";
  connectorPath: string;
};

type SiteData = {
  siteName: string;
  siteShortName: string;
  siteFullNameEn: string;
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
    modalities: SiteStatusItem[];
    addictionTypes: SiteStatusItem[];
  };
  collaborationFlow: string[];
  collaborationSites: CollaborationSite[];
  networkMap: {
    label: string;
    city: string;
    institution: string;
    count: string;
    x: number;
    y: number;
  }[];
};

export const siteData: SiteData = {
  siteName: "中国成瘾神经影像协作计划",
  siteShortName: "SANI",
  siteFullNameEn: "Sino Addiction Neuroimaging Initiative",
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
      { label: "参与站点", value: "10+", note: "覆盖多家高校与医疗机构，持续扩展中。" },
      { label: "被试人数", value: "2,000+", note: "多中心纳入样本，含不同成瘾类型与健康对照。" },
      { label: "已有项目", value: "4", note: "涉及脑网络、纵向随访、亚型识别与复发预测。" },
    ],
    modalities: [
      { name: "结构 MRI", status: "integrating", note: "正在进行跨中心参数清洗与一致化整理。" },
      { name: "任务 MRI", status: "planned", note: "按任务范式分批接入，优先建设高复用任务集。" },
      { name: "静息态 MRI", status: "available", note: "已形成首批可分析版本并进入质控复核阶段。" },
      { name: "静息态 EEG", status: "planned", note: "规划中，待完成站点采集协议统一后接入。" },
      { name: "任务 EEG", status: "integrating", note: "正在整合行为同步信息与预处理流程。" },
    ],
    addictionTypes: [
      { name: "酒精使用障碍", status: "available", note: "已建立核心样本子集，可用于多中心联合分析。" },
      { name: "尼古丁使用障碍", status: "integrating", note: "样本持续纳入，正在统一量表口径与随访字段。" },
      { name: "甲基苯丙胺使用障碍", status: "integrating", note: "关键临床变量与影像字段处于联合清理阶段。" },
      { name: "新型精神活性物质相关", status: "planned", note: "处于样本框架设计与伦理资料准备阶段。" },
      { name: "行为成瘾（网络/赌博）", status: "available", note: "已形成纵向队列基础，可开展冲动控制相关研究。" },
      { name: "健康对照", status: "available", note: "作为跨站点校正与比较基线持续维护。" },
    ],
  },
  collaborationFlow: ["数据汇聚", "标准化处理", "协作分析", "成果沉淀"],
  collaborationSites: [
    {
      id: "beijing",
      city: "北京",
      label: "北京中心",
      institution: "北京大学第六医院",
      sampleSize: "样本 450",
      memberCount: "成员 26",
      x: 338,
      y: 86,
      panelPlacement: "top-right",
      connectorPath: "M338 86 C390 78,444 64,504 46",
    },
    {
      id: "shanghai",
      city: "上海",
      label: "上海中心",
      institution: "上海市精神卫生中心",
      sampleSize: "样本 320",
      memberCount: "成员 22",
      x: 404,
      y: 150,
      panelPlacement: "right",
      connectorPath: "M404 150 C446 152,476 156,510 164",
    },
    {
      id: "guangzhou",
      city: "广州",
      label: "广州中心",
      institution: "南方医科大学",
      sampleSize: "样本 210",
      memberCount: "成员 18",
      x: 356,
      y: 246,
      panelPlacement: "bottom-right",
      connectorPath: "M356 246 C406 278,452 296,504 318",
    },
    {
      id: "wuhan",
      city: "武汉",
      label: "武汉中心",
      institution: "武汉大学人民医院",
      sampleSize: "样本 160",
      memberCount: "成员 16",
      x: 324,
      y: 188,
      panelPlacement: "right",
      connectorPath: "M324 188 C382 192,442 198,510 204",
    },
    {
      id: "xian",
      city: "西安",
      label: "西安中心",
      institution: "空军军医大学",
      sampleSize: "样本 120",
      memberCount: "成员 14",
      x: 254,
      y: 148,
      panelPlacement: "top-left",
      connectorPath: "M254 148 C208 122,150 92,88 60",
    },
    {
      id: "chengdu",
      city: "成都",
      label: "成都中心",
      institution: "四川大学华西医院",
      sampleSize: "样本 280",
      memberCount: "成员 17",
      x: 206,
      y: 214,
      panelPlacement: "bottom-left",
      connectorPath: "M206 214 C164 250,124 284,74 318",
    },
  ],
  networkMap: [
    { city: "北京", institution: "北京大学第六医院", count: "450 样本", label: "张三", x: 332, y: 92 },
    { city: "上海", institution: "上海市精神卫生中心", count: "320 样本", label: "王五", x: 394, y: 136 },
    { city: "广州", institution: "南方医科大学", count: "210 样本", label: "陈八", x: 372, y: 230 },
    { city: "成都", institution: "四川大学华西医院", count: "280 样本", label: "周八", x: 120, y: 180 },
    { city: "武汉", institution: "武汉大学人民医院", count: "160 样本", label: "李四", x: 330, y: 186 },
    { city: "西安", institution: "空军军医大学", count: "120 样本", label: "赵六", x: 272, y: 138 },
  ],
};
