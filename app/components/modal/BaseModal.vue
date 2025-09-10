<template>
  <div v-show="modelValue" class="base-modal fixed h-screen w-full" @click.self="onClose">
    <div class="base-modal__container h-full absolute">
      <div class="base-modal__header flex items-center">
        <slot name="header">
          <h4 class="base-modal__title uppercase">
            {{ title }}
          </h4>
  
          <button @click="onClose" class="button base-modal__btn-close flex items-center">
            <span class="icon-x"></span>
          </button>
        </slot>
      </div>

      <div class="base-modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
})
const emit = defineEmits<{
  (e: 'close'): void
}>()

const modelValue = defineModel<boolean>({default: false})
const onClose = () => {
  modelValue.value = false
  emit('close')
}
</script>

<style lang="scss">
  .base-modal {
    top: 0;
    left: 0;
    background-color: $base-modal-bg;
    z-index: 998;

    &__container {
      min-width: 512px;
      background-color: $base-modal-bg-content;
      right: 0;
      top: 0;
      z-index: 999;
    }

    &__header {
      padding: 32px;
      justify-content: space-between;
      border-bottom: 1px solid $base-modal-header-border;
    }

    &__btn-close {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    &__content {
      padding: 32px;
    }
    
  }
</style>