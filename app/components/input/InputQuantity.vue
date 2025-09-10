<template>
  <div v-bind="$attrs" class="input-quantity">
    <div class="input-quantity__container">
      <label v-show="label" for="quantity" class="input-quantity__label">
        {{ label }}
      </label>

      <div class="input-quantity__main flex items-center">
        <button @click="onDeCrease" class="input-quantity__btn --decrease">
          <span class="icon-minus"></span>
        </button>
        <input 
            :min="props.min"
            :max="props.max"
            :value="modelValue"
            class="focus:outline-none text-center"
            type="number"
            id="input-quantity"
          />

          <button @click="onIncCrease" class="input-quantity__btn --increase">
            <span class="icon-plus"></span>
          </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<number>({default: 1})
const props = defineProps({
  label: String,
  min: {
    type: Number,
    default: 0,
    required: false
  },
  max: {
    type: Number,
    required: false,
    default: 999999999999
  }
})

const onDeCrease = () => {
  modelValue.value === 1 ? 1 : modelValue.value -= 1;
}

const onIncCrease = () => {
  modelValue.value === props.max ? props.max : modelValue.value += 1;
}
</script>

<style lang="scss">
  .input-quantity {
    &__label {
      padding-bottom: 6px;
      color: $input-quantity-label;
      font-size: 14px;
      line-height: 21px;
    }

    &__main {
      padding: 12px;
      border: 1px solid $input-quantity-border;

      & input {
        top: 0;
        left: 0;
        min-width: 52px;
      }

      & input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      
      /* Firefox */
      & input[type=number] {
        -moz-appearance: textfield;
      }
    }

    &__btn {
      width: 25.73px;
      height: 24px;
      text-align: center;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>