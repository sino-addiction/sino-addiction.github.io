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
    modalities: SiteStatusItem[];
    addictionTypes: SiteStatusItem[];
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
      { label: "参与站点", value: "10+", note: "覆盖多家高校与医疗机构，持续扩展中。" },
      { label: "被试人数", value: "2,000+", note: "多中心纳入样本，含不同成瘾类型与健康对照。" },
      { label: "在研项目", value: "4", note: "涉及脑网络、纵向随访、亚型识别与复发预测。" },
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
