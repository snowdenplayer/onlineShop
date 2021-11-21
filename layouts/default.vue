<template>
  <div class="main">
    <Header/>
    <div class="default-content">
      <NuxtChild/>
    </div>
  </div>
</template>

<script>
import Header from "../components/common/Header";

export default {
  name: "default",
  components: {
    Header,
  }
}
</script>

<style lang="scss">
.default-content {
  padding-top: 142px;
}

</style>
