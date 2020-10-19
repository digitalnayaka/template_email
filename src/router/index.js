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
    path: '/detail-banner/:id',
    name: 'DetailBanner',
    component: () => import(/* webpackChunkName: "detail-banner" */ '../views/DetailBanner.vue')
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
    component: () => import(/* webpackChunkName: "list-tb" */ '../views/ListTB.vue'),
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
    path: '/iklan-favorit',
    name: 'IklanFavorit',
    component: () => import(/* webpackChunkName: "iklan-favorit" */ '../views/IklanFavorit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/syarat-ketentuan',
    name: 'SyaratKetentuan',
    component: () => import(/* webpackChunkName: "syarat-ketentuan" */ '../views/SyaratKetentuan.vue'),
  },
  {
    path: '/larangan-iklan',
    name: 'LaranganIklan',
    component: () => import(/* webpackChunkName: "larangan-iklan" */ '../views/LaranganIklan.vue'),
  },
  {
    path: '/kebijakan_privasi',
    name: 'KebijakanPrivasi',
    component: () => import(/* webpackChunkName: "kebijakan-privasi" */ '../views/KebijakanPrivasi.vue'),
  },
  {
    path: '/panduan-pembeli',
    name: 'PanduanBuyer',
    component: () => import(/* webpackChunkName: "panduan-pembeli" */ '../views/PanduanBuyer.vue'),
  },

  {
    path: '/panduan-penjual',
    name: 'PanduanSeller',
    component: () => import(/* webpackChunkName: "panduan-penjual" */ '../views/PanduanSeller.vue'),
  },
  {
    path: '/kode-etik',
    name: 'KodeEtik',
    component: () => import(/* webpackChunkName: "kode-etik" */ '../views/KodeEtik.vue'),
  },
  {
    path: '/category/motor-baru',
    name: 'MotorBaru',
    component: () => import(/* webpackChunkName: "motor_baru" */ '../views/MotorBaru.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/refund-tiket',
    name: 'RefundTiket',
    component: () => import(/* webpackChunkName: "refund-tiket" */ '../views/RefundTiket.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue'),
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
    path: '/upload-bukti/:id',
    name: 'UploadBukti',
    component: () => import(/* webpackChunkName: "upload-bukti" */ '../views/UploadBukti.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/iklan/:id',
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
          Auth: true
        }
      },
      {
        path: '/chat-list',
        name: 'ChatList',
        component: () => import(/* webpackChunkName: "chat-list" */ '../views/ChatList.vue'),
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
        path: '/product/review',
        name: 'ProductReview',
        component: () => import(/* webpackChunkName: "product-review" */ '../views/ProductReview.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/notification',
        name: 'Notifikasi',
        component: () => import(/* webpackChunkName: "notification" */ '../views/Notifikasi.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/activity/buyer',
        name: 'BuyerActivity',
        component: () => import(/* webpackChunkName: "buyer-activity" */ '../views/BuyerActivity.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/buy/order',
        name: 'BuyerOrder',
        component: () => import(/* webpackChunkName: "buyer-order" */ '../views/BuyerOrder.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/activity/seller',
        name: 'SellerActivity',
        component: () => import(/* webpackChunkName: "seller-activity" */ '../views/SellerActivity.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/account/ticket',
        name: 'AccountTicket',
        component: () => import(/* webpackChunkName: "account-ticket" */ '../views/AccountTicket.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/garasi/manage-unit',
        name: 'ManageUnit',
        component: () => import(/* webpackChunkName: "manage-unit" */ '../views/Garasi.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/toko/manage-ads',
        name: 'ManageAds',
        component: () => import(/* webpackChunkName: "manage-ads" */ '../views/ManageAds.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/toko/info',
        name: 'InformasiPenjual',
        component: () => import(/* webpackChunkName: "informasi-penjual" */ '../views/InfoPenjual.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/sell/order',
        name: 'SellerOrder',
        component: () => import(/* webpackChunkName: "seller-order" */ '../views/SellerOrder.vue'),
        meta: {
          Auth: true
        }
      },
      {
        path: '/toko/review',
        name: 'Review',
        component: () => import(/* webpackChunkName: "review" */ '../views/Review.vue'),
        meta: {
          Auth: true
        }
      },
    ],
  },
  {
    path: '/garasi/add-unit',
    name: 'AddUnit',
    component: () => import(/* webpackChunkName: "add-unit" */ '../views/AddUnit.vue'),
    meta: {
      Auth: true
    },
  },
  {
    path: '/garasi/edit-unit/:id',
    name: 'EditUnit',
    component: () => import(/* webpackChunkName: "edit-unit" */ '../views/EditUnit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/garasi/detail-unit/:id',
    name: 'DetailUnit',
    component: () => import(/* webpackChunkName: "detail-unit" */ '../views/UnitMokas.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/toko/add-ads',
    name: 'AddAds',
    component: () => import(/* webpackChunkName: "add-ads" */ '../views/AddAds.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/category/Ticket',
    name: 'Ticket',
    component: () => import(/* webpackChunkName: "ticket" */ '../views/Ticket.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/detail-transaksi/:id',
    name: 'DetailTransaksi',
    component: () => import(/* webpackChunkName: "detail-transaksi" */ '../views/DetailTransaksi.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/tb-selesai/:id',
    name: 'TBSelesai',
    component: () => import(/* webpackChunkName: "tb-selesai" */ '../views/TBSelesai.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/aktivitas-iklan',
    name: 'AktivitasIklan',
    component: () => import(/* webpackChunkName: "aktivitas-iklan" */ '../views/AktivitasIklan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: () => import(/* webpackChunkName: "favourite" */ '../views/IklanFavorit.vue'),
    meta: {
      Auth: true
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
