<template>
  <b-row class="mr-1">
    <b-col sm="9" style="padding-right:5px">
      <b-form-input
        v-model="fromLib"
        v-on:keyup.enter="$router.push('/search/' + fromLib)"
        aria-describedby="input-live-help input-live-feedback"
        :placeholder="placeholder"
        trim
        :size="size"
      ></b-form-input>
    </b-col>
    <b-col sm="3" style="padding-left:5px">
      <b-button variant="primary" :to="'/search/' + fromLib" :size="size">
        {{ buttonText }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["size", "buttonText", "placeholder"],
  components: {},
  data: () => ({
    fromLib: "",
  }),
};
</script>
