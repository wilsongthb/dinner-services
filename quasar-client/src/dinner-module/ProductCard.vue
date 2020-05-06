<template>
  <div>
    <div>
      <img
        :src="imageUrl"
        alt="imagen referencial"
        class="img-thumbnail"
      />
    </div>
    <div class="my-1">
      <button
        v-show="!selected"
        type="button"
        class="btn btn-primary btn-sm mr-1"
        @click="$emit('clickAdd', product)"
      >
        <i class="fa fa-cart-plus"></i>
      </button>
      <button
        type="button"
        v-show="selected"
        class="btn btn-success btn-sm mr-1"
        @click="$emit('clickAdd', product)"
      >
        <i class="fa fa-plus"></i>
      </button>
      <button
        v-show="selected"
        type="button"
        class="btn btn-danger btn-sm"
        @click="$emit('clickRemove', product.id)"
      >
        <i class="fa fa-trash"></i>
      </button>
    </div>
    <small>{{ product.name }}</small>
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
    product: { default: () => ({ id: 0 }) },
    selected: {
      default: false
    }
  },

  data: () => ({
    //
  }),

  computed: {
    imageUrl() {
      if(!this.product.file_id) return 'img/noimage.jpeg';
      return `${process.env.VUE_APP_API_URL}/files/${this.product.file_id}`;
    }
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
