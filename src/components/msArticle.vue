<template>
  <div class="posts-tab flex space-center">
      <ul class="posts-sidebar flex">
        <li
          v-for="post in posts"
          :key="post.id"
          :class="{ selected: post === selectedPost }"
					@click="selectedPost = post"
        >
          {{ post.title }}
        </li>
      </ul>
      <div class="selected-post-container">
      	<div 
        	v-if="selectedPost"
          class="selected-post"
        >
          <h3>{{ selectedPost.title }}</h3>
          <div v-html="selectedPost.content"></div>
        </div>
        <strong v-else>
          Click on a blog title to the left to view it.
        </strong>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "第一",
          content:
            "<p>第一篇文章</p>"
        },
        {
          id: 2,
          title: "第二",
          content:
            "<p>第二篇文章</p>"
        },
        {
          id: 3,
          title: "第三",
          content:
            "<p>第三篇文章</p>"
        }
      ],
      selectedPost: null
    }
  }
}
</script>
<style scoped>
.posts-tab {
  border: 1px solid #1f1f1d;
}
.selected-post-container {
  width: 500px;
  border: 1px solid #1f1f1d;
}
.posts-sidebar {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
.posts-sidebar li {
  list-style-type: none;
  text-align: center;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #1f1f1d;
}
</style>