<template>
<v-container fluid fill-height>
<v-layout align-center justify-center>
  <v-flex xs12 sm8>
    <v-card class='elevation-12'>
      <v-toolbar dark color='success'>
        <v-toolbar-title>Sign In</v-toolbar-title>
          <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
          <v-form>
            <v-text-field 
              prepend-icon='person' 
              v-model='account' 
              label='Account' 
              type='text'
              :error-messages='errMsg'
            ></v-text-field>
            <v-text-field 
              prepend-icon='lock' 
              v-model='password' 
              label='Password' 
              id='password' 
              type='password'
              :error-messages='errMsg'
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color='success' v-on:click='sendToSignin'>Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</v-layout>
</v-container>
</template>
<script>

  import {
    signIn
  } from './service/user-service';

  export default {
    data:function(){
      return{
        account:'',
        password:'',
        errMsg:''
      }
    },
    methods:{
      sendToSignin:function(){
        let vm = this;
        signIn(vm).then(function(){}).catch(function(err){});
      }
    }
  }
</script>
