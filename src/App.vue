<template>
  <div id="app">
    <Header />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './Header.vue'
export default {
  components: { Header }
}
</script>




