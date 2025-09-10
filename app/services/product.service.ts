// ~/services/product.service.ts
import useApiClient from './_api'

class PRODUCT_SERVICE {
  public $api
  public url: string

  constructor() {
    this.$api = useApiClient()
    this.url = '/product.json'
  }

  async get() {
    const res = await this.$api.get(this.url)
    return res.data
  }
}
