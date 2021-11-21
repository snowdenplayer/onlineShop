import Vue from 'vue'
import { clickOutside } from '@/common/utils/directives'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.directive('click-outside', clickOutside)
