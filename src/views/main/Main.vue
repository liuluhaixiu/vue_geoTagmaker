<template>
    
    <el-container style="height:100%">
        <el-aside width="auto">
            <common-aside></common-aside>
        </el-aside>
    <el-container>
        <el-header><common-header></common-header></el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
    

</template>

<script>
import App from '@/App.vue'
import CommonAside from '@/components/CommonAside'
import CommonHeader from '@/components/CommonHeader'
export default {
  components: {App,CommonAside,CommonHeader},
    data(){
        return {
        }
    },
    created(){
        this.isLogin();
        this.ver();
    },
    methods: {
        //判断是否已经登录状态
        // isLogin() {
        //     //判断sessionStorage中是否有登录信息
        //     if (sessionStorage.getItem("username") != null && sessionStorage.getItem("userToken")) {
        //         //存在登录信息就从sessionStorage中提取状态再传值给vuex中
        //         this.$store.commit("userStatus", sessionStorage.getItem("username"));
        //     } else {
        //         //登录不成功就将vuex中的state清空
        //         this.$store.commit("userStatus", null);
        //     }
        //     //返回登录状态islogin
        //     return this.$store.getters.isLogin;
        // },
        //通过登录状态来判断用户是否登录执行相关的操作
        ver() {
            if (this.$store.state.isLogin) {
                console.log("已登录");
                this.$notify({
                    title: '系统提示',
                    message: '欢迎用户：'+JSON.parse(sessionStorage.getItem('username')),
                    position: 'bottom-right'
                });
            } else {
                //如果没有登录就返回登录界面
                this.$router.push({name:'login'});
                this.$message({
                    message: '警告，请登录账户',
                    type: 'warning'
                });
            }
        },
}
}
</script>

<style lang='less' scoped>
.el-header{
    background-color: #333;

}
.el-main{
    padding-top: 0px;
}
</style>