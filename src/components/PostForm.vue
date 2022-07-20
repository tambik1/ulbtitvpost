<template>
    <form
    @submit.prevent
    >
        <h4>Создание поста</h4>
        <my-input
         v-model="post.title"
         type="text"
         placeholder="Название">
        </my-input>
        <my-input
         v-model='post.body'
         type="text"
         placeholder="Описание">
         </my-input>
        <my-button class="btn"
         style="align-self: flex-end;
         margin-top:10px;
         "
         @click="createPost"
        >
            Создать
        </my-button>
    </form>
</template>

<script>
import MyInputVue from './UI/MyInput.vue';
export default {
    data() {
        return {
            post: {
                title:"",
                body:"",
            }
        }
    },
    methods:{
        createPost() {
        this.post.id= Date.now();
        this.$emit('create',this.post)
        this.post ={
            title:'',
            body:'',
        }
    }
}
}
</script>



<style>
form{
    display: flex;
    flex-direction: column;
}


</style>