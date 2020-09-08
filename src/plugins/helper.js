"use strict"

import Vue from 'vue'

const Helper = {
    install(Vue) {
        Vue.prototype.appName = process.env.VUE_APP_NAME
        Vue.prototype.getImage = function (image) {
            if (image != "null" && image != undefined && image.length > 0) {
                return process.env.VUE_APP_BACKEND_URL + "/service/image/" + image
            }
            return "/img/unavailable.png"
        }
        Vue.prototype.getThumb = function (image) {
            if (image != "null" && image != undefined && image.length > 0) {
                return process.env.VUE_APP_BACKEND_URL + "/service/image_thumb/" + image
            }
            return "/img/unavailable.png"
        }
    }
}
Vue.use(Helper)