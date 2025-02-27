<script setup lang="ts">
import { setupI18nSync } from 'devkit-base-components';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
import { RouterView } from 'vue-router';
setupI18nSync()
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
  <DynamicDialog />
  <Toas />
</template>
