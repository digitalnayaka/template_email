(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["rolemenu"],{"2bfd":function(e,t,n){},c6a6:function(e,t,n){"use strict";n("4de4"),n("7db0"),n("c975"),n("d81d"),n("45fc"),n("498a");var s=n("5530"),i=(n("2bfd"),n("b974")),a=n("8654"),l=n("d9f7"),o=n("80d2"),r=Object(s["a"])(Object(s["a"])({},i["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1});t["a"]=i["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,n){return n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:i["a"].options.props.menuProps.type,default:function(){return r}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){var n=Object(o["r"])(t,e.itemText),s=null!=n?String(n):"";return e.filter(t,String(e.internalSearch),s)}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch=e,this.$emit("update:search-input",e)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=i["a"].options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),Object(s["a"])(Object(s["a"])({},r),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(t){return e.valueComparator(e.getValue(t),e.getValue(e.internalValue))}))},listData:function(){var e=i["a"].options.computed.listData.call(this);return e.props=Object(s["a"])(Object(s["a"])({},e.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=void 0)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},methods:{onFilteredItemsChanged:function(e,t){var n=this;e!==t&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===e.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===o["y"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===o["y"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==o["y"].backspace&&e!==o["y"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var e=this.selectedIndex,t=this.selectedItems[e];if(this.isInteractive&&!this.getDisabled(t)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var s=this.selectedItems.length,i=e!==s-1?e:e-1,a=this.selectedItems[i];a?this.selectItem(t):this.setValue(this.multiple?[]:void 0),this.selectedIndex=i}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=void 0,i["a"].options.methods.clearableCallback.call(this)},genInput:function(){var e=a["a"].options.methods.genInput.call(this);return e.data=Object(l["a"])(e.data,{attrs:{"aria-activedescendant":Object(o["p"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["p"])(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot:function(){var e=i["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections:function(){return this.hasSlot||this.multiple?i["a"].options.methods.genSelections.call(this):[]},onClick:function(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,n=t.value;t.value&&this.activateMenu(),this.internalSearch=n,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;i["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){i["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(e){e.preventDefault(),this.activateMenu()},selectItem:function(e){i["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){i["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){if(-1!==this.selectedIndex){var t=this.selectedItems[this.selectedIndex],n=this.getText(t);e.clipboardData.setData("text/plain",n),e.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",n),e.preventDefault()}}}})},faf4:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-app-bar",{attrs:{app:"",color:"teal",dark:""}},[n("v-btn",{attrs:{icon:""},on:{click:function(t){return t.stopPropagation(),e.$router.go(-1)}}},[n("v-icon",[e._v("mdi-arrow-left-circle")])],1)],1),n("v-data-table",{key:e.key,staticClass:"elevation-1",attrs:{headers:e.headers,items:e.rolemenus,"items-per-page":20,search:e.search,"footer-props":{itemsPerPageOptions:[20,50,100,-1]},dense:""},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:"",dense:"",color:"grey lighten-2"}},[n("v-btn",{staticClass:"ma-2",attrs:{color:"green",outlined:""},on:{click:e.open}},[n("v-icon",{attrs:{large:"",left:""}},[e._v("mdi-plus")]),e._v("Add ")],1),n("v-spacer"),n("v-text-field",{attrs:{outlined:"",dense:"","append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),n("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("v-dialog",{attrs:{persistent:"","max-width":"400px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),n("v-container",[n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"12"}},[n("form",[n("v-text-field",{style:{display:"none"},attrs:{label:"ID"},model:{value:e.editedItem.id,callback:function(t){e.$set(e.editedItem,"id",t)},expression:"editedItem.id"}}),n("v-autocomplete",{attrs:{outlined:"",items:e.roles,"item-text":"role_name","item-value":"id",clearable:"",label:"Role",disabled:e.disabled,rules:e.formRules},on:{change:e.getMenus},model:{value:e.editedItem.role_name,callback:function(t){e.$set(e.editedItem,"role_name",t)},expression:"editedItem.role_name"}}),n("v-autocomplete",{attrs:{outlined:"",items:e.menus,"item-text":"menu_name","item-value":"id",clearable:"",label:"Menu","small-chips":"",chips:"",multiple:"",disabled:e.disabled,rules:e.formRules},model:{value:e.editedItem.menu_name,callback:function(t){e.$set(e.editedItem,"menu_name",t)},expression:"editedItem.menu_name"}}),n("v-autocomplete",{attrs:{outlined:"",items:e.status,clearable:"",label:"Status",rules:e.formRules},model:{value:e.editedItem.status,callback:function(t){e.$set(e.editedItem,"status",t)},expression:"editedItem.status"}})],1)])],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("Cancel")]),-1==e.editedIndex?n("v-btn",{attrs:{color:"blue darken-1",text:"",disabled:!e.valid},on:{click:e.storeItem}},[e._v("Save")]):n("v-btn",{attrs:{color:"blue darken-1",text:"",disabled:!e.valid},on:{click:e.updateItem}},[e._v("Update")])],1)],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(t){var s=t.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(s)}}},[e._v("mdi-pencil")]),n("v-icon",{attrs:{small:""},on:{click:function(t){return e.deleteItem(s)}}},[e._v("mdi-delete")])]}}])},[n("alert")],1)],1)},i=[],a=(n("c975"),n("a434"),n("d3b7"),n("5530")),l=n("2f62"),o=n("c1df"),r=n.n(o),c={name:"RoleMenu",components:{Alert:function(){return n.e("alert").then(n.bind(null,"98ab"))}},data:function(){return{headers:[{text:"ID",value:"id"},{text:"Role Name",value:"role_name"},{text:"Menu Name",value:"menu_name"},{text:"Status",value:"status"},{text:"Action",value:"action"}],rolemenus:[],roles:[],menus:[],disabled:!1,dialog:!1,search:"",key:0,editedIndex:-1,editedItem:{id:"",role_name:"",menu_name:"",status:""},defaultItem:{id:"",role_name:"",menu_name:{},status:""},status:[{text:"ACTIVE"},{text:"INACTIVE"}],formRules:[function(e){return!!e||"Field is required"}],valid:!0,datetime:(new Date).toISOString()}},computed:Object(a["a"])({formTitle:function(){return-1===this.editedIndex?"New Role Menu":"Edit Role Menu"}},Object(l["c"])({user:"auth/user"})),methods:Object(a["a"])(Object(a["a"])({},Object(l["b"])({setAlert:"alert/set"})),{},{timestamp:function(){this.datetime=r()(this.date).format("YYYY-MM-DD HH:mm:ss")},open:function(){this.dialog=!0,this.disabled=!1,this.getMenus()},close:function(){var e=this;this.dialog=!1,setTimeout((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}),300)},getRoleMenus:function(){var e=this;this.axios.get("/setup/v1/rolemenus").then((function(t){var n=t.data.data;e.rolemenus=n})).catch((function(e){var t=e.responses;console.log(t)}))},getRoles:function(){var e=this;this.axios.get("/setup/v1/roles").then((function(t){var n=t.data.data;e.roles=n})).catch((function(e){var t=e.responses;console.log(t)}))},getMenus:function(){var e=this;this.axios.get("/setup/v1/allmenus",{params:{role_id:this.editedItem.role_name}}).then((function(t){var n=t.data.data;e.menus=n})).catch((function(e){var t=e.responses;console.log(t)}))},storeItem:function(){var e=this,t=0,n=new FormData;for(n.append("role_id",this.editedItem.role_name),t=0;t<this.editedItem.menu_name.length;t++)n.append("menu_id",this.editedItem.menu_name[t]);n.append("status",this.editedItem.status),n.append("created_by",this.user.id),this.axios.post("/setup/v1/rolemenus",n).then((function(t){var n=t.data.data;console.log(n),e.setAlert({status:!0,color:"success",text:"Data Saved"}),e.getRoleMenus()})).catch((function(e){console.log(e)})),this.close()},editItem:function(e){this.disabled=!0,this.editedIndex=this.rolemenus.indexOf(e),this.editedItem.id=e.id,this.editedItem.role_name=e.role_id,this.editedItem.menu_name=e.menu_id,this.editedItem.status=e.status,this.dialog=!0},updateItem:function(){var e=this,t=new FormData;t.append("id",this.editedItem.id),t.append("status",this.editedItem.status),t.append("updated_by",this.user.id),t.append("updated_at",this.datetime),this.axios.put("/setup/v1/rolemenus",t).then((function(t){var n=t.data;console.log(n),e.setAlert({status:!0,color:"success",text:"Data Updated"}),e.getRoleMenus()})).catch((function(e){console.log(e)})),this.close()},deleteItem:function(e){var t=this,n=this.rolemenus.indexOf(e),s=confirm("Yakin akan dihapus?");1==s&&this.axios.delete("/setup/v1/rolemenus",{data:{id:e.id}}).then((function(e){var s=e.data;console.log(s),t.setAlert({status:!0,color:"success",text:"Data Deleted"}),t.rolemenus.splice(n,1),t.key+=1})).catch((function(e){console.log(e)}))}}),created:function(){this.getRoleMenus(),this.getRoles(),this.timestamp()}},d=c,u=n("2877"),h=n("6544"),m=n.n(h),p=n("40dc"),f=n("c6a6"),v=n("8336"),I=n("b0af"),g=n("99d9"),b=n("62ad"),x=n("a523"),S=n("8fea"),y=n("169a"),_=n("4bd4"),D=n("132d"),k=n("0fd9"),C=n("2fa4"),V=n("8654"),w=n("71d9"),O=Object(u["a"])(d,s,i,!1,null,null,null);t["default"]=O.exports;m()(O,{VAppBar:p["a"],VAutocomplete:f["a"],VBtn:v["a"],VCard:I["a"],VCardActions:g["a"],VCardTitle:g["d"],VCol:b["a"],VContainer:x["a"],VDataTable:S["a"],VDialog:y["a"],VForm:_["a"],VIcon:D["a"],VRow:k["a"],VSpacer:C["a"],VTextField:V["a"],VToolbar:w["a"]})}}]);
//# sourceMappingURL=rolemenu.153eb823.js.map