<script setup lang="ts">
import { DynamicDialog } from 'primevue';
</script>
<template>
	<h2>
		asd
	</h2>
	<AppBtn label="asd" :action="() => { }" />
	<Suspense>
		<RouterView />
	</Suspense>
	<DynamicDialog />
</template>
