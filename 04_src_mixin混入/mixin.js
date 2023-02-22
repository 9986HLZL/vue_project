 const mixin={
    data(){
        return {
            x:1,
            y:2
        }
    },
    methods:{
        showName(){
            alert(this.name)
        } 
    },
    mounted(){
        console.log('@');
    }
}
export default mixin
