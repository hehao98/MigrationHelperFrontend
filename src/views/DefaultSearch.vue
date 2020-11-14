<template>
  <div>
    <b-row>
      <b-col sm="3" class="text-right my-auto"><b>Search migrations for a library: </b></b-col>
      <b-col sm="9">
        <library-search-input
          size="md"
          buttonText="Search"
          placeholder="Enter the Java library (groupId:artifactId) you want to replace here..."
        ></library-search-input>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LibrarySearchInput from "@/components/LibrarySearchInput.vue";
export default {
  components: { LibrarySearchInput },
};
</script>
