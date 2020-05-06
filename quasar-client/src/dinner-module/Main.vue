<template>
  <div class="row">
    <div class="col mb-5">
      <Header></Header>
      <ListProducts @makeRequest="makeRequestHandler"></ListProducts>
    </div>

    <app-modal-basic ref="elModalReq">
      <h4>REALIZA TU PEDIDO</h4>
      <FormRequest ref="elFormRequest"></FormRequest>
    </app-modal-basic>
  </div>
</template>
<script>
import FormRequest from "./FormRequest.vue";
import Header from "./Header";
import ListProducts from "./ListProducts";
// import ModalFullScreen from "../components/ModalFullScreen";

export default {
  components: {
    FormRequest,
    Header,
    ListProducts,
    // ModalFullScreen
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({}),

  computed: {},

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    makeRequestHandler(selectedProducts) {
      this.$refs.elModalReq.show();
      this.$refs.elFormRequest.prepare(selectedProducts);
    }
  }
};
</script>

<style scoped></style>
