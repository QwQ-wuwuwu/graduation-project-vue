import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      component: () => import('@/views/student/StudentView.vue'),
      children: [
        {
          path: 'info',
          component: () => import('@/views/student/InfoAndSelectView.vue')
        },
        {
          path: 'upload',
          component: () => import('@/views/student/UploadFileView.vue')
        },
        {
          path: 'password',
          component: () => import('@/views/user/PasswordView.vue')
        }
      ],
      // redirect: '/student/info' // 默认路由
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminView.vue'),
      children: [
        {
          path: 'time',
          component: () => import('@/views/admin/TimeView.vue')
        },
        {
          path: 'password',
          component: () => import('@/views/admin/PasswordView.vue')
        },
        {
          path: 'process',
          component: () => import('@/views/admin/ProcessView.vue')
        },
        {
          path: 'student',
          component: () => import('@/views/admin/StudentExcel.vue')
        },
        {
          path: 'teacher',
          component: () => import('@/views/admin/TeacherExcel.vue')
        },
        {
          path: 'password',
          component: () => import('@/views/user/PasswordView.vue')
        }
      ]
    },
    {
      path: '/teacher',
      component: () => import('@/views/teacher/TeacherView.vue'),
      children: [
        {
          path: 'selected',
          component: () => import('@/views/teacher/SelectedInfo.vue')
        },
        {
          path: 'password',
          component: () => import('@/views/user/PasswordView.vue')
        },
        {
          path: 'unSelected',
          component: () => import('@/views/teacher/UnSelectedInfo.vue')
        },
        {
          path: 'processScore',
          component: () => import('@/views/teacher/ProcessScore.vue')
        }
      ]
    }
  ]
})
export default router
