<script setup lang="ts">
import LogList from "@/components/log_components/LogList.vue";
import Statistics from "@/components/log_components/Statistics.vue";
</script>

<template>
  <div class="my_content">
    <LogList />
    <Statistics/>
  </div>
</template>

<style scoped>
.my_content {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1vh;
  gap: 1em;
}

LogList, Statistics {
  flex: 1;
}
</style>
