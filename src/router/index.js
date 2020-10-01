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
    path: '/list-tb/:id',
    name: 'ListTB',
    component: () => import(/* webpackChunkName: "list-lelang" */ '../views/ListLelang.vue'),
  },
  {
    path: '/jadwal',
    name: 'Jadwal',
    component: () => import(/* webpackChunkName: "jadwal" */ '../views/Jadwal.vue'),
  },

  {
    path: '/bantuan',
    name: 'bantuan',
    component: () => import(/* webpackChunkName: "bantuan" */ '../views/Bantuan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/get-ticket',
    name: 'get-ticket',
    component: () => import(/* webpackChunkName: "get-tiket" */ '../views/BuyTicket.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/bengkel',
    name: 'bengkel',
    component: () => import(/* webpackChunkName: "bengkel" */ '../views/Bengkel.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/chat_list',
    name: 'chat_list',
    component: () => import(/* webpackChunkName: "chat_list" */ '../views/ChatList.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/iklan_favorit',
    name: 'iklan_favorit',
    component: () => import(/* webpackChunkName: "iklan_favorit" */ '../views/IklanFavorit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/tawar_bersama',
    name: 'tawar_bersama',
    component: () => import(/* webpackChunkName: "tawar_bersama" */ '../views/TransaksiTB.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/syarat_ketentuan',
    name: 'syarat_ketentuan',
    component: () => import(/* webpackChunkName: "syarat_ketentuan" */ '../views/SyaratKetentuan.vue'),
  },
  {
    path: '/larangan_iklan',
    name: 'larangan_iklan',
    component: () => import(/* webpackChunkName: "larangan_iklan" */ '../views/LaranganIklan.vue'),
  },
  {
    path: '/kebijakan_privasi',
    name: 'kebijakan_privasi',
    component: () => import(/* webpackChunkName: "kebijakan_privasi" */ '../views/KebijakanPrivasi.vue'),
  },
  {
    path: '/panduan_pembeli',
    name: 'panduan_pembeli',
    component: () => import(/* webpackChunkName: "panduan_pembeli" */ '../views/PanduanBuyer.vue'),
  },

  {
    path: '/panduan_penjual',
    name: 'panduan_penjual',
    component: () => import(/* webpackChunkName: "panduan_penjual" */ '../views/PanduanSeller.vue'),
  },
  {
    path: '/kode_etik',
    name: 'kode_etik',
    component: () => import(/* webpackChunkName: "kode_etik" */ '../views/KodeEtik.vue'),
  },
  {
    path: '/category/motor_baru',
    name: 'motor_baru',
    component: () => import(/* webpackChunkName: "motor_baru" */ '../views/MotorBaru.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/pengaturan',
    name: 'pengaturan',
    component: () => import(/* webpackChunkName: "pengaturan" */ '../views/Pengaturan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/refund_tiket',
    name: 'refund_tiket',
    component: () => import(/* webpackChunkName: "refund_tiket" */ '../views/RefundTiket.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/toko/review',
    name: 'review',
    component: () => import(/* webpackChunkName: "toko/review" */ '../views/Review.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/beri-ulasan',
    name: 'beri-ulasan',
    component: () => import(/* webpackChunkName: "beri-ulasan" */ '../views/TulisReview.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/aktivitas/pembeli',
    name: 'aktivitas/pembeli',
    component: () => import(/* webpackChunkName: "aktivitas/pembeli" */ '../views/AktivitasPembeli.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/detail-transaksi/:id',
    name: 'detail-transaksi',
    component: () => import(/* webpackChunkName: "detail-transaksi" */ '../views/DetailTransaksi.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/upload_bukti/:id',
    name: 'upload_bukti',
    component: () => import(/* webpackChunkName: "upload_bukti" */ '../views/UploadBukti.vue'),
    meta: {
      Auth: true
    }
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
