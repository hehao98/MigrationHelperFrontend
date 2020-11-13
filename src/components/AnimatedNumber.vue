<template>
  <span class="big-number">{{ toString(displayNumber) }}</span>
</template>

<script>
export default {
  props: { number: { default: 0 } },
  data: () => ({
    displayNumber: 0,
    interval: false,
  }),
  mounted: function() {
    this.onNumberChange();
  },
  watch: {
    number: function() {
      this.onNumberChange();
    },
  },
  methods: {
    onNumberChange() {
      clearInterval(this.interval);

      if (this.number === this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(
        function() {
          if (this.displayNumber != this.number) {
            let change = (this.number - this.displayNumber) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
            this.displayNumber = this.displayNumber + change;
          }
        }.bind(this),
        20
      );
    },
    toString(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style scoped>
.big-number {
  font-size: xx-large;
}
</style>
