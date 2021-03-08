module.exports = {
  documents: [
    {
      key: 'introduce',
      name: '关于 React-Vant',
      module: () => import('@site/web/docs/introduce.md'),
      style: false,
    },
    {
      key: 'quick-start',
      name: '快速上手',
      module: () => import('@site/web/docs/quick-start.md'),
      style: false,
    },
    {
      key: 'change-log',
      name: '更新日志',
      module: () => import('@/CHANGELOG.md'),
      style: false,
    },
  ],
  components: {
    general: [
      {
        key: 'button',
        name: '按钮',
        module: () => import('@/components/button-new/demo.md'),
        style: true,
      },
    ],
    form: [
      {
        key: 'input',
        name: '文本框',
        module: () => import('@/components/input/demo.md'),
        style: false,
      },
    ],
    feedback: [],
    view: [],
    navigation: [],
    other: [],
  },
  design: [
    {
      key: 'download',
      name: '设计资源下载',
      module: () => import('@/site/web/pages/Design/Download'),
      style: false,
    },
  ],
};
