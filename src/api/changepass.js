import request from '@/api/request'
// import JSON from 'json'
import qs from 'qs'
//登录API测试
export default function changepass_API(data){
  console.log(qs.stringify(data));
  return request({
    url:'/update_password',  
    method:'post',
    data:{
      "uname":data.username,
      "upasswd":data.password,
      
    }
  })
}
