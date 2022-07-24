<template>
    <div>
        <h1>Эта страница создана для изучения роутинга во Vue 3</h1>
        <router-link to="/posts">Глянь страничку с постами.</router-link>
        <br>
        <router-link to="/about">Роутинг просто практикую, можешь жмякнуть по ссылке</router-link>
    </div>

</template>

<script>
export default{
}

</script>



<style scoped>
a{
    text-decoration: none;
    color: teal;
}
</style>