<template>
<v-container fluid fill-height>
<v-layout align-center justify-center>
  <v-flex xs12 >
    <v-card>
      <v-card-title >
          <div class='display-1'>Welcome</div>
        </v-card-title>
    </v-card>
    <v-card>
      <v-layout
        column
        fill-height
      >
        <v-card-title >
          <div class='headline'>Your Info</div>
        </v-card-title>
      </v-layout>
      <v-list two-line>
        <v-list-tile @click=''>
          <v-list-tile-action>
            <v-icon color='indigo'>portrait</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{userInfo.contact_name}}</v-list-tile-title>
            <v-list-tile-sub-title>Name</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile @click=''>
          <v-list-tile-action>
            <v-icon color='indigo'>phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{userInfo.contact_tel}}</v-list-tile-title>
            <v-list-tile-sub-title>Tel</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile @click=''>
          <v-list-tile-action>
            <v-icon color='indigo'>mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{userInfo.contact_email}}</v-list-tile-title>
            <v-list-tile-sub-title>Email</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider inset></v-divider>


        <v-list-tile @click=''>
          <v-list-tile-action>
            <v-icon color='indigo'>face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{userInfo.created}}</v-list-tile-title>
            <v-list-tile-sub-title>Created Date</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</v-layout>
</v-container>
</template>
<script>

  import {
    getUserInfo
  } from './service/user-service';

  export default {
    data:function(){
      return{
        userInfo:{}
      }
    },
    methods:{},
    created:function(){
      let vm = this;
      getUserInfo(vm).then(function(){}).catch(function(err){});

    }
  }
</script>
