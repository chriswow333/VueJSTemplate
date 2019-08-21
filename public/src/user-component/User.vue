<template>
  <v-flex>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
  </v-content>
  </v-flex>
</template>

<script>
import {
  verifyUserSignin,
  redirectUserInfoPath
} from './service/user-service';
export default {
  data:()=>{
    return {}
  },
  beforeRouteEnter(to, from, next){
    if(to.name === 'signin'){
      next(vm=>{
        verifyUserSignin(vm).then(function(){
          redirectUserInfoPath(vm);
        }).catch(function(err){});
      });
    }else{
      next(vm=>{});
    }
  }  
}

</script>
