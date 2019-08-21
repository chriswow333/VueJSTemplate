import 'babel-polyfill';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import 'vuetify-datetime-picker/src/stylus/main.styl';
import 'vuetify/dist/vuetify.min.css'; 
import '../stylus/main.css';

Vue.use(Vuetify);
Vue.use(VueRouter);


/** Content Component */
const contentComponent = ()=>import(/* webpackChunkName: 'content' */ './content-component/Content.vue');
/** Content Component END */


/** User Component */
const userComponent = ()=>import (/* webpackChunkName: 'signin' */ './user-component/User.vue');
const userSigninComponent = ()=>import (/* webpackChunkName: 'user-signin' */ './user-component/User-signin.vue');
const userInfoComponent = ()=>import (/* webpackChunkName: 'user-info' */ './user-component/User-info.vue');
/** User Component END*/


const mainRouter = new VueRouter({
  mode: 'history',
  base: '/template/v1',
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } 
  },
  routes: [
    {
      path: '/user',
      name:'user',
      component:userComponent,
      props:true,
      children:[
        {
          path: 'info',
          name: 'info',
          component:userInfoComponent,
          props: true
        },
        {
          path: 'signin',
          name: 'signin',
          component:userSigninComponent,
          props: true 
        },
        {   
          path: '*', 
          redirect: { path: '/signin' } 
        }
      ]
    },
    {  
      path: '/*', 
      redirect: { name: 'signin' } 
    }
  ]
});


let main = new Vue({
  el: '#app',
  router:mainRouter,
  components:{
    'content-component':contentComponent
  }
});


