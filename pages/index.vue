<template>
  <div className="home">
    <HomeComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HomeComponent from "@/components/home/HomeComponent";

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
