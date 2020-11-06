<template>
  <div :id="'library-search-input' + _uid">
    <b-row class="mr-1" ref="inputRow">
      <b-col sm="9" style="padding-right:5px">
        <b-form-input
          :id="'popover-target-' + _uid"
          v-model="fromLib"
          v-on:keyup.enter="$router.push('/search/' + fromLib)"
          aria-describedby="input-live-help input-live-feedback"
          :placeholder="placeholder"
          :state="state"
          trim
          :size="size"
          debounce="500"
          @focus="showTips = true"
          @blur="showTips = false"
        ></b-form-input>
      </b-col>
      <b-col sm="3" style="padding-left:5px">
        <b-button variant="primary" :to="'/search/' + fromLib" :size="size">
          {{ buttonText }}
        </b-button>
      </b-col>
    </b-row>
    <b-popover
      :target="'popover-target-' + _uid"
      placement="bottom"
      :show.sync="showTips"
      custom-class="mw-100"
      :container="'library-search-input' + _uid"
      :style="popoverStyles"
    >
      <div v-if="loading">Checking your input library, hang a while!</div>
      <b-overlay :show="loading" rounded="sm"> 
        <div v-if="suggested.length > 0 && suggested[0] !== fromLib">
          <code>{{ fromLib }}</code> not found in our database. Did you mean:
          <span v-for="(lib, index) in suggested" :key="lib">
            <code><b-link :to="'/search/' + lib">{{ lib }}</b-link></code>
            <span v-if="index === suggested.length - 1">?</span>
            <span v-if="index !== suggested.length - 1">, </span>
            <br v-if="index % 5 === 0"/>
          </span>
        </div>
        <div v-if="suggested.length > 0 && suggested[0] === fromLib">
          We have some suggested migrations for <code>{{ fromLib }}</code
          >, press Enter!
        </div>
        <div v-if="suggested.length === 0 && fromLib !== '' && !loading">
          Sorry, no library suggstions found for your input QAQ.
        </div>
        <div v-if="suggested.length === 0 && fromLib === '' || loading">
          Type some Java library in <code>groupId:artifactId</code> format! (e.g.
          <code>org.json:json</code>)
        </div>
      </b-overlay>
    </b-popover>
  </div>
</template>

<script>
import Vue from "vue";
import { getLibrarySimilarAsync } from "@/rest.js";

export default {
  props: ["size", "buttonText", "placeholder"],
  components: {},
  data: () => ({
    fromLib: "",
    state: null,
    showTips: false,
    loading: false,
    suggested: [],
    popoverStyles: {},
  }),
  mounted: function() {
    Vue.set(this.popoverStyles, "width", this.$refs.inputRow.clientWidth);
  },
  watch: {
    fromLib: function(newVal) {
      if (newVal === "") return;
      this.loading = true;
      this.state = null;
      getLibrarySimilarAsync(newVal).then((list) => {
        this.suggested = list;
        this.loading = false;
        if (this.suggested[0] === this.fromLib) {
          this.state = true;
        } else {
          this.state = false;
        }
      });
    },
  },
};
</script>
