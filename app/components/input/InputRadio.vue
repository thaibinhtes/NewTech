<template>
  <div @click="onClick" class="input-radio w-full">
    <div class="input-radio__container flex items-center space-between">
      <label v-show="label" for="radio" class="input-radio__label">
        {{ label }}
      </label>

      <div class="input-radio__main">
        <input :value="value" v-model="modelValue" type="radio" class="hidden" />

        <span :class="{
          'input-radio__icon cursor-pointer': true,
          '--checked icon-checked': value === modelValue
        }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RADIO_INPUT } from '~/types/input.type';

const props = defineProps<RADIO_INPUT>()

const modelValue = defineModel<any>()

const emit = defineEmits<{
  (e: 'checked', value: string | number): void
}>()

const onClick = () => {
  modelValue.value = props.value
  emit('checked', props.value)
}
</script>

<style lang="scss">
  .input-radio {
    &__container {
      justify-content: space-between;
    }

    &__icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      font-size: 10px;
      border: 1px solid $input-radio-checked-bg;

      &.\--checked {
        opacity: 1;
        background-color: $input-radio-checked-bg;

      }
    }
  }
</style>