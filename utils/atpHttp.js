// import {doPost} from './wxHttp'; 

import {doPost} from './http/wxHttp-pre'; 


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