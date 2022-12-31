<template>
    <div class="div-msg">
        <Card style="width: 25em">
            <template #header>
                <img alt="user header" src="@/assets/quintoAndar.svg" style="height: 3rem">
            </template>
            <template #title>
                Em análise
            </template>
            <template #content>
                <p>Sua publicação está em análise e em breve será publicada.</p>
            </template>
        </Card>
        
    </div>
</template>

<script>
import http from '@/api/back-api.js';

export default {
    
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}

.div-msg { 
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 100px;
    align-self: center;
    width: 80%;
}

</style>