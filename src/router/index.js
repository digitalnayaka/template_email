import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import index from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/module',
    name: 'module',
    component: () => import(/* webpackChunkName: "module" */ '../views/Module.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    meta: {
      Auth: true
    }
  }, {
    path: '/role',
    name: 'role',
    component: () => import(/* webpackChunkName: "role" */ '../views/Role.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/rolemenu',
    name: 'rolemenu',
    component: () => import(/* webpackChunkName: "rolemenu" */ '../views/RoleMenu.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/jenis_iklan',
    name: 'jenis_iklan',
    component: () => import(/* webpackChunkName: "jenis_iklan" */ '../views/JenisIklan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/user_role',
    name: 'user_role',
    component: () => import(/* webpackChunkName: "user_role" */ '../views/UserRoles.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/category/mokas',
    name: 'mokas',
    component: () => import(/* webpackChunkName: "mokas" */ '../views/Mokas.vue')
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
    path: '/category/bengkel',
    name: 'bengkel',
    component: () => import(/* webpackChunkName: "bengkel" */ '../views/Bengkel.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/list_lelang/:id',
    name: 'list_lelang',
    component: () => import(/* webpackChunkName: "list_lelang" */ '../views/ListLelang.vue'),
  },
  {
    path: '/detail_iklan/:id',
    name: 'detail_iklan',
    component: () => import(/* webpackChunkName: "detail_iklan" */ '../views/DetailIklan.vue'),
  },
  {
    path: '/detail_paket/:id',
    name: 'detail_paket',
    component: () => import(/* webpackChunkName: "detail_paket" */ '../views/DetailPaket.vue'),
  },
  {
    path: '/unit_mokas/:id',
    name: 'unit_mokas',
    component: () => import(/* webpackChunkName: "unit_mokas" */ '../views/UnitMokas.vue'),
  },
  {
    path: '/jadwal',
    name: 'jadwal',
    component: () => import(/* webpackChunkName: "jadwal" */ '../views/Jadwal.vue')
  },
  {
    path: '/category/tiket',
    name: 'tiket',
    component: () => import(/* webpackChunkName: "tiket" */ '../views/Tiket.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/dapatkan_tiket',
    name: 'dapatkan_tiket',
    component: () => import(/* webpackChunkName: "dapatkan_tiket" */ '../views/BeliTiket.vue'),
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
    path: '/refund_tiket',
    name: 'refund_tiket',
    component: () => import(/* webpackChunkName: "refund_tiket" */ '../views/RefundTiket.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/list_transaksi',
    name: 'list_transaksi',
    component: () => import(/* webpackChunkName: "list_transaksi" */ '../views/ListTransaksi.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/transaksi_refund/:id',
    name: 'transaksi_refund',
    component: () => import(/* webpackChunkName: "transaksi_refund" */ '../views/TransaksiRefund.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/tambah-unit',
    name: 'tambah_unit',
    component: () => import(/* webpackChunkName: "tambah_unit" */ '../views/TambahUnit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/garasi',
    name: 'garasi',
    component: () => import(/* webpackChunkName: "garasi" */ '../views/Garasi.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/tambah-iklan',
    name: 'tambah_iklan',
    component: () => import(/* webpackChunkName: "tambah_iklan" */ '../views/TambahIklan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/iklan',
    name: 'iklan',
    component: () => import(/* webpackChunkName: "iklan" */ '../views/Iklan.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/edit_unit/:id',
    name: 'edit_unit',
    component: () => import(/* webpackChunkName: "edit_unit" */ '../views/EditUnit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/edit_iklan/:id',
    name: 'edit_iklan',
    component: () => import(/* webpackChunkName: "edit_iklan" */ '../views/EditIklan.vue'),
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
    path: '/edit_profile',
    name: 'edit_profile',
    component: () => import(/* webpackChunkName: "edit_profile" */ '../views/EditProfile.vue'),
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
    path: '/iklan_favorit',
    name: 'iklan_favorit',
    component: () => import(/* webpackChunkName: "iklan_favorit" */ '../views/IklanFavorit.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/rekening',
    name: 'rekening',
    component: () => import(/* webpackChunkName: "rekening" */ '../views/Rekening.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/chat_otomatis',
    name: 'chat_otomatis',
    component: () => import(/* webpackChunkName: "chat_otomatis" */ '../views/ChatOtomatis.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import(/* webpackChunkName: "faq" */ '../views/Faq.vue'),
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
    path: '/bantuan',
    name: 'bantuan',
    component: () => import(/* webpackChunkName: "bantuan" */ '../views/Bantuan.vue'),
  },
  {
    path: '/detail_banner',
    name: 'detail_banner',
    component: () => import(/* webpackChunkName: "detail_banner" */ '../views/DetailBanner.vue'),
  },
  {
    path: '/tawar_bersama',
    name: 'tawar_bersama',
    component: () => import(/* webpackChunkName: "tawar_bersama" */ '../views/TawarBersama.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/aktivitas_iklan',
    name: 'aktivitas_iklan',
    component: () => import(/* webpackChunkName: "aktivitas_iklan" */ '../views/AktivitasIklan.vue'),
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
    path: '/notifikasi',
    name: 'notifikasi',
    component: () => import(/* webpackChunkName: "notifikasi" */ '../views/Notifikasi.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/detail_transaksi/:id',
    name: 'detail_transaksi',
    component: () => import(/* webpackChunkName: "detail_transaksi" */ '../views/DetailTransaksi.vue'),
    meta: {
      Auth: true
    }
  },

  {
    path: '/tawar_bersama_selesai/:id',
    name: 'tb_selesai',
    component: () => import(/* webpackChunkName: "tb_selesai" */ '../views/TBSelesai.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/akun/',
    name: 'akun',
    component: () => import(/* webpackChunkName: "akun" */ '../views/Account.vue'),
    meta: {
      Auth: true
    }
  },
  {
    path: '/tiket_saya',
    name: 'MyTicket',
    component: () => import(/* webpackChunkName: "tiket_saya" */ '../views/MyTicket.vue'),
    meta: {
      Auth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  }
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
