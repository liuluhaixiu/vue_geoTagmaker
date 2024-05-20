import request from '@/api/request'
// import JSON from 'json'
//登录API测试
export default function login_API(data){
  console.log(data)
  return request({
    url:'/login',  
    method:'post',
    data:{
      "uname":data.username,
      "upasswd":data.password,
    }
  })
}
