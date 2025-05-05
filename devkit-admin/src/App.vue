<script setup lang="ts">
import { DynamicDialog, Toast } from "primevue";
</script>
<template>
  <h2>asd</h2>
  <AppBtn label="asd" :action="() => {}" />
  <Suspense>
    <RouterView />
  </Suspense>
  <Toast />
  <DynamicDialog />
</template>
