(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["daftar"],{"3a60":function(t,e,n){(function(e,n){t.exports=n()})(0,(function(){return function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p=".",e(e.s=10)}([function(t,e){t.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(t){return t.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(t){return t.toLocaleLowerCase()}},"!":{escape:!0}}},function(t,e,n){"use strict";function i(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e}var a=n(2),s=n(0),o=n.n(s);e.a=function(t,e){var s=e.value;if((Array.isArray(s)||"string"==typeof s)&&(s={mask:s,tokens:o.a}),"INPUT"!==t.tagName.toLocaleUpperCase()){var r=t.getElementsByTagName("input");if(1!==r.length)throw new Error("v-mask directive requires 1 input, found "+r.length);t=r[0]}t.oninput=function(e){if(e.isTrusted){var o=t.selectionEnd,r=t.value[o-1];for(t.value=n.i(a.a)(t.value,s.mask,!0,s.tokens);o<t.value.length&&t.value.charAt(o-1)!==r;)o++;t===document.activeElement&&(t.setSelectionRange(o,o),setTimeout((function(){t.setSelectionRange(o,o)}),0)),t.dispatchEvent(i("input"))}};var u=n.i(a.a)(t.value,s.mask,!0,s.tokens);u!==t.value&&(t.value=u,t.dispatchEvent(i("input")))}},function(t,e,n){"use strict";var i=n(6),a=n(5);e.a=function(t,e){var s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=arguments[3];return Array.isArray(e)?n.i(a.a)(i.a,e,o)(t,e,s,o):n.i(i.a)(t,e,s,o)}},function(t,e,n){"use strict";function i(t){t.component(u.a.name,u.a),t.directive("mask",o.a)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),s=n.n(a),o=n(1),r=n(7),u=n.n(r);n.d(e,"TheMask",(function(){return u.a})),n.d(e,"mask",(function(){return o.a})),n.d(e,"tokens",(function(){return s.a})),n.d(e,"version",(function(){return c}));var c="0.11.1";e.default=i,"undefined"!=typeof window&&window.Vue&&window.Vue.use(i)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(0),s=n.n(a),o=n(2);e.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return s.a}}},directives:{mask:i.a},data:function(){return{lastValue:null,display:this.value}},watch:{value:function(t){t!==this.lastValue&&(this.display=t)},masked:function(){this.refresh(this.display)}},computed:{config:function(){return{mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(t){t.isTrusted||this.refresh(t.target.value)},refresh:function(t){this.display=t;t=n.i(o.a)(t,this.mask,this.masked,this.tokens);t!==this.lastValue&&(this.lastValue=t,this.$emit("input",t))}}}},function(t,e,n){"use strict";function i(t,e,n){return e=e.sort((function(t,e){return t.length-e.length})),function(i,a){for(var s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=0;o<e.length;){var r=e[o];o++;var u=e[o];if(!(u&&t(i,u,!0,n).length>r.length))return t(i,r,s,n)}return""}}e.a=i},function(t,e,n){"use strict";function i(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments[3];t=t||"",e=e||"";for(var a=0,s=0,o="";a<e.length&&s<t.length;){var r=e[a],u=i[r],c=t[s];u&&!u.escape?(u.pattern.test(c)&&(o+=u.transform?u.transform(c):c,a++),s++):(u&&u.escape&&(a++,r=e[a]),n&&(o+=r),c===r&&s++,a++)}for(var l="";a<e.length&&n;){r=e[a];if(i[r]){l="";break}l+=r,a++}return o+l}e.a=i},function(t,e,n){var i=n(8)(n(4),n(9),null,null);t.exports=i.exports},function(t,e){t.exports=function(t,e,n,i){var a,s=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(a=t,s=t.default);var r="function"==typeof s?s.options:s;if(e&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns),n&&(r._scopeId=n),i){var u=r.computed||(r.computed={});Object.keys(i).forEach((function(t){var e=i[t];u[t]=function(){return e}}))}return{esModule:a,exports:s,options:r}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{directives:[{name:"mask",rawName:"v-mask",value:t.config,expression:"config"}],attrs:{type:"text"},domProps:{value:t.display},on:{input:t.onInput}})},staticRenderFns:[]}},function(t,e,n){t.exports=n(3)}])}))},"407d":function(t,e,n){
/*!
 * vue-countdown v1.1.5
 * https://fengyuanchen.github.io/vue-countdown
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-02-25T01:19:32.769Z
 */
(function(e,n){t.exports=n()})(0,(function(){"use strict";var t=1e3,e=60*t,n=60*e,i=24*n,a="visibilitychange",s={name:"countdown",data:function(){return{counting:!1,endTime:0,totalMilliseconds:0}},props:{autoStart:{type:Boolean,default:!0},emitEvents:{type:Boolean,default:!0},interval:{type:Number,default:1e3,validator:function(t){return t>=0}},now:{type:Function,default:function(){return Date.now()}},tag:{type:String,default:"span"},time:{type:Number,default:0,validator:function(t){return t>=0}},transform:{type:Function,default:function(t){return t}}},computed:{days:function(){return Math.floor(this.totalMilliseconds/i)},hours:function(){return Math.floor(this.totalMilliseconds%i/n)},minutes:function(){return Math.floor(this.totalMilliseconds%n/e)},seconds:function(){return Math.floor(this.totalMilliseconds%e/t)},milliseconds:function(){return Math.floor(this.totalMilliseconds%t)},totalDays:function(){return this.days},totalHours:function(){return Math.floor(this.totalMilliseconds/n)},totalMinutes:function(){return Math.floor(this.totalMilliseconds/e)},totalSeconds:function(){return Math.floor(this.totalMilliseconds/t)}},render:function(t){return t(this.tag,this.$scopedSlots.default?[this.$scopedSlots.default(this.transform({days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}))]:this.$slots.default)},watch:{$props:{deep:!0,immediate:!0,handler:function(){this.totalMilliseconds=this.time,this.endTime=this.now()+this.time,this.autoStart&&this.start()}}},methods:{start:function(){this.counting||(this.counting=!0,this.emitEvents&&this.$emit("start"),"visible"===document.visibilityState&&this.continue())},continue:function(){var t=this;if(this.counting){var e=Math.min(this.totalMilliseconds,this.interval);if(e>0)if(window.requestAnimationFrame){var n,i,a=function a(s){n||(n=s),i||(i=s);var o=s-n;o>=e||o+(s-i)/2>=e?t.progress():t.requestId=requestAnimationFrame(a),i=s};this.requestId=requestAnimationFrame(a)}else this.timeoutId=setTimeout((function(){t.progress()}),e);else this.end()}},pause:function(){window.requestAnimationFrame?cancelAnimationFrame(this.requestId):clearTimeout(this.timeoutId)},progress:function(){this.counting&&(this.totalMilliseconds-=this.interval,this.emitEvents&&this.totalMilliseconds>0&&this.$emit("progress",{days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}),this.continue())},abort:function(){this.counting&&(this.pause(),this.counting=!1,this.emitEvents&&this.$emit("abort"))},end:function(){this.counting&&(this.pause(),this.totalMilliseconds=0,this.counting=!1,this.emitEvents&&this.$emit("end"))},update:function(){this.counting&&(this.totalMilliseconds=Math.max(0,this.endTime-this.now()))},handleVisibilityChange:function(){switch(document.visibilityState){case"visible":this.update(),this.continue();break;case"hidden":this.pause();break}}},mounted:function(){document.addEventListener(a,this.handleVisibilityChange)},beforeDestroy:function(){document.removeEventListener(a,this.handleVisibilityChange),this.pause()}};return s}))},"4bd4":function(t,e,n){"use strict";n("4de4"),n("7db0"),n("4160"),n("caad"),n("07ac"),n("2532"),n("159b");var i=n("5530"),a=n("58df"),s=n("7e2b"),o=n("3206");e["a"]=Object(a["a"])(s["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",(function(n){e.$set(e.errorBag,t._uid,n)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=n(t)))})):i.valid=n(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var n=this.watchers.find((function(t){return t._uid===e._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"99d9":function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"d",(function(){return u}));var i=n("b0af"),a=n("80d2"),s=Object(a["i"])("v-card__actions"),o=Object(a["i"])("v-card__subtitle"),r=Object(a["i"])("v-card__text"),u=Object(a["i"])("v-card__title");i["a"]},d612:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",[n("v-toolbar",{attrs:{dark:"",color:"teal"}},[n("v-btn",{attrs:{icon:"",dark:""},nativeOn:{click:function(e){return t.close(e)}}},[n("v-icon",[t._v("mdi-close")])],1),n("v-toolbar-title",[t._v("Daftar")])],1),n("v-divider"),n("v-container",{attrs:{fluid:""}},[n("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("div",{attrs:{align:"center"}},[n("v-card",{staticClass:"pa-5",attrs:{width:t.phoneDisplay?600:330}},[t.phoneDisplay?n("div",[n("h2",[t._v("Daftarkan diri Anda")]),n("v-text-field",{attrs:{rules:t.nameRules,label:"Nama Lengkap","prepend-inner-icon":"mdi-account",outlined:"",counter:"35",maxlength:35},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("v-text-field",{directives:[{name:"mask",rawName:"v-mask",value:t.mask,expression:"mask"}],attrs:{rules:t.phoneRules,label:"Phone Number","prepend-inner-icon":"mdi-phone",outlined:""},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),n("v-btn",{attrs:{block:"",color:"teal",disabled:!t.valid},on:{click:t.signupcheck}},[t._v("Daftar")]),n("v-card-subtitle",[t._v(" Dengan mendaftar, Anda telah menyetujui "),n("a",{attrs:{href:"http://simotor.id/#/syaratketentuan/",target:"_new"}},[t._v("syarat ketentuan")]),t._v(" dan "),n("a",{attrs:{href:"http://simotor.id/#/kebijakan/",target:"_new"}},[t._v("kebijakan privasi SiMotor")])])],1):t._e(),t.otpDisplay?n("div",[n("h2",[t._v("Kode OTP")]),n("v-text-field",{attrs:{name:"otp",required:"",rules:t.otpRules,maxlength:"6"},model:{value:t.otp,callback:function(e){t.otp=e},expression:"otp"}}),t.countdown?n("p",[t._v(" Tidak menerima kode? Tunggu "),n("countdown",{ref:"countdown",attrs:{time:6e4},on:{end:function(e){t.countdown=!t.countdown}},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.seconds)+" Detik.")]}}],null,!1,459474344)})],1):n("p",[t._v(" Tidak menerima kode? "),n("a",{on:{click:t.resend}},[t._v("Resend")])]),n("v-btn",{attrs:{block:"",color:"primary",disabled:!t.valid},on:{click:t.daftar}},[t._v("Verifikasi")]),n("br"),n("p",{on:{click:t.ubah}},[t._v(" Bukan nomor Anda? "),n("a",[t._v("Ubah")])])],1):t._e()])],1)])],1)],1)},a=[],s=(n("b0c0"),n("5530")),o=n("3a60"),r=n("2f62"),u=n("2b0e"),c=n("407d"),l=n.n(c);u["a"].component(l.a.name,l.a);var d={name:"daftar",directives:{mask:o["mask"]},data:function(){return{name:"",phone:"",nameRules:[function(t){return!!t||"Nama Lengkap wajib diisi"},function(t){return t.length>=2||"Min 2 karakter"},function(t){return t.length<=35||"Max 35 karakter"}],phoneRules:[function(t){return!!t||"Nomor Handphone wajib diisi (Min 10, Max 13)"},function(t){return t&&t.length>=10}],otpRules:[function(t){return!!t||"OTP is required"},function(t){return t&&6==t.length||"OTP harus 6 digit"}],mask:"#############",valid:!0,phoneDisplay:!0,otpDisplay:!1,otp:"",countdown:!0}},methods:Object(s["a"])(Object(s["a"])({},Object(r["b"])({setAlert:"alert/set",setAuth:"auth/set",setToken:"auth/SET_TOKEN"})),{},{end:function(){this.countdown=!this.countdown},resend:function(){this.otpRequest(),this.countdown=!this.countdown},signupcheck:function(){var t=this,e=new FormData;e.append("nomor_hp",this.phone),this.axios.post("/user/v1/user/signupcheck",e).then((function(e){var n=e.data;t.setAlert({status:!0,color:"success",text:n.api_message}),t.phoneDisplay=!1,t.otpDisplay=!0,t.otpRequest()})).catch((function(e){var n=e.response.data;t.setAlert({status:!0,color:"error",text:n.api_message})}))},otpRequest:function(){var t=this,e=new FormData;e.append("nomor_hp",this.phone),this.axios.post("/user/v1/user/otprequest",e).then((function(){})).catch((function(e){var n=e.response.data;t.setAlert({status:!0,color:"error",text:n.api_message})}))},daftar:function(){var t=this,e=new FormData;e.append("nama",this.name),e.append("nomor_hp",this.phone),e.append("id_token",this.otp),e.append("id_mst_user_type",1),this.axios.post("/user/v1/user",e).then((function(e){var n=e.data.data;t.setAuth(n[0]),t.setToken(n[0].token),window.localStorage.setItem("user",JSON.stringify(n[0])),window.localStorage.setItem("token",n[0].token),t.setAlert({status:!0,color:"success",text:"Selamat Datang "+t.user.nama}),t.userRoles(n[0].id),t.close(),t.phone="",t.otp="",t.otpDisplay=!1,t.phoneDisplay=!0})).catch((function(e){var n=e.response.data;t.setAlert({status:!0,color:"error",text:n.api_message})}))},userRoles:function(t){var e=new FormData;e.append("user_id",t),e.append("role_id",2),e.append("created_by",t),this.axios.post("/setup/v1/user_roles",e)},ubah:function(){this.otpDisplay=!1,this.phoneDisplay=!0},close:function(){this.$emit("closed",!1)}}),computed:Object(s["a"])({},Object(r["c"])({user:"auth/user"}))},h=d,f=n("2877"),p=n("6544"),m=n.n(p),v=n("8336"),b=n("b0af"),g=n("99d9"),k=n("a523"),y=n("ce7e"),_=n("4bd4"),w=n("132d"),M=n("8654"),x=n("71d9"),D=n("2a7f"),V=Object(f["a"])(h,i,a,!1,null,null,null);e["default"]=V.exports;m()(V,{VBtn:v["a"],VCard:b["a"],VCardSubtitle:g["b"],VContainer:k["a"],VDivider:y["a"],VForm:_["a"],VIcon:w["a"],VTextField:M["a"],VToolbar:x["a"],VToolbarTitle:D["a"]})}}]);
//# sourceMappingURL=daftar.72058d5a.js.map