(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chat_otomatis"],{"0182":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-app-bar",{attrs:{app:"",color:"teal",dark:""}},[e("v-btn",{attrs:{icon:""},on:{click:function(a){return a.stopPropagation(),t.$router.go(-1)}}},[e("v-icon",[t._v("mdi-arrow-left-circle")])],1)],1),e("div",{staticClass:"display-1 font-weight-bold text-center"},[t._v("Pesan Otomatis")]),e("div",{staticClass:"text-center"},[e("v-card",{staticClass:"d-inline-block mx-auto"},[e("v-container",[e("v-card-text",[e("div",[t._v("Pesan berikut akan otomatis dikirimkan kepada pemenang dari iklan tawar bersama yang Anda pasang.")]),e("div",[t._v("Jika Anda belum melakukan kustomisasi, kami akan mengirimkan pesan default.")])]),e("v-form",{ref:"form",model:{value:t.valid,callback:function(a){t.valid=a},expression:"valid"}},[e("v-text-field",{attrs:{rules:t.rules,counter:"300",filled:"",label:"Pesan Default",hint:"*Nama Iklan akan muncul diakhir kalimat","persistent-hint":""},model:{value:t.chat,callback:function(a){t.chat=a},expression:"chat"}})],1),e("v-btn",{attrs:{block:"",color:"teal",disabled:!t.valid},on:{click:t.save}},[t._v("Simpan")])],1)],1)],1)],1)},n=[],r=e("5530"),s=e("2f62"),u={name:"templateChat",data:function(){return{template:"Selamat kamu sudah memenangkan Iklan Tawar Bersama. Yuk segera hubungi kami :)",chat:"",rules:[function(t){return!!t||"Field is required"},function(t){return t.length<=300||"Max 300 characters"}],valid:!0}},methods:Object(r["a"])(Object(r["a"])({},Object(s["b"])({setAlert:"alert/set"})),{},{getTemplate:function(){var t=this;this.axios.get("/user/v1/user/template_chat",{params:{id_app_user:this.user.id}}).then((function(a){var e=a.data.data;t.chat=e.chat})).catch((function(a){var e=a.response.data;console.log(e.api_message),t.chat=t.template}))},save:function(){var t=this,a=new FormData;a.append("id_app_user",this.user.id),a.append("chat",this.chat),this.axios.post("/user/v1/user/template_chat",a,{headers:{Authorization:"Bearer "+this.user.token}}).then((function(a){var e=a.data;t.setAlert({status:!0,color:"success",text:e.api_message})})).catch((function(a){var e=a.response.data;t.setAlert({status:!0,color:"error",text:e.api_message})}))}}),created:function(){this.getTemplate()},computed:Object(r["a"])({},Object(s["c"])({user:"auth/user"}))},o=u,c=e("2877"),d=e("6544"),l=e.n(d),h=e("40dc"),f=e("8336"),p=e("b0af"),v=e("99d9"),m=e("a523"),b=e("4bd4"),_=e("132d"),k=e("8654"),g=Object(c["a"])(o,i,n,!1,null,null,null);a["default"]=g.exports;l()(g,{VAppBar:h["a"],VBtn:f["a"],VCard:p["a"],VCardText:v["c"],VContainer:m["a"],VForm:b["a"],VIcon:_["a"],VTextField:k["a"]})},"4bd4":function(t,a,e){"use strict";e("4de4"),e("7db0"),e("4160"),e("caad"),e("07ac"),e("2532"),e("159b");var i=e("5530"),n=e("58df"),r=e("7e2b"),s=e("3206");a["a"]=Object(n["a"])(r["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(a.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})},"99d9":function(t,a,e){"use strict";e.d(a,"a",(function(){return r})),e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return u})),e.d(a,"d",(function(){return o}));var i=e("b0af"),n=e("80d2"),r=Object(n["i"])("v-card__actions"),s=Object(n["i"])("v-card__subtitle"),u=Object(n["i"])("v-card__text"),o=Object(n["i"])("v-card__title");i["a"]}}]);
//# sourceMappingURL=chat_otomatis.7e2cc8f9.js.map