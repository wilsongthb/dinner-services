<template>
  <div :data-changes="changes">
    <app-input-search class="mb-2" v-model="searchTerm"></app-input-search>
    <div class="row">
      <div
        class="col-6 col-sm-4 col-md-3 col-lg-2"
        v-for="(l, i) in listFiltered"
        :key="i"
      >
        <ProductCard
          @clickAdd="clickAddHandler"
          :selected="selected.has(l.id)"
          :product="l"
          @clickRemove="clickRemoveHandler"
        ></ProductCard>
      </div>
    </div>
    <MakeRequest @clickRequest="makeRequestHandler" ref="elMakeReq">
      <span v-show="selected.size > 0">({{ selected.size }})</span>
    </MakeRequest>
  </div>
</template>
<script>
import ProductCard from "./ProductCard";
import { DinnerService } from "./DinnerService";
import MakeRequest from "./MakeRequest";

export default {
  components: {
    MakeRequest,
    ProductCard
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    list: [],
    searchTerm: "",
    selected: new Map(),
    changes: 0
  }),

  computed: {
    listFiltered() {
      return this.list.filter(x => {
        let productName = "";
        productName = x.name;
        return (
          productName
            .toLowerCase()
            .trim()
            .search(this.searchTerm.toLowerCase()) > -1
        );
      });
    }
  },

  watch: {
    //
  },

  mounted() {
    DinnerService.getProducts({
      per_page: 1000
    }).then(data => {
      // console.log(data);
      this.list = data.data.reverse();
    });
  },

  methods: {
    makeRequestHandler() {
      let selectedList = [];
      this.selected.forEach(x => {
        selectedList.push(x);
      });
      this.$emit('makeRequest', selectedList);
    },
    emitProducts() {},
    clickRemoveHandler(productId) {
      this.selected.delete(productId);
      this.changes++;
    },
    clickAddHandler(product) {
      if (!this.selected.has(product.id)) {
        this.selected.set(product.id, {
          productId: product.id,
          name: product.name,
          price: product.unit_price,
          quantity: 1
        });
      } else {
        let productProfile = this.selected.get(product.id);
        productProfile.quantity++;
        console.log(productProfile);
        this.selected.set(product.id, productProfile);
      }
      this.changes++; // update view
      //this.selected.size;
    }
  }
};
</script>
<style scoped></style>
