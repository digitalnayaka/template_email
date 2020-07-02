(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["edit_iklan"],{"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var a=i("5530"),r=i("58df"),s=i("7e2b"),n=i("3206");e["a"]=Object(r["a"])(s["a"],Object(n["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},a={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",(function(r){r&&(e.errorBag.hasOwnProperty(t._uid)||(a.valid=i(t)))})):a.valid=i(t),a},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},c562:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-app-bar",{attrs:{app:"",color:"teal",dark:""}},[i("v-btn",{attrs:{icon:""},on:{click:function(e){return e.stopPropagation(),t.$router.go(-1)}}},[i("v-icon",[t._v("mdi-arrow-left-circle")])],1)],1),i("v-container",{attrs:{fluid:""}},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{outlined:"",label:"Judul Iklan",rules:t.formRules},model:{value:t.judul,callback:function(e){t.judul=e},expression:"judul"}}),i("v-text-field",{attrs:{outlined:"",label:"Deskripsi Iklan",rules:t.formRules},model:{value:t.deskripsi,callback:function(e){t.deskripsi=e},expression:"deskripsi"}}),i("div",{staticClass:"text-right"},[i("v-btn",{attrs:{color:"primary",disabled:!t.valid},on:{click:t.updateIklan}},[t._v("Simpan")])],1)],1)],1)],1)},r=[],s=(i("498a"),i("5530")),n=i("2f62"),u={name:"EditIklan",data:function(){return{valid:!0,formRules:[function(t){return!!t||"Field is required"}],hits:[],judul:"",deskripsi:""}},methods:Object(s["a"])(Object(s["a"])({},Object(n["b"])({setAlert:"alert/set"})),{},{getIklan:function(){var t=this;this.axios.get("/search/v1/search",{params:{id:this.$route.params.id,limit:1}}).then((function(e){var i=e.data,a=i.hits.hits;t.hits=a,t.judul=a[0]._source.judul,t.deskripsi=a[0]._source.deskripsi})).catch((function(t){var e=t.response.data;console.log(e.api_message)}))},updateIklan:function(){var t=this,e=new FormData;e.append("judul",this.judul.trim()),e.append("deskripsi",this.deskripsi.trim()),e.append("id",this.$route.params.id),1==this.hits[0]._source.id_mst_iklan_jenis?this.axios.put("/iklan/v1/iklan_hp_mokas_satuan",e,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(e){var i=e.data;t.setAlert({status:!0,color:"success",text:i.api_message}),t.$router.go(-1)})).catch((function(e){var i=e.response.data;t.setAlert({status:!0,color:"success",text:i.api_message})})):this.axios.put("/iklan/v1/iklan_tb_mokas_satuan",e,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(e){var i=e.data;t.setAlert({status:!0,color:"success",text:i.api_message}),t.$router.go(-1)})).catch((function(e){var i=e.response.data;t.setAlert({status:!0,color:"success",text:i.api_message})}))}}),created:function(){this.getIklan()},computed:Object(s["a"])({},Object(n["c"])({user:"auth/user"}))},o=u,l=i("2877"),d=i("6544"),c=i.n(d),h=i("40dc"),f=i("8336"),p=i("a523"),v=i("4bd4"),m=i("132d"),_=i("8654"),k=Object(l["a"])(o,a,r,!1,null,null,null);e["default"]=k.exports;c()(k,{VAppBar:h["a"],VBtn:f["a"],VContainer:p["a"],VForm:v["a"],VIcon:m["a"],VTextField:_["a"]})}}]);
//# sourceMappingURL=edit_iklan.106778fe.js.map