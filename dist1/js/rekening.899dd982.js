(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["rekening"],{"09cc":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-app-bar",{attrs:{app:"",color:"teal",dark:""}},[a("v-btn",{attrs:{icon:""},on:{click:function(t){return t.stopPropagation(),e.$router.go(-1)}}},[a("v-icon",[e._v("mdi-arrow-left-circle")])],1)],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.accounts},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:"",color:"white"}},[a("v-toolbar-title",[e._v("Rekening Bank")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"350px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-btn",e._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},n),[e._v("Tambah")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-row",{attrs:{dense:""}},[a("v-col",{attrs:{cols:"12"}},[e.bank?a("v-select",{attrs:{items:e.banks,"item-value":"id","item-text":"bank_name",rules:[function(e){return!!e||"Field is required"}],label:"Pilih Nama Bank"},model:{value:e.editedItem.bank_name,callback:function(t){e.$set(e.editedItem,"bank_name",t)},expression:"editedItem.bank_name"}}):a("v-text-field",{attrs:{label:"Pilih Nama Bank"},model:{value:e.editedItem.bank_name,callback:function(t){e.$set(e.editedItem,"bank_name",t)},expression:"editedItem.bank_name"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{counter:20,rules:[function(e){return!!e||"Field is required"}],label:"Nama Pemilik Rekening",readonly:e.bank},model:{value:e.editedItem.nama_rekening,callback:function(t){e.$set(e.editedItem,"nama_rekening",t)},expression:"editedItem.nama_rekening"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{counter:20,rules:[function(e){return!!e||"Field is required"},function(e){return/^\d+$/.test(e)||"Numbers Only"}],label:"Nomor Rekening",readonly:e.bank},model:{value:e.editedItem.nomor_rekening,callback:function(t){e.$set(e.editedItem,"nomor_rekening",t)},expression:"editedItem.nomor_rekening"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1"},on:{click:e.close}},[e._v("Cancel")]),-1==e.editedIndex?a("v-btn",{attrs:{color:"blue darken-1",disabled:!e.valid},on:{click:e.save}},[e._v("Save")]):e._e(),0==e.editedItem.is_main?a("v-btn",{attrs:{color:"blue darken-1",disabled:!e.valid},on:{click:e.update}},[e._v("Jadikan Utama")]):e._e(),-1!=e.editedIndex&&1==e.editedItem.is_main?a("v-btn",{attrs:{color:"blue darken-1",disabled:""}},[e._v("Sudah Utama")]):e._e()],1)],1)],1)],1)]},proxy:!0},{key:"item.is_main",fn:function(t){var n=t.item;return[a("v-icon",{attrs:{color:e.getColor(n.is_main)}},[e._v("mdi-star")])]}},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-icon",{staticClass:"mr-2",on:{click:function(t){return e.editItem(n)}}},[e._v("mdi-pencil")]),a("v-icon",{on:{click:function(t){return e.deleteItem(n)}}},[e._v("mdi-delete")])]}}])})],1)},i=[],s=(a("c975"),a("498a"),a("5530")),r=a("2f62"),o={name:"rekening",data:function(){return{dialog:!1,headers:[{text:"Bank",value:"bank_name"},{text:"Nama Rekening",value:"nama_rekening"},{text:"Nomor Rekening",value:"nomor_rekening"},{text:"Utama",value:"is_main"},{text:"Actions",value:"actions"}],accounts:[],banks:[],editedIndex:-1,editedItem:{bank_name:"",nama_rekening:"",nomor_rekening:""},bank:!0,defaultItem:{},valid:!0,money:{precision:0,thousands:"",masked:!0}}},methods:Object(s["a"])(Object(s["a"])({},Object(r["b"])({setAlert:"alert/set"})),{},{getRekening:function(){var e=this;this.axios.get("/user/v1/user/rekening",{params:{id_app_user:this.user.id,limit:999}}).then((function(t){var a=t.data.data;e.accounts=a})).catch((function(e){var t=e.response.data;console.log(t.api_message)}))},getBank:function(){var e=this;this.axios.get("/master/v1/mst_bank").then((function(t){var a=t.data.data;e.banks=a})).catch((function(e){var t=e.response.data;console.log(t.api_message)}))},editItem:function(e){this.editedIndex=this.accounts.indexOf(e),this.editedItem=Object.assign({},e),this.bank=!1,this.dialog=!0},close:function(){var e=this;this.dialog=!1,setTimeout((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}),300),this.bank=!0},save:function(){var e=this,t=new FormData;t.append("id_mst_bank",this.editedItem.bank_name),t.append("nama_rekening",this.editedItem.nama_rekening.trim()),t.append("nomor_rekening",this.editedItem.nomor_rekening.trim()),t.append("id_app_user",this.user.id),this.axios.post("/user/v1/user/rekening",t,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(t){var a=t.data;e.setAlert({status:!0,color:"success",text:a.api_message}),e.getRekening(),e.close()})).catch((function(t){var a=t.response.data;e.setAlert({status:!0,color:"success",text:a.api_message})}))},update:function(){var e=this,t=new FormData;t.append("is_main",!0),t.append("id",this.editedItem.id),t.append("id_app_user",this.user.id),this.axios.put("/user/v1/user/rekening",t,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(t){var a=t.data;e.setAlert({status:!0,color:"success",text:a.api_message}),e.getRekening(),e.close()})).catch((function(t){var a=t.response.data;e.setAlert({status:!0,color:"error",text:a.api_message})}))},deleteItem:function(e){var t=this;this.editedIndex=this.accounts.indexOf(e),this.editedItem=Object.assign({},e);var a=confirm("Yakin akan dihapus?");if(1==a){var n=new FormData;n.append("id",this.editedItem.id),n.append("id_app_user",this.user.id),this.axios.post("/user/v1/user/rekening/delete",n,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(e){var a=e.data;t.setAlert({status:!0,color:"success",text:a.api_message}),t.getRekening()})).catch((function(e){var a=e.response.data;t.setAlert({status:!0,color:"error",text:a.api_message})}))}},getColor:function(e){return 1==e?"yellow":"grey lighten-1"}}),created:function(){this.getRekening(),this.getBank()},computed:Object(s["a"])(Object(s["a"])({},Object(r["c"])({user:"auth/user"})),{},{formTitle:function(){return-1===this.editedIndex?"Tambah Rekening":"Edit Rekening"}}),watch:{dialog:function(e){e||this.close()}}},d=o,c=a("2877"),l=a("6544"),u=a.n(l),m=a("40dc"),v=a("8336"),k=a("b0af"),p=a("99d9"),h=a("62ad"),b=a("8fea"),f=a("169a"),g=a("ce7e"),_=a("4bd4"),x=a("132d"),I=a("0fd9"),V=a("b974"),w=a("2fa4"),A=a("8654"),C=a("71d9"),O=a("2a7f"),R=Object(c["a"])(d,n,i,!1,null,null,null);t["default"]=R.exports;u()(R,{VAppBar:m["a"],VBtn:v["a"],VCard:k["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:h["a"],VDataTable:b["a"],VDialog:f["a"],VDivider:g["a"],VForm:_["a"],VIcon:x["a"],VRow:I["a"],VSelect:V["a"],VSpacer:w["a"],VTextField:A["a"],VToolbar:C["a"],VToolbarTitle:O["a"]})}}]);
//# sourceMappingURL=rekening.899dd982.js.map