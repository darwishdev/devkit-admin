<script setup lang="ts">
import FileManager from "@/app/filemanager/FileManager.vue";
import { FormKit } from "@formkit/vue";
</script>
<template>
  <FormKit type="devkitUpload" bucketName="images" />
  <!-- <FileManager /> -->
</template>
