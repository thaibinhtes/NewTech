<template>
  <div class="radio-group">
    <ul v-show="Array.isArray(data) && data.length > 0" class="radio-group__list">
      <li v-for="(item, index) in data" :key="index" class="radio-group__item">
        <InputRadio v-bind="item" v-model="modelValue" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { RADIO_INPUT } from '~/types/input.type';

const props = defineProps({
  data: {
    type: Array as PropType<RADIO_INPUT[]>,
    default: () => [],
    required: true
  }
})

const modelValue = defineModel<any>()
const emit = defineEmits<{ (e: 'checked', value: string | number): void }>()
</script>

<style lang="scss">
.radio-group {
  &__item {
    padding: 8px 0;
  }
}
</style>
