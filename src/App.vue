<template>
<div class="app">
  <h1>Страница с постами</h1>
  <my-input
  v-model="searchQuery"
  placeholder="Поиск..."
  />
  <div class="app__btns">
      <my-button
        @click="showDialog"
  >
    Создать пост
    </my-button>
    <my-select
    v-model="selectedSort"
    :options='sortOptions'
   />
  </div>
    <my-dialog v-model:show = "dialogVisible">
      <post-form
        @create="createPost"
      />
    </my-dialog>
    <post-list 
      :posts="searchPosts"
      @remove = "removePost"
      v-if="!isPostsLoading"
    />
    <div v-else> ...Тут мог быть лоудер, но мне лень...</div>
</div>
    <div class="page__wraper">
      <div
       v-for="pageNumber in totalPages"
       :key="pageNumber"
       class="page"
       :class="{
        'current-page': page === pageNumber
       }"
       @click="chagePage(pageNumber)"
       >{{pageNumber}}</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';
import MyButton from './components/UI/MyButton.vue';
export default {
  components:{
    PostForm,
    PostList,
    MyButton,
  },
  data() {
    return{
        posts: [],  
        dialogVisible: false,
        isPostsLoading: false,
        selectedSort:"",
        searchQuery:"",
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          {value: "title", name:'По названию'},
          {value: "body", name:'По содержимому'}
        ]
    }
  },
  methods:{
    createPost(post){
        this.posts.push(post); 
        this.dialogVisible = false;
    },
    removePost(post){
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog(){
      this.dialogVisible = true;
    },
    chagePage(pageNumber){
      this.page = pageNumber
    }
    ,
    async fetchPosts() {
      try{
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params:{
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit )
        this.posts = response.data;
      } catch (e) {
        alert ('Произошла ошибка')
      } finally{
        this.isPostsLoading = false;
      }
    },
  },
  mounted(){
      this.fetchPosts();
  },
  computed:{
    sortedPost() {
      return [...this.posts].sort((post1 ,post2 ) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    searchPosts(){
      return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchPosts();
    }
}
}
</script>



<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app{
    padding: 20px;
}
.app__btns{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wraper{
  display: flex;
  margin-top: 15px;
  flex-direction: row;
}
.page{
  border: 1px solid  teal;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
}
.page:nth-child(1){
  margin-left: 20px;
}
.current-page{
  border: 3px solid  teal;
}

</style>
