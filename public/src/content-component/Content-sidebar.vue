<template>
    <v-navigation-drawer
      :clipped='$vuetify.breakpoint.lgAndUp'
      :value='drawer'
      fixed
      app
    >
      <v-list dense>
        <v-list-group no-action sub-group>

          <v-list-tile slot='activator'>
            <v-list-tile-action>
              <v-icon>contacts</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                User
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if='signin'>
            <v-list-tile-action>
              <v-icon>history</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link to='/user/info'>
                User Info
                </router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  export default {
    data:function(){
      return {}
    },
    computed:{
       drawer:function(){
         let vm = this;
        return vm.$store.getters['content/drawer'];
      },
      signin:function(){
        let vm = this;
        return vm.$store.getters['user/signin'];
      }
      
    },
    methods:{}
  }
</script>
      
