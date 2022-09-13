<template>
  <div class="main">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="150" height="150" />
    <Header msg="To Do List" />
  </div>

  <!-- <RouterView /> -->

  <ToDos v-model="notification_content" />

  <Notification v-if="notification_content">
    <p>{{ notification_content }}</p>
  </Notification>

</template>

<script>
import Header from './components/Header.vue'
import Notification from './components/UI/Notification.vue'
import ToDos from './components/ToDos.vue'

export default {
  components: {
    Header,
    Notification,
    ToDos
},
  data() {
    return {
      notification_content: ''
    }
  }
}

</script>

<style scoped>
.main {
  line-height: 1.5;
  padding: 1rem 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .main {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .main .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
