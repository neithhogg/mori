import type { Locale } from './types'

export interface CopyKeys {
  action: {
    save: string
    delete: string
    cancel: string
    add: string
    edit: string
    confirm: string
    close: string
    back: string
    next: string
    submit: string
  }
  status: {
    loading: string
    saving: string
    success: string
    error: string
  }
  empty: {
    default: string
    search: string
  }
  confirm: {
    destructiveHint: string
  }
  dialog: {
    close: string
  }
  pagination: {
    previous: string
    next: string
  }
}

export const MoriCopy: Record<Locale, CopyKeys> = {
  ja: {
    action: {
      save: '保存する',
      delete: '削除する',
      cancel: 'キャンセル',
      add: '追加する',
      edit: '編集する',
      confirm: '確認する',
      close: '閉じる',
      back: '戻る',
      next: '次へ',
      submit: '送信する',
    },
    status: {
      loading: '処理中...',
      saving: '保存中...',
      success: '✓ 保存しました',
      error: 'エラーが発生しました。もう一度お試しください。',
    },
    empty: {
      default: 'まだデータがありません',
      search: '検索結果がありません',
    },
    confirm: {
      destructiveHint: 'この操作は取り消せません。',
    },
    dialog: {
      close: '閉じる',
    },
    pagination: {
      previous: '前へ',
      next: '次へ',
    },
  },

  en: {
    action: {
      save: 'Save',
      delete: 'Delete',
      cancel: 'Cancel',
      add: 'Add',
      edit: 'Edit',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
    },
    status: {
      loading: 'Loading...',
      saving: 'Saving...',
      success: '✓ Saved',
      error: 'Something went wrong. Please try again.',
    },
    empty: {
      default: 'No data yet',
      search: 'No results found',
    },
    confirm: {
      destructiveHint: 'This action cannot be undone.',
    },
    dialog: {
      close: 'Close',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
    },
  },

  // TODO: zh-Hans review
  'zh-Hans': {
    action: {
      // TODO: zh-Hans review
      save: '保存',
      // TODO: zh-Hans review
      delete: '删除',
      // TODO: zh-Hans review
      cancel: '取消',
      // TODO: zh-Hans review
      add: '添加',
      // TODO: zh-Hans review
      edit: '编辑',
      // TODO: zh-Hans review
      confirm: '确认',
      // TODO: zh-Hans review
      close: '关闭',
      // TODO: zh-Hans review
      back: '返回',
      // TODO: zh-Hans review
      next: '下一步',
      // TODO: zh-Hans review
      submit: '提交',
    },
    status: {
      // TODO: zh-Hans review
      loading: '处理中...',
      // TODO: zh-Hans review
      saving: '保存中...',
      // TODO: zh-Hans review
      success: '✓ 已保存',
      // TODO: zh-Hans review
      error: '发生错误，请重试。',
    },
    empty: {
      // TODO: zh-Hans review
      default: '暂无数据',
      // TODO: zh-Hans review
      search: '未找到结果',
    },
    confirm: {
      // TODO: zh-Hans review
      destructiveHint: '此操作无法撤消。',
    },
    dialog: {
      // TODO: zh-Hans review
      close: '关闭',
    },
    pagination: {
      // TODO: zh-Hans review
      previous: '上一页',
      // TODO: zh-Hans review
      next: '下一页',
    },
  },
}
