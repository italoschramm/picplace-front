<template>
    <div class="footer">
        <i class="pi pi-instagram mr-4 cursor-pointer" style="font-size: 2rem" @click="instagram()"></i>
        <i class="pi pi-facebook mr-4 cursor-pointer" style="font-size: 2rem" @click="facebook()"></i>
        <i class="pi pi-whatsapp mr-4 cursor-pointer" style="font-size: 2rem" @click="whatsapp()"></i>
    </div>             

</template>

<script>
import 'primeicons/primeicons.css';
import router from '@/router/index';

export default {
    data() {
    return {
            
    }
    
    },
    methods:{
        instagram(){
            router.push('/instagramPicPlace')
        },
        facebook(){
            router.push('/facebookPicPlace')
        },
        whatsapp(){
            router.push('/whatsappPicPlace')
        }
    }
}
</script>

<style lang="scss" scoped>

.footer{
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-top: 30px;
    display: flex;
}

</style>