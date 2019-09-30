/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '图片上传' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '返回顶部' }
    }
  ]
}

export default componentsRouter
