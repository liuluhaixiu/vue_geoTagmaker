//查询所有work的API
import request from '@/api/request'
// import JSON from 'json'
//登录API测试
export default function querydangeritem(tablename){

  return request({
    url:'/querydangeritem',  
    method:'post',
    data:{
      "tname":tablename
      
    }
  })
}