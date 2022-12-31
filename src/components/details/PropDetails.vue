<template>
    <div>
        <Card style="width: 25rem; margin-bottom: 2em">
            <template #title>
                Simple Card
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
        </Card>
    </div>
</template>

<script>
import http from '@/api/back-api.js';

export default {
    data() {
        return {
            
        }
        
    }
}
</script>

<style lang="scss" scoped>
p {
    line-height: 1.5;
    margin: 0;
}
</style>