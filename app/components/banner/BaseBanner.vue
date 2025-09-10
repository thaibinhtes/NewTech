<template>
<div class="base-banner w-full" v-bind="$attrs">
  <div class="base-banner__container text-center m-auto">
    <img 
      :src="url"
      alt="banner"
      class="base-banner__image m-auto"
      width="auto"
      height="auto"
    />    
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">
  const props = defineProps({
    url: {
      type: String,
      default: ''
    },
  })
</script>

<style lang="scss">
  .base-banner {
    &__container {
    }
  }
</style>