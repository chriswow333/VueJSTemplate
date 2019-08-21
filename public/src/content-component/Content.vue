<template>
  <v-app id='inspire'>
    <v-toolbar
      :clipped-left='$vuetify.breakpoint.lgAndUp'
      color='blue darken-3'
      dark
      app
      fixed
    >
      <v-toolbar-title style='width: 300px' class='ml-0 pl-3'>
        <v-toolbar-side-icon color='blue darken-4' dark @click.stop='toggleDrawer'></v-toolbar-side-icon>
        <span class='hidden-sm-and-down'>VueJS Template</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-tooltip v-if='signin' bottom>
          <template v-slot:activator='{ on }'>
          <v-btn icon color='blue darken-3' dark v-on='on'>
            <router-link to='/user/info'>
              <v-icon color='white'>badge</v-icon>
            </router-link>
          </v-btn>
          </template>
          <span>User Info</span>
        </v-tooltip>
        <v-tooltip v-if='signin' bottom>
          <template v-slot:activator='{ on }'>
          <v-btn icon color='blue darken-3' dark v-on='on' v-on:click='logout'>
            <v-icon color='white'>exit_to_app</v-icon>
          </v-btn>
          </template>
          <span>Sign Out</span>
        </v-tooltip>

        <v-tooltip v-if='!signin' bottom>
          <template v-slot:activator='{ on }'>
            <v-btn icon color='blue darken-3' dark v-on='on'>
              <router-link to='/user/signin'>
                <v-icon dark color='white'>vpn_key</v-icon>
              </router-link>
            </v-btn>
          </template>
          <span>Sign In</span>
        </v-tooltip>
    </v-toolbar>

    <content-sidebar-component></content-sidebar-component>

    <transition name='fade'>
      <router-view></router-view>
    </transition>

    <v-dialog  v-model='mainMenu' width='800px'>
      <v-card>
        <v-card-title
          class='grey lighten-4 py-4 title'
        >
          Menu
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import {
    contentStore
  } from './service/content-vuex';

  import {
    getUserInfo,
    userLogout
  } from '../user-component/service/user-service';
  

  import contentSidebarComponent from './Content-sidebar.vue';


  export default {
    store: contentStore,
    components: {
      'content-sidebar-component': contentSidebarComponent
    },
    created: function () {
      let vm = this;
      getUserInfo(vm).then(function(){}).catch(function(err){});
    },
    updated: function () {
      this.$nextTick(function () {
        let vm = this;
        getUserInfo(vm).then(function(){}).catch(function(err){});
      })
    },
    data: function () {
      return {
        mainMenu:false,
      }
    },
    computed:{
      signin:function(){
        let vm = this;
        return vm.$store.getters['user/signin'];
      },
    },
    methods: {
      toggleDrawer: function () {
        let vm = this;
        vm.$store.dispatch({
          type:'content/toggleDrawer'
        });
      },
      logout: function () {
        let vm = this;
        userLogout(vm);
        vm.$router.push({ path: 'user/signin' });
      }
    }
  }
</script>