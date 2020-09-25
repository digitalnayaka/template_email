import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import index from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/category/mokas',
    name: 'Mokas',
    component: () => import(/* webpackChunkName: "mokas" */ '../views/Mokas.vue')
  },
  {
    path: '/list-lelang/:id',
    name: 'ListLelang',
    component: () => import(/* webpackChunkName: "list-lelang" */ '../views/ListLelang.vue'),
  },
  {
    path: '/jadwal',
    name: 'Jadwal',
    component: () => import(/* webpackChunkName: "jadwal" */ '../views/Jadwal.vue'),
  },
  {
    path: '/produk/:seller/:id',
    name: 'Iklan',
    component: () => import(/* webpackChunkName: "iklan" */ '../views/DetailIklan.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
    children: [
      {
        path: '/account/edit',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/garasi/manage-unit',
        name: 'ManageUnit',
        component: () => import(/* webpackChunkName: "manage-unit" */ '../views/Garasi.vue'),
        meta: {
          auth: true
        }
      },
      {
        path: '/toko/manage-ads',
        name: 'ManageAds',
        component: () => import(/* webpackChunkName: "manage-ads" */ '../views/ManageAds.vue'),
        meta: {
          auth: true
        }
      },
    ],
  },
  {
    path: '/garasi/add-unit',
    name: 'AddUnit',
    component: () => import(/* webpackChunkName: "add-unit" */ '../views/AddUnit.vue'),
    meta: {
      auth: true
    },
  },
  {
    path: '/garasi/edit-unit/:id',
    name: 'EditUnit',
    component: () => import(/* webpackChunkName: "edit-unit" */ '../views/EditUnit.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/garasi/detail-unit/:id',
    name: 'DetailUnit',
    component: () => import(/* webpackChunkName: "detail-unit" */ '../views/UnitMokas.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/toko/add-ads',
    name: 'AddAds',
    component: () => import(/* webpackChunkName: "add-ads" */ '../views/AddAds.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/category/ticket',
    name: 'Ticket',
    component: () => import(/* webpackChunkName: "ticket" */ '../views/Ticket.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/get-ticket',
    name: 'GetTicket',
    component: () => import(/* webpackChunkName: "get-ticket" */ '../views/BuyTicket.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/upload-bukti/:id',
    name: 'UploadBukti',
    component: () => import(/* webpackChunkName: "upload-bukti" */ '../views/UploadBukti.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/refund-ticket',
    name: 'RefundTicket',
    component: () => import(/* webpackChunkName: "refund-ticket" */ '../views/RefundTiket.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/detail-banner/:id',
    name: 'DetailBanner',
    component: () => import(/* webpackChunkName: "detail-banner" */ '../views/DetailBanner.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/notification',
    name: 'Notifcation',
    component: () => import(/* webpackChunkName: "notification" */ '../views/Notifikasi.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/bantuan',
    name: 'Bantuan',
    component: () => import(/* webpackChunkName: "bantuan" */ '../views/Bantuan.vue'),
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.Auth)) {
    if (index.getters['auth/guest']) {
      index.dispatch('alert/set', {
        status: true,
        text: 'Silahkan login terlebih dahulu',
        color: 'error',
      })
      index.dispatch('dialog/setComponent', 'login')
    } else {
      next()
    }
  } else {
    next()
  }
})

if (window.localStorage.getItem("user") === null) {
  window.localStorage.setItem("user", null);
  window.localStorage.setItem("token", null);
} else {
  const localUserString = window.localStorage.getItem("user");
  const localToken = window.localStorage.getItem("token");

  if (localUserString !== null) {
    const localUser = JSON.parse(localUserString);

    index.dispatch('auth/set', localUser);
    index.dispatch("auth/SET_TOKEN", localToken);
  } else {
    index.dispatch('auth/set', {});
    index.dispatch("auth/SET_TOKEN", null);
  }
}

export default router
