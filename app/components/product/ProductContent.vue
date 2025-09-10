<template>
  <div class="product-content">
    <div class="product-content__container">
      <div class="product-content__intro">
        <h3 class="product-content__title">
          {{ modelValue.name }}
        </h3>
        <p class="product-content__desc">{{ modelValue.description }}</p>
      </div>

      <div class="product-content__options">
        <div class="product-content__option-title flex items-center">
          <span class="uppercase">
            Choose options
          </span>
          <span class="product-content__border"></span>
        </div>

        <ul v-show="Array.isArray(props?.options) && props?.options?.length > 0" class="product-content__data-options">
          <li v-for="(item, index) in props.options" :key="index"
            class="product-content__item-option grid grid-cols-12 items-center cursor-pointer"
            @click="onChooseOption(item)"
            
          >
            <div class="product-content__name-option col-span-4">
              <span class="font-bold inline-block">
                {{item.displayName}}
              </span>
            </div>

            <div class="product-content__value-option col-span-8">
              {{ showDisplayNameOptino(item) }}
            </div>
          </li>
        </ul>
      </div>

      <h4 class="product-content__price">
        {{ formatPrice(priceProduct) }}
      </h4>

      <div class="product-content__form flex items-center">
       <div class="product-content__quantity">
        <InputQuantity v-model="modelValue.quantity" :label="`Quantity`" />
       </div>

        <button @click="addCart" class="button product-content__btn-add-cart flex items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L4.867 18.143C4.90322 18.6483 5.12982 19.121 5.50104 19.4656C5.87226 19.8103 6.36044 20.0013 6.867 20H17.143C17.6496 20.0013 18.1377 19.8103 18.509 19.4656C18.8802 19.121 19.1068 18.6483 19.143 18.143L20.01 6H4.01H4Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.5 6C8.5 4.347 10 2 12 2C14 2 15.5 4.347 15.5 6" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 10V16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 13H15" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            
          <span class="uppercase">
            add to cart
          </span>
        </button>
      </div>
    </div>

  
    <BaseModal v-model="showModalOption" :title="optionSelected?.displayName">
      <RadioGroup :data="dataOption" v-model="dataSelected" />
    </BaseModal>
  </div>
</template>

<script lang="ts" setup>
import type { PRODUCT, PRODUCT_OPTION_TYPE, PRODUCT_OPTION_TYPE_SELECTED } from '~/types/product.type'
import InputQuantity from '~/components/input/InputQuantity.vue'
import BaseModal from '../modal/BaseModal.vue'
import InputRadio from '../input/InputRadio.vue'
import RadioGroup from '../input/RadioGroup.vue'
import { formatPrice } from '~/utils/price'
const toast = useToast();
const modelValue = defineModel<Partial<PRODUCT> & { quantity: number }>({
  default: {
    uid: null,
    name: '',
    description: '',
    slug: '',
    quantity: 1
  }
})

const props = defineProps({
  options: {
    type: Array as PropType<PRODUCT_OPTION_TYPE[]>,
    default: () => []
  }
})

const defaultOptionProduct = (data: PRODUCT_OPTION_TYPE_SELECTED[]) => {
  
  modelValue.value = {
    ...modelValue.value,
    options: [
      ...data
    ]
  }
}


const optionSelected = ref<PRODUCT_OPTION_TYPE>()
const showModalOption = ref(false)
const dataSelected = ref()

const dataOption = computed(() => {
  return optionSelected?.value?.options?.map(item => ({
    label: item.displayName,
    value: item.uid,
    id: item.uid,
    ...item
  }))
})

const priceProduct = computed(() => {
  return(modelValue?.value?.options?.reduce((price, item) => {
    console.log(item.option?.price)
     price += item?.option?.price || 0
     return price
  }, 0) || 0 ) * (modelValue?.value?.quantity || 1)
})

const showDisplayNameOptino = (option: PRODUCT_OPTION_TYPE) => {
  const optionFind = modelValue?.value?.options?.find(item => item.optionTypeId === option.optionTypeId)

  return optionFind?.option?.displayName || ''

}

const onChooseOption = (data: PRODUCT_OPTION_TYPE) => {
  showModalOption.value = true
  optionSelected.value = data
  const optionFind = modelValue?.value?.options?.find(item => item.optionTypeId === data.optionTypeId)
  dataSelected.value = optionFind?.option?.uid
}

const addCart = () => {
  toast.success({
    message: "The product has been added to your cart"
  });
}




watch(
  () => props.options,
  (newOptions) => {
    if (newOptions && newOptions.length > 0) {
      const optionDefault = newOptions.map((item: PRODUCT_OPTION_TYPE) => ({
        optionTypeId: item.optionTypeId,
        displayName: item.displayName,
        option: item.options.length > 0 ? {...item.options[0]} : {optionTypeId: null, displayName: null}
      }))
      defaultOptionProduct(optionDefault)
    }
  },
  { immediate: true }
)


watch(dataSelected, (newSelected) => {
  if (!optionSelected.value || !newSelected) return;

  const updateOptionProduct = optionSelected.value.options.find(
    item => item.uid === newSelected
  );
  if (!updateOptionProduct) return;

  modelValue.value = {
    ...modelValue.value,
    options: modelValue.value?.options?.map(optionItem => {
      if (optionItem.optionTypeId === optionSelected.value?.optionTypeId) {
        return {
          ...optionItem,
          option: {
            ...updateOptionProduct,
          },
        };
      }
      return optionItem;
    }) ?? [],
  };

});
</script>


<style lang="scss">
  .product-content {
    &__intro {
      padding-bottom: 48px;
    }
    &__title {
      font-size: 48px;
      line-height: 57.6px;
      color: $product-title;
      margin-bottom: 24px;
    }

    &__desc {
      font-size: 16px;
      line-height: 24px;
      white-space: 16px;
      color: $product-desc;
    }

    &__option-title {
      padding-bottom: 24px;
      font-size: 20px;
      line-height: 24px;
      gap: 16px;
    }

    &__border {
      height: 1px;
      width: 100%;
      background-color: $product-border-bg;
    }

    &__item-option {
      padding: 16px;
      border: 1px solid $product-option-border;
      font-size: 16px;
      line-height: 24px;
      color: $product-option-color;
      border-bottom: none;

      &:last-child {
        border-bottom: 1px solid $product-option-border;
      }
    }

    &__name-option {
      font-weight: 600;
    }
    
    &__options {
      padding-bottom: 24px;
    }

    &__price {
      font-size: 28px;
      line-height: 35px;
      font-weight: 600;
      color: $product-price;
      padding-bottom: 24px;
    }

    &__choose-options {
      display: flex;
      flex-direction: column;
    }

    &__choose-option {
      padding: 8px 0;
      border-bottom: 1px solid $product-border-option;
    }

    &__form {
      gap: 12px;
      align-items: end;

      & .input-quantity__main {
        height: 44px;
      }
    }

    &__quantity {
      width: 120px;
    }

    &__btn-add-cart {
      width: calc(100% - 120px);
      color: $white-1;
      background-color: #231F20;
      height: 44px;
      justify-content: center;
      gap: 12px;
      font-size: 14px;
      line-height: 24px;
    }
  }
</style>