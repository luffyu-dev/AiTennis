import {doPost} from './http/wxHttp-pre'; 
// import {doPost} from './http/wxHttp-prod'; 

import {isLogin,doLogin} from './login';


// atp的排名信息搜索
export function queryUserTennisInfo(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/u/tennis/info",
    params,
    succEvent
  )
}



// atp的排名信息搜索
export function queryUserTennisDate(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/u/tennis/date",
    params,
    succEvent
  )
}


