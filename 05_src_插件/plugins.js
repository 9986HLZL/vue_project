export default{
    install(Vue,x,y,z){
        console.log(x,y,z);
        //定义全局过滤器
        Vue.filter('mySlice',function(value){
        return value.slice(0,4)
        })
         //自定义全局指令
         Vue.directive('fbind',{
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
                element.value=binding.value
            },
            //指令所在元素被插入页面时
            inserted(element,binding){
                element.focus()
            },
            //数据更新，指令所在的模板被重新解析时
            update(element,binding){
                element.value=binding.value
            }
        })
        //定义混入
        Vue.mixin({
            data(){
                return {
                    x:1,
                    y:2
                }
            }
        })
        Vue.prototype.hello=()=>{
            alert('你好啊')
        }

    }
}
