<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <h2>login callback {{ JSON.stringify(route.query) }}</h2>
</template>
