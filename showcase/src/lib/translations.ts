import type { Locale } from './locale'

export interface Translations {
  // ── Sidebar ──────────────────────────────────────────────────────────────
  sidebarComponentList: string
  sidebarTagline: string

  // ── ShowcaseHeader ───────────────────────────────────────────────────────
  headerSubtitle: string
  statComponents: string
  statTokens: string
  statProducts: string

  // ── Section subtitles (titleJa equivalent) ───────────────────────────────
  sectionSubtitleButton: string
  sectionSubtitleInput: string
  sectionSubtitleCard: string
  sectionSubtitleBadge: string
  sectionSubtitleSkeleton: string
  sectionSubtitleDialog: string
  sectionSubtitleNavigation: string
  sectionSubtitleEmptyState: string

  // ── ButtonSection ────────────────────────────────────────────────────────
  btnLoading: string
  btnDisabled: string
  btnAction: string

  // ── InputSection ─────────────────────────────────────────────────────────
  inputLabelStoreName: string
  inputPlaceholderStoreName: string
  inputPlaceholderNoLabel: string
  inputLabelEmail: string
  inputHelperEmail: string
  inputLabelPhone: string
  inputPlaceholderPhone: string
  inputErrorPhone: string
  inputLabelPassword: string
  inputPlaceholderPassword: string
  inputErrorPassword: string
  inputHelperPassword: string
  inputLabelRegistered: string
  inputValueRegistered: string

  // ── CardSection ──────────────────────────────────────────────────────────
  cardSalesLabel: string
  cardSalesSubLabel: string
  cardStore1: string
  cardStore2: string
  cardStaffCount: string
  cardPlanLabel: string
  cardPlanBadge: string
  cardPlanDesc: string

  // ── BadgeSection ─────────────────────────────────────────────────────────
  badgeLabelGreen: string
  badgeLabelAmber: string
  badgeLabelRed: string
  badgeLabelBlue: string
  badgeLabelGray: string
  badgeLabelBrand: string
  badgeContextTitle: string
  badgeRow1Name: string
  badgeRow1Shift: string
  badgeRow1Status: string
  badgeRow2Name: string
  badgeRow2Shift: string
  badgeRow2Status: string
  badgeRow3Name: string
  badgeRow3Shift: string
  badgeRow3Status: string

  // ── SkeletonSection ──────────────────────────────────────────────────────
  skeletonCardLabel: string

  // ── DialogSection ────────────────────────────────────────────────────────
  dialogLiveDemo: string
  dialogDefaultTitle: string
  dialogDefaultSubtitle: string
  dialogDefaultBody: string
  dialogSave: string
  dialogCancel: string
  dialogConfirmTitle: string
  dialogConfirmBody: string
  dialogDestructiveTitle: string
  dialogDestructiveWarning: string
  dialogDestructiveBody: string
  dialogDelete: string
  dialogLoadingTitle: string
  dialogLoadingBody: string
  dialogUpdate: string

  // ── NavigationSection ────────────────────────────────────────────────────
  navHome: string
  navShift: string
  navStaff: string
  navReports: string
  navNotifications: string
  navSettings: string
  navTabHome: string
  navTabShift: string
  navTabStaff: string
  navTabSettings: string
  navFixedNote: string

  // ── EmptyStateSection ────────────────────────────────────────────────────
  emptyNoData: string
  emptyNoShiftHeading: string
  emptyNoShiftDesc: string
  emptyNoShiftCta: string
  emptySearchHeading: string
  emptySearchDesc: string
  emptyFaxHeading: string
  emptyFaxDesc: string
  emptyFaxCta: string

  // ── DataDisplaySection ───────────────────────────────────────────────────
  sectionSubtitleDataDisplay: string
  statCardShiftsLabel: string
  statCardRevenueLabel: string
  statCardFaxLabel: string
  dataTableName: string
  dataTableShift: string
  dataTableDays: string
  dataTableStatus: string
  timelineEvent1: string
  timelineEvent2: string
  timelineEvent3: string
}

const ja: Translations = {
  sidebarComponentList: 'コンポーネント一覧',
  sidebarTagline: '自然・簡単・信頼',

  headerSubtitle:
    '日本の中小企業向けSaaSプロダクトの共有デザイン言語。\nShiftMate と FaxBridge を支えるコンポーネントライブラリ。',
  statComponents: 'コンポーネント',
  statTokens: 'デザイントークン',
  statProducts: 'プロダクト',

  sectionSubtitleButton: 'ボタン',
  sectionSubtitleInput: 'テキスト入力',
  sectionSubtitleCard: 'カード',
  sectionSubtitleBadge: 'バッジ・タグ',
  sectionSubtitleSkeleton: 'ローディング',
  sectionSubtitleDialog: 'ダイアログ',
  sectionSubtitleNavigation: 'ナビゲーション',
  sectionSubtitleEmptyState: '空の状態',

  btnLoading: '処理中...',
  btnDisabled: '無効ボタン',
  btnAction: '操作',

  inputLabelStoreName: '店舗名',
  inputPlaceholderStoreName: '例：青山店',
  inputPlaceholderNoLabel: 'ラベルなし',
  inputLabelEmail: 'メールアドレス',
  inputHelperEmail: 'ログインに使用するメールアドレスを入力してください。',
  inputLabelPhone: '電話番号',
  inputPlaceholderPhone: '090-0000-0000',
  inputErrorPhone: '正しい電話番号を入力してください。',
  inputLabelPassword: 'パスワード',
  inputPlaceholderPassword: '8文字以上',
  inputErrorPassword: 'パスワードは8文字以上で入力してください。',
  inputHelperPassword: '英数字と記号を組み合わせると安全です。',
  inputLabelRegistered: '登録日',
  inputValueRegistered: '2024年3月1日',

  cardSalesLabel: '今月の売上',
  cardSalesSubLabel: '前月比 +12.4%',
  cardStore1: '青山店',
  cardStore2: '渋谷店',
  cardStaffCount: 'スタッフ 8名',
  cardPlanLabel: 'プレミアムプラン',
  cardPlanBadge: '現在のプラン',
  cardPlanDesc: '無制限のスタッフ登録、高度な分析機能、優先サポートが含まれます。',

  badgeLabelGreen: '承認済',
  badgeLabelAmber: '保留中',
  badgeLabelRed: 'エラー',
  badgeLabelBlue: '情報',
  badgeLabelGray: 'アーカイブ',
  badgeLabelBrand: 'ブランド',
  badgeContextTitle: 'In Context — シフト申請一覧',
  badgeRow1Name: '田中 花子',
  badgeRow1Shift: '月 09:00–17:00',
  badgeRow1Status: '承認済',
  badgeRow2Name: '鈴木 一郎',
  badgeRow2Shift: '火 10:00–18:00',
  badgeRow2Status: '保留中',
  badgeRow3Name: '山田 次郎',
  badgeRow3Shift: '水 08:00–16:00',
  badgeRow3Status: 'エラー',

  skeletonCardLabel: 'Card Skeleton — 読み込み中のプレビュー',

  dialogLiveDemo: 'ライブデモを開く →',
  dialogDefaultTitle: 'シフトを編集',
  dialogDefaultSubtitle: '2024年3月15日（金）の変更内容を確認してください。',
  dialogDefaultBody: '編集内容がここに表示されます。',
  dialogSave: '保存する',
  dialogCancel: 'キャンセル',
  dialogConfirmTitle: '変更を保存しますか？',
  dialogConfirmBody: '保存されていない変更があります。このまま続けると変更が失われます。',
  dialogDestructiveTitle: 'スタッフを削除',
  dialogDestructiveWarning: 'この操作は取り消せません。',
  dialogDestructiveBody: '田中 花子 さんのアカウントと全データが完全に削除されます。',
  dialogDelete: '削除する',
  dialogLoadingTitle: '請求情報を更新中',
  dialogLoadingBody: 'クレジットカード情報を処理しています。しばらくお待ちください。',
  dialogUpdate: '更新する',

  navHome: 'ホーム',
  navShift: 'シフト管理',
  navStaff: 'スタッフ一覧',
  navReports: 'レポート',
  navNotifications: '通知',
  navSettings: '設定',
  navTabHome: 'ホーム',
  navTabShift: 'シフト',
  navTabStaff: 'スタッフ',
  navTabSettings: '設定',
  navFixedNote: '※ 実際の使用時は画面下部に固定されます（position: fixed）',

  emptyNoData: 'まだデータがありません',
  emptyNoShiftHeading: 'まだシフトがありません',
  emptyNoShiftDesc: 'シフトを追加して、スタッフのスケジュールを管理しましょう。',
  emptyNoShiftCta: 'シフトを追加する',
  emptySearchHeading: '検索結果がありません',
  emptySearchDesc: '別のキーワードでお試しください。',
  emptyFaxHeading: 'まだFAXが届いていません',
  emptyFaxDesc: 'FAXが受信されると、ここに表示されます。',
  emptyFaxCta: '設定を確認する',

  sectionSubtitleDataDisplay: 'データ表示',
  statCardShiftsLabel: '本日の出勤数',
  statCardRevenueLabel: '今月の売上',
  statCardFaxLabel: '未処理のFAX',
  dataTableName: '名前',
  dataTableShift: 'シフト',
  dataTableDays: '日数',
  dataTableStatus: 'ステータス',
  timelineEvent1: 'FAXを受信しました',
  timelineEvent2: 'データを自動抽出しました',
  timelineEvent3: '発注書を承認しました',
}

const en: Translations = {
  sidebarComponentList: 'Components',
  sidebarTagline: 'Natural · Simple · Trustworthy',

  headerSubtitle:
    'A shared design language for SaaS products targeting Japanese small businesses.\nThe component library powering ShiftMate and FaxBridge.',
  statComponents: 'Components',
  statTokens: 'Design Tokens',
  statProducts: 'Products',

  sectionSubtitleButton: 'Button',
  sectionSubtitleInput: 'Text Input',
  sectionSubtitleCard: 'Card',
  sectionSubtitleBadge: 'Badge · Tag',
  sectionSubtitleSkeleton: 'Loading',
  sectionSubtitleDialog: 'Dialog',
  sectionSubtitleNavigation: 'Navigation',
  sectionSubtitleEmptyState: 'Empty State',

  btnLoading: 'Loading...',
  btnDisabled: 'Disabled',
  btnAction: 'Action',

  inputLabelStoreName: 'Store Name',
  inputPlaceholderStoreName: 'e.g. Aoyama Branch',
  inputPlaceholderNoLabel: 'No label',
  inputLabelEmail: 'Email Address',
  inputHelperEmail: 'Enter the email address you use to log in.',
  inputLabelPhone: 'Phone Number',
  inputPlaceholderPhone: '090-0000-0000',
  inputErrorPhone: 'Please enter a valid phone number.',
  inputLabelPassword: 'Password',
  inputPlaceholderPassword: '8+ characters',
  inputErrorPassword: 'Password must be at least 8 characters.',
  inputHelperPassword: 'Mix letters, numbers, and symbols for a stronger password.',
  inputLabelRegistered: 'Registration Date',
  inputValueRegistered: 'March 1, 2024',

  cardSalesLabel: 'Monthly Revenue',
  cardSalesSubLabel: '+12.4% vs last month',
  cardStore1: 'Aoyama Branch',
  cardStore2: 'Shibuya Branch',
  cardStaffCount: '8 staff',
  cardPlanLabel: 'Premium Plan',
  cardPlanBadge: 'Current Plan',
  cardPlanDesc: 'Includes unlimited staff accounts, advanced analytics, and priority support.',

  badgeLabelGreen: 'Approved',
  badgeLabelAmber: 'Pending',
  badgeLabelRed: 'Error',
  badgeLabelBlue: 'Info',
  badgeLabelGray: 'Archived',
  badgeLabelBrand: 'Brand',
  badgeContextTitle: 'In Context — Shift Requests',
  badgeRow1Name: 'Hanako Tanaka',
  badgeRow1Shift: 'Mon 09:00–17:00',
  badgeRow1Status: 'Approved',
  badgeRow2Name: 'Ichiro Suzuki',
  badgeRow2Shift: 'Tue 10:00–18:00',
  badgeRow2Status: 'Pending',
  badgeRow3Name: 'Jiro Yamada',
  badgeRow3Shift: 'Wed 08:00–16:00',
  badgeRow3Status: 'Error',

  skeletonCardLabel: 'Card Skeleton — Loading Preview',

  dialogLiveDemo: 'Open Live Demo →',
  dialogDefaultTitle: 'Edit Shift',
  dialogDefaultSubtitle: 'Review changes for Friday, March 15, 2024.',
  dialogDefaultBody: 'Edit form content appears here.',
  dialogSave: 'Save',
  dialogCancel: 'Cancel',
  dialogConfirmTitle: 'Save changes?',
  dialogConfirmBody: 'You have unsaved changes. Continuing will discard them.',
  dialogDestructiveTitle: 'Delete Staff Member',
  dialogDestructiveWarning: 'This action cannot be undone.',
  dialogDestructiveBody:
    "Hanako Tanaka's account and all associated data will be permanently deleted.",
  dialogDelete: 'Delete',
  dialogLoadingTitle: 'Updating Billing Info',
  dialogLoadingBody: 'Processing your credit card information. Please wait.',
  dialogUpdate: 'Update',

  navHome: 'Home',
  navShift: 'Shifts',
  navStaff: 'Staff',
  navReports: 'Reports',
  navNotifications: 'Notifications',
  navSettings: 'Settings',
  navTabHome: 'Home',
  navTabShift: 'Shifts',
  navTabStaff: 'Staff',
  navTabSettings: 'Settings',
  navFixedNote: '※ In production, this bar is fixed to the bottom of the viewport.',

  emptyNoData: 'No data yet',
  emptyNoShiftHeading: 'No shifts yet',
  emptyNoShiftDesc: 'Add a shift to start managing your staff schedule.',
  emptyNoShiftCta: 'Add Shift',
  emptySearchHeading: 'No results found',
  emptySearchDesc: 'Try a different keyword.',
  emptyFaxHeading: 'No faxes received yet',
  emptyFaxDesc: 'Received faxes will appear here.',
  emptyFaxCta: 'Check Settings',

  sectionSubtitleDataDisplay: 'Data Display',
  statCardShiftsLabel: 'Staff on Shift Today',
  statCardRevenueLabel: 'Monthly Revenue',
  statCardFaxLabel: 'Unprocessed Faxes',
  dataTableName: 'Name',
  dataTableShift: 'Shift',
  dataTableDays: 'Days',
  dataTableStatus: 'Status',
  timelineEvent1: 'Fax received',
  timelineEvent2: 'Data auto-extracted',
  timelineEvent3: 'Purchase order approved',
}

// zh-Hans copy is marked for human review per PROJECT.md conventions
const zhHans: Translations = {
  sidebarComponentList: '组件列表', // TODO: zh-Hans review
  sidebarTagline: '自然・简单・可信', // TODO: zh-Hans review

  headerSubtitle: '面向日本中小企业SaaS产品的共享设计语言。\n支撑ShiftMate与FaxBridge的组件库。', // TODO: zh-Hans review
  statComponents: '组件', // TODO: zh-Hans review
  statTokens: '设计令牌', // TODO: zh-Hans review
  statProducts: '产品', // TODO: zh-Hans review

  sectionSubtitleButton: '按钮',
  sectionSubtitleInput: '文本输入',
  sectionSubtitleCard: '卡片',
  sectionSubtitleBadge: '徽章・标签',
  sectionSubtitleSkeleton: '加载中',
  sectionSubtitleDialog: '对话框',
  sectionSubtitleNavigation: '导航',
  sectionSubtitleEmptyState: '空状态',

  btnLoading: '处理中...', // TODO: zh-Hans review
  btnDisabled: '禁用', // TODO: zh-Hans review
  btnAction: '操作', // TODO: zh-Hans review

  inputLabelStoreName: '店铺名称', // TODO: zh-Hans review
  inputPlaceholderStoreName: '例：青山店',
  inputPlaceholderNoLabel: '无标签', // TODO: zh-Hans review
  inputLabelEmail: '电子邮件', // TODO: zh-Hans review
  inputHelperEmail: '请输入您用于登录的电子邮件地址。', // TODO: zh-Hans review
  inputLabelPhone: '电话号码', // TODO: zh-Hans review
  inputPlaceholderPhone: '090-0000-0000',
  inputErrorPhone: '请输入正确的电话号码。', // TODO: zh-Hans review
  inputLabelPassword: '密码', // TODO: zh-Hans review
  inputPlaceholderPassword: '8位以上', // TODO: zh-Hans review
  inputErrorPassword: '密码必须至少8位。', // TODO: zh-Hans review
  inputHelperPassword: '混合字母、数字和符号可提高安全性。', // TODO: zh-Hans review
  inputLabelRegistered: '注册日期', // TODO: zh-Hans review
  inputValueRegistered: '2024年3月1日',

  cardSalesLabel: '本月营业额', // TODO: zh-Hans review
  cardSalesSubLabel: '较上月 +12.4%', // TODO: zh-Hans review
  cardStore1: '青山店',
  cardStore2: '涩谷店', // TODO: zh-Hans review
  cardStaffCount: '员工 8名', // TODO: zh-Hans review
  cardPlanLabel: '高级方案', // TODO: zh-Hans review
  cardPlanBadge: '当前方案', // TODO: zh-Hans review
  cardPlanDesc: '包含无限员工账户、高级分析功能和优先支持。', // TODO: zh-Hans review

  badgeLabelGreen: '已批准', // TODO: zh-Hans review
  badgeLabelAmber: '待处理', // TODO: zh-Hans review
  badgeLabelRed: '错误', // TODO: zh-Hans review
  badgeLabelBlue: '信息', // TODO: zh-Hans review
  badgeLabelGray: '已归档', // TODO: zh-Hans review
  badgeLabelBrand: '品牌', // TODO: zh-Hans review
  badgeContextTitle: 'In Context — 排班申请列表', // TODO: zh-Hans review
  badgeRow1Name: '田中 花子',
  badgeRow1Shift: '周一 09:00–17:00', // TODO: zh-Hans review
  badgeRow1Status: '已批准', // TODO: zh-Hans review
  badgeRow2Name: '铃木 一郎',
  badgeRow2Shift: '周二 10:00–18:00', // TODO: zh-Hans review
  badgeRow2Status: '待处理', // TODO: zh-Hans review
  badgeRow3Name: '山田 次郎',
  badgeRow3Shift: '周三 08:00–16:00', // TODO: zh-Hans review
  badgeRow3Status: '错误', // TODO: zh-Hans review

  skeletonCardLabel: 'Card Skeleton — 加载预览', // TODO: zh-Hans review

  dialogLiveDemo: '打开实时演示 →', // TODO: zh-Hans review
  dialogDefaultTitle: '编辑排班', // TODO: zh-Hans review
  dialogDefaultSubtitle: '请确认2024年3月15日（周五）的修改内容。', // TODO: zh-Hans review
  dialogDefaultBody: '编辑内容显示在这里。', // TODO: zh-Hans review
  dialogSave: '保存', // TODO: zh-Hans review
  dialogCancel: '取消', // TODO: zh-Hans review
  dialogConfirmTitle: '是否保存更改？', // TODO: zh-Hans review
  dialogConfirmBody: '有未保存的更改，继续将丢失这些更改。', // TODO: zh-Hans review
  dialogDestructiveTitle: '删除员工', // TODO: zh-Hans review
  dialogDestructiveWarning: '此操作无法撤消。', // TODO: zh-Hans review
  dialogDestructiveBody: '田中 花子的账户和所有数据将被永久删除。', // TODO: zh-Hans review
  dialogDelete: '删除', // TODO: zh-Hans review
  dialogLoadingTitle: '正在更新账单信息', // TODO: zh-Hans review
  dialogLoadingBody: '正在处理您的信用卡信息，请稍候。', // TODO: zh-Hans review
  dialogUpdate: '更新', // TODO: zh-Hans review

  navHome: '主页', // TODO: zh-Hans review
  navShift: '排班管理', // TODO: zh-Hans review
  navStaff: '员工列表', // TODO: zh-Hans review
  navReports: '报告', // TODO: zh-Hans review
  navNotifications: '通知', // TODO: zh-Hans review
  navSettings: '设置', // TODO: zh-Hans review
  navTabHome: '主页', // TODO: zh-Hans review
  navTabShift: '排班', // TODO: zh-Hans review
  navTabStaff: '员工', // TODO: zh-Hans review
  navTabSettings: '设置', // TODO: zh-Hans review
  navFixedNote: '※ 实际使用时固定在屏幕底部（position: fixed）', // TODO: zh-Hans review

  emptyNoData: '暂无数据', // TODO: zh-Hans review
  emptyNoShiftHeading: '暂无排班', // TODO: zh-Hans review
  emptyNoShiftDesc: '添加排班以开始管理员工日程。', // TODO: zh-Hans review
  emptyNoShiftCta: '添加排班', // TODO: zh-Hans review
  emptySearchHeading: '未找到结果', // TODO: zh-Hans review
  emptySearchDesc: '请尝试其他关键词。', // TODO: zh-Hans review
  emptyFaxHeading: '暂未收到传真', // TODO: zh-Hans review
  emptyFaxDesc: '收到传真后将显示在这里。', // TODO: zh-Hans review
  emptyFaxCta: '检查设置', // TODO: zh-Hans review

  sectionSubtitleDataDisplay: '数据展示', // TODO: zh-Hans review
  statCardShiftsLabel: '今日出勤人数', // TODO: zh-Hans review
  statCardRevenueLabel: '本月营业额', // TODO: zh-Hans review
  statCardFaxLabel: '未处理传真', // TODO: zh-Hans review
  dataTableName: '姓名', // TODO: zh-Hans review
  dataTableShift: '班次', // TODO: zh-Hans review
  dataTableDays: '天数', // TODO: zh-Hans review
  dataTableStatus: '状态', // TODO: zh-Hans review
  timelineEvent1: '收到传真', // TODO: zh-Hans review
  timelineEvent2: '自动提取数据', // TODO: zh-Hans review
  timelineEvent3: '已批准采购订单', // TODO: zh-Hans review
}

export const translations: Record<Locale, Translations> = {
  ja,
  en,
  'zh-Hans': zhHans,
}
