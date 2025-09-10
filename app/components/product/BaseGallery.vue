<template>
<div class="base-gallery w-full">
  <div v-show="props.images.length > 0" class="base-gallery__container w-full flex">
    <div class="base-gallery__main w-full relative">
      <BaseBanner class="base-gallery__banner" :url="ImageActive?.url"/>

      <div class="base-gallery__action flex gap-[4px] absolute">
        <button @click="onPrev" class="button base-gallery__btn-action --prev">
          <span class="icon-arrow-left"></span>
        </button>

        <button @click="onNext" class="button  base-gallery__btn-action --next">
          <span class="icon-arrow-right"></span>
        </button>
      </div>
    </div>

    <ul class="base-gallery__images flex w-full">
      <li v-for="(item, index) in images"
        :key="index"
        :class="{
          'base-gallery__image cursor-pointer flex items-center': true,
          '--active': index === modelValue
        }"
          @click="onActiveImage(index)"
        >
        <BaseBanner v-bind="item" :url="item.url"  />
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts" setup>
import  { type PRODUCT_IMAGE } from '~/types/product.type';
import BaseBanner from '../banner/BaseBanner.vue';

  const props = defineProps({
    images: {
      type: Array as PropType<PRODUCT_IMAGE[]>,
      default: () => []
    }
  })

  const modelValue = defineModel<number>({default: 0})


  const ImageActive = computed(() => {
    console.log(props.images[modelValue.value ?? 0], modelValue.value)
    return props.images[modelValue.value ?? 0]
  })

  const  onActiveImage = (index: number) => {
    modelValue.value = index 
  }

  const onPrev = () => {
    if (modelValue.value <= 0) modelValue.value = props.images?.length - 1
    else modelValue.value -= 1
  }

  const onNext = () => {
    if (modelValue.value == (props.images?.length - 1)) modelValue.value = 0
    else modelValue.value += 1
  }
</script>

<style lang="scss">
  .base-gallery {
    &__container {
      gap: 12px;
      flex-direction: column;
    }
    &__main {
      padding: 123px 54px;
      border: 1px solid $gallery-border;
    }


    &__images {
      gap: 12px;
    }

    &__image {
      flex: 0 0 auto;
      width: 138px;
      border: 1px solid transparent;

      &.\--active {
        border-color: $base-gallery-border-active-item;
      }
    }

    &__action {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }

    &__btn-action {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $base-gallery-action-bg;
    }
  }
</style>