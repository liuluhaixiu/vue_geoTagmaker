import request from '@/api/request'
// import JSON from 'json'
import qs from 'qs'
//登录API测试
export default function regist_API(data){
  console.log(qs.stringify(data));
  return request({
    url:'/register',  
    method:'post',
    data:{
      "uname":data.username,
      "upasswd":data.password,
      "uphone":data.uphone,
      "umail":data.umail
    }
  })
}