(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["list_transaksi"],{9166:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-app-bar",{attrs:{app:"",color:"teal",dark:""}},[e("v-btn",{attrs:{icon:""},on:{click:function(a){return a.stopPropagation(),t.$router.go(-1)}}},[e("v-icon",[t._v("mdi-arrow-left-circle")])],1)],1),e("h1",[t._v("Daftar Transaksi Tiket Tawar Bersama")]),e("v-tabs",{attrs:{"background-color":"teal",color:"white",grow:""}},[e("v-tabs-slider",{attrs:{color:"yellow"}}),e("v-tab",[t._v("Pembelian")]),e("v-tab",[t._v("Refund")]),e("v-tab-item",[e("v-card",{attrs:{flat:""}},[e("v-card",{attrs:{color:"basil",flat:""}},[e("v-card-text",[e("v-row",{attrs:{dense:""}},t._l(t.group,(function(a){return e("v-col",{key:a.id_mst_pembayaran_status,staticClass:"ma-0 pa-0",attrs:{cols:"12"}},[e("h3",[t._v(t._s(a.pembayaran_status))]),t._l(a.found,(function(a){return e("v-card",{key:a.id,staticClass:"mx-2 mb-4",attrs:{outlined:"",to:"/upload_bukti/"+a.id}},[1!=a.id_mst_pembayaran_status?e("v-toolbar",{attrs:{dense:"",flat:""}},[e("div",[t._v("Nomor Order:")]),e("v-spacer"),e("div",{staticClass:"red--text"},[t._v(t._s(a.no_order))])],1):e("v-toolbar",{attrs:{dense:"",flat:""}},[e("div",[t._v("Bayar Sebelum:")]),e("v-spacer"),e("div",{staticClass:"red--text"},[t._v(t._s(t._f("dateTimeFormat")(a.expired_at,t.utc))+" "+t._s(t.waktu))])],1),e("v-list",{staticClass:"pa-0"},[e("v-list-item",[e("v-list-item-avatar",{attrs:{rounded:"",size:"80"}},[e("v-img",{attrs:{src:"/img/tiket.png"}})],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Tiket Tawar Bersama")]),e("v-list-item-subtitle",{staticClass:"teal--text"},[t._v("Jumlah Pembelian: "+t._s(a.jumlah)+" Tiket")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Total Pembayaran")]),e("v-list-item-subtitle",[t._v("Rp "+t._s(Number(a.total_pembayaran).toLocaleString("id-ID")))])],1)],1)],1),1==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 amber darken-1 white--text text-center"},[t._v("Menunggu pembayaran")]):t._e(),2==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 blue darken-1 white--text text-center"},[t._v("Pembayaran Diverifikasi")]):t._e(),3==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 red accent-2 white--text text-center"},[t._v("Expired")]):t._e(),4==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 teal accent-4 white--text text-center"},[t._v("Menunggu Verifikasi")]):t._e(),5==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 red accent-2 white--text text-center"},[t._v("Dibatalkan")]):t._e(),6==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 red accent-2 white--text text-center"},[t._v("Ditolak")]):t._e()],1)}))],2)})),1)],1)],1)],1)],1),e("v-tab-item",[e("v-card",{attrs:{flat:""}},[e("v-card",{attrs:{color:"basil",flat:""}},[e("v-card-text",[e("v-row",{attrs:{dense:""}},t._l(t.group2,(function(a){return e("v-col",{key:a.id_mst_pembayaran_status,staticClass:"ma-0 pa-0",attrs:{cols:"12"}},[e("h3",[t._v(t._s(a.pembayaran_status))]),t._l(a.found,(function(a){return e("v-card",{key:a.id,staticClass:"mx-2 mb-4",attrs:{outlined:"",to:"/transaksi_refund/"+a.id}},[1!=a.id_mst_pembayaran_status?e("v-toolbar",{attrs:{dense:"",flat:""}},[e("div",[t._v("Nomor Order:")]),e("v-spacer"),e("div",{staticClass:"red--text"},[t._v(t._s(a.no_order))])],1):e("v-toolbar",{attrs:{dense:"",flat:""}},[e("div",[t._v("Bayar Sebelum:")]),e("v-spacer"),e("div",{staticClass:"red--text"},[t._v(t._s(t._f("dateTimeFormat")(a.expired_at,t.utc))+" "+t._s(t.waktu))])],1),e("v-list",{staticClass:"pa-0"},[e("v-list-item",[e("v-list-item-avatar",{attrs:{rounded:"",size:"80"}},[e("v-img",{attrs:{src:"/img/tiket.png"}})],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Tiket Tawar Bersama")]),e("v-list-item-subtitle",{staticClass:"teal--text"},[t._v("Jumlah Pembelian: Tiket")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("Total Pembayaran")]),e("v-list-item-subtitle",[t._v("Rp 0")])],1)],1)],1),1==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 amber darken-1 white--text text-center"},[t._v("Menunggu pembayaran")]):t._e(),2==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 blue darken-1 white--text text-center"},[t._v("Pembayaran Diverifikasi")]):t._e(),3==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 red accent-2 white--text text-center"},[t._v("Expired")]):t._e(),4==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 teal accent-4 white--text text-center"},[t._v("Menunggu Verifikasi")]):t._e(),6==a.id_mst_pembayaran_status?e("div",{staticClass:"d-block pa-2 red accent-2 white--text text-center"},[t._v("Ditolak")]):t._e()],1)}))],2)})),1)],1)],1)],1)],1)],1)],1)},r=[],i=(e("4de4"),e("4ec9"),e("d3b7"),e("3ca3"),e("ddb0"),e("5530")),n=e("b85c"),d=e("2f62"),u=e("7f45"),_=e.n(u),c={name:"ListTransaksi",data:function(){return{search:"",orders:[],orderStatus:[],group:[],tab:null,refunds:[],refundStatus:[],group2:[],page:1,lengthPage:0,limit:20,offset:0,total:0,utc:_()().utcOffset()/60-7,waktu:""}},methods:{loadData:function(){var t=this,a=(this.page-1)*this.limit;this.axios.get("/transaksi/v1/order",{headers:{Authorization:"Bearer "+this.user.token},params:{id_pembeli:this.user.id,offset:a,limit:999}}).then((function(a){var e=a.data.data;t.orders=e,t.total=a.data.count,t.lengthPage=Math.ceil(t.total/t.limit);var s,r=new Map,i=Object(n["a"])(t.orders);try{for(i.s();!(s=i.n()).done;){var d=s.value;r.has(d.id_mst_pembayaran_status)||(r.set(d.id_mst_pembayaran_status,!0),t.orderStatus.push({id_mst_pembayaran_status:d.id_mst_pembayaran_status,pembayaran_status:d.pembayaran_status}))}}catch(c){i.e(c)}finally{i.f()}for(var u=function(a){var e=t.orderStatus[a].id_mst_pembayaran_status,s=t.orderStatus[a].pembayaran_status,r=t.orders.filter((function(t){return t.id_mst_pembayaran_status==e}));t.group.push({id_mst_pembayaran_status:e,pembayaran_status:s,found:r})},_=0;_<t.orderStatus.length;_++)u(_)})).catch((function(t){var a=t.response.data;console.log(a.api_message)}))},listRefund:function(){var t=this;this.axios.get("/transaksi/v1/pencairan_tiket",{params:{id_penjual:this.user.id,limit:999}}).then((function(a){var e=a.data.data;t.refunds=e;var s,r=new Map,i=Object(n["a"])(t.refunds);try{for(i.s();!(s=i.n()).done;){var d=s.value;r.has(d.id_mst_pembayaran_status)||(r.set(d.id_mst_pembayaran_status,!0),t.refundStatus.push({id_mst_pembayaran_status:d.id_mst_pembayaran_status,pembayaran_status:d.pembayaran_status}))}}catch(c){i.e(c)}finally{i.f()}for(var u=function(a){var e=t.refundStatus[a].id_mst_pembayaran_status,s=t.refundStatus[a].pembayaran_status,r=t.refunds.filter((function(t){return t.id_mst_pembayaran_status==e}));t.group2.push({id_mst_pembayaran_status:e,pembayaran_status:s,found:r})},_=0;_<t.refundStatus.length;_++)u(_)})).catch((function(a){var e=a.response.data;t.setAlert({status:!0,color:"error",text:e.api_meesage})}))}},created:function(){this.loadData(),this.listRefund(),0==this.utc&&(this.waktu="WIB"),1==this.utc&&(this.waktu="WITA"),2==this.utc&&(this.waktu="WIT")},computed:Object(i["a"])({},Object(d["c"])({user:"auth/user"})),filters:{dateTimeFormat:function(t,a){return _.a.utc(t).add(a,"h").format("DD MMM YYYY HH:mm")}}},l=c,o=e("2877"),m=e("6544"),v=e.n(m),b=e("40dc"),p=e("8336"),f=e("b0af"),h=e("99d9"),y=e("62ad"),k=e("132d"),x=e("adda"),g=e("8860"),w=e("da13"),C=e("8270"),T=e("5d23"),V=e("0fd9"),S=e("2fa4"),I=e("71a3"),O=e("c671"),j=e("fe57"),D=e("9a96"),M=e("71d9"),P=Object(o["a"])(l,s,r,!1,null,null,null);a["default"]=P.exports;v()(P,{VAppBar:b["a"],VBtn:p["a"],VCard:f["a"],VCardText:h["c"],VCol:y["a"],VIcon:k["a"],VImg:x["a"],VList:g["a"],VListItem:w["a"],VListItemAvatar:C["a"],VListItemContent:T["b"],VListItemSubtitle:T["c"],VListItemTitle:T["d"],VRow:V["a"],VSpacer:S["a"],VTab:I["a"],VTabItem:O["a"],VTabs:j["a"],VTabsSlider:D["a"],VToolbar:M["a"]})},"99d9":function(t,a,e){"use strict";e.d(a,"a",(function(){return i})),e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return d})),e.d(a,"d",(function(){return u}));var s=e("b0af"),r=e("80d2"),i=Object(r["i"])("v-card__actions"),n=Object(r["i"])("v-card__subtitle"),d=Object(r["i"])("v-card__text"),u=Object(r["i"])("v-card__title");s["a"]}}]);
//# sourceMappingURL=list_transaksi.4fe8eaf4.js.map