// import {doPost} from './wxHttp'; 

import {doPost} from './http/wxHttp-pre'; 
// import {doPost} from './http/wxHttp-prod'; 
import {isLogin,doLogin} from './login';

// atp的排名信息搜索
export function searchAtpRank(params,succEvent){
    console.log("searchAtpRank>>>>>params");
    doPost(
      "at-atp-api",
      "/at-api/rank/atp/search",
      params,
      succEvent
    )
}


// atp的人员信息搜索
export function searchAtpPlayer(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/player/atp/search",
    params,
    succEvent
  )

}


// wta的排名信息搜索
export function searchWtaRank(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/rank/wta/search",
    params,
    succEvent
  )

}


// wta的人员信息搜索
export function searchWtaPlayer(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/player/wta/search",
    params,
    succEvent
  )
}




// 关注球员
export function follow(params,succEvent){
  if(isLogin()){
    doPost(
      "at-atp-api",
      "/at-api/player/follow",
      params,
      succEvent
    )
  }else{
    doLogin(res=>{
      doPost(
        "at-atp-api",
        "/at-api/player/follow",
        params,
        succEvent
      )
    })
  }
}


// 取消关注
export function unfollow(params,succEvent){
  if(isLogin()){
      doPost(
        "at-atp-api",
        "/at-api/player/unfollow",
        params,
        succEvent
      )
  }else{
    doLogin(res => {
      doPost(
        "at-atp-api",
        "/at-api/player/unfollow",
        params,
        succEvent
      )
    })
  }
}