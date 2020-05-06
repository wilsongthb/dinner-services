<template>
  <div class="app_this text-center shadow-lg bg-white">
    <button
      type="button"
      class="btn btn-primary m-1"
      @click="clickButtonHandler"
    >
    Realizar pedido <slot></slot>
    </button>
  </div>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    //
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    clickButtonHandler() {
      this.$emit("clickRequest");
    }
  }
};
</script>
<style scoped>
.app_this {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
