<template>
  <div>
    <table class="table table-bordered">
      <tbody>
        <tr>
          <th>PRODUCTO</th>
          <th>CANT.</th>
          <th>P.U.</th>
        </tr>
        <tr v-for="(l, i) in selected" :key="i">
          <td>{{ l.name }}</td>
          <td>{{ l.quantity }}</td>
          <td class="text-right text-nowrap">
            {{ (l.quantity * l.price) | money }}
          </td>
        </tr>
        <tr>
          <th colspan="2">Total</th>
          <th class="text-right text-nowrap">{{ total | money }}</th>
        </tr>
      </tbody>
    </table>
    <div class="form-group">
      <label for="">Nombre*</label>
      <input type="text" name="" id="" class="form-control" v-model="name" />
      <app-form-errors :member="errors.name"></app-form-errors>
    </div>
    <div class="form-group">
      <label for="">Nro. celular*</label>
      <input
        type="number"
        class="form-control"
        v-model="phone"
        name=""
        id=""
        step="1"
      />
      <app-form-errors :member="errors.phone"></app-form-errors>
    </div>
    <div class="form-group">
      <label for="">Direccion*</label>
      <MapControl
        @clickPosition="clickPositionHandler"
        ref="elMap"
      ></MapControl>
      <app-form-errors :member="errors.lat"></app-form-errors>
      <div class="alert alert-info mt-2">
        Arrastra el mapa y selecciona la direccion de entrega
      </div>
    </div>
    <div class="form-group">
      <label for="">Nota</label>
      <app-textarea
        v-model="notes"
        placeholder="Agrega  detalles de tu direccion o tu pedido"
      ></app-textarea>
      <app-form-errors :member="errors.notes"></app-form-errors>
    </div>
    <app-button-submit :disabled="errors" @oneClick="save"></app-button-submit>

    <app-modal-basic ref="elModalDone" :dialogCentered="true">
      <div class="text-center">
        Solicitud Realizada

        <br />
        <i class="fa fa-check"></i>
        <br />

        Te llamaremos en un momento
      </div>
    </app-modal-basic>
  </div>
</template>

<script>
import MapControl from "./MapControl";
import validate from "validate.js";
import { DinnerService } from "./DinnerService";

const formRules = {
  name: {
    length: {
      minimum: 1,
      maximum: 150,
      tooShort: "Pon tu nombre",
      tooLong: "Muy largo"
    }
  },
  phone: {
    length: {
      minimum: 6,
      maximum: 10,
      tooShort: "Escribe un numero valido",
      tooLong: "Muy largo"
    },
    numericality: {
      notValid: "Escribe un numero valido"
    }
  },
  lat: {
    exclusion: {
      within: [0],
      message: "Selecciona tu direccion en el mapa"
    }
  },
  notes: {
    length: {
      maximum: 255,
      tooLong: "Muy largo"
    }
  }
};

export default {
  components: {
    MapControl
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    name: "",
    phone: "",
    selected: [],
    lat: 0,
    lng: 0,
    notes: ""
  }),

  computed: {
    total() {
      return this.selected
        .map(x => parseFloat(x.quantity) * parseFloat(x.price))
        .reduce((p, c) => p + c, 0);
    },
    errors() {
      let errors = validate(this.$data, formRules, {
        fullMessages: false
      });

      return errors || false;
    }
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    reset() {
      this.name = "";
      this.phone = "";
      this.lat = 0;
      this.notes = "";
      this.$refs.elMap.reset();
    },
    prepare(selectedProducts) {
      this.reset();
      this.selected = selectedProducts;
      setTimeout(() => {
        this.$refs.elMap.refresh();
      }, 100);
    },
    clickPositionHandler({ lat, lng }) {
      this.lat = lat;
      this.lng = lng;
    },
    save() {
      DinnerService.makeClientRequest(this.$data);
      this.$refs.elModalDone.show();
    }
  }
};
</script>

<style scoped></style>
