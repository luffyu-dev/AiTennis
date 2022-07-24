import {doPost} from './wxHttp'; 


// atp的排名信息搜索
export function searchAtpRank(params,succEvent){
    console.log("searchAtpRank>>>>>params");
    doPost(
      "at-atp-api",
      "/at-api/atp/rank/search",
      params,
      succEvent
    )
}


// atp的人员信息搜索
export function searchAtpPlayer(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/atp/player/search",
    params,
    succEvent
  )

}


// wta的排名信息搜索
export function searchWtaRank(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/wta/rank/search",
    params,
    succEvent
  )

}


// wta的人员信息搜索
export function searchWtaPlayer(params,succEvent){
  doPost(
    "at-atp-api",
    "/at-api/wta/player/search",
    params,
    succEvent
  )
}