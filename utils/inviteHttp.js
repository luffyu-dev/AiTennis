import {doPost} from './http/wxHttp-pre'; 
// import {doPost} from './http/wxHttp-prod'; 



// atp的排名信息搜索
export function applyInvite(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/invite/apply/edit",
    params,
    succEvent
  )
}



// atp的排名信息搜索
export function queryInvite(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/invite/query/info",
    params,
    succEvent
  )
}


// 取消活动
export function applyClose(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/invite/apply/close",
    params,
    succEvent
  )
}


// 报名活动接口
export function joinInvite(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/invite/join/submit",
    params,
    succEvent
  )
}


// 取消报名
export function cancelJoin(params,succEvent){
  console.log("searchAtpRank>>>>>params");
  doPost(
    "at-atp-api",
    "/at-api/invite/join/cancel",
    params,
    succEvent
  )
}