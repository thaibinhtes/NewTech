export interface PRODUCT_IMAGE {
  url: string;
  alt?: string;
  title?: string;
}

export interface PRODUCT_OPTION {
  uid: string;
  skuCode: string;
  displayName: string;
  price: number;
}

export interface PRODUCT_OPTION_TYPE {
  optionTypeId: number;
  displayName: string;
  options: PRODUCT_OPTION[];
}

export interface PRODUCT_OPTION_TYPE_SELECTED {
  optionTypeId: number;
  displayName: string;
  option?: PRODUCT_OPTION;
}

export interface PRODUCT {
  uid: string;
  name: string;
  slug: string;
  description?: string;
  options?: PRODUCT_OPTION_TYPE_SELECTED[];
  quantity?: number;
}
