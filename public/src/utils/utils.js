"use strict";
import axios from 'axios'
import {axiosConfig} from '../config/axiosConfig.js'

export function numberWithCommas(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function postErrorMsg(msg){
    var url = '/errorHandling';
    return axios.post(url,{msg},axiosConfig);
}
export function validateJsonObj(msg){
    if(msg != null && !(msg instanceof Object)){
        return msg = JSON.parse(msg);
    } else{
        return msg;
    }
}
