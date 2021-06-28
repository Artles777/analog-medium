<template>
  <b-pagination
    class="my-6"
    :total="total"
    :current="page"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :order="order"
    :size="size"
    :simple="isSimple"
    :rounded="isRounded"
    :per-page="perPage"
    :icon-prev="prevIcon"
    :icon-next="nextIcon"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="checkPage"
  />
</template>

<script>
export default {
  name: "PaginationPage",
  data() {
    return {
      perPage: 10,
      rangeBefore: 1,
      rangeAfter: 1,
      order: "is-centered",
      size: "",
      isSimple: false,
      isRounded: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
    };
  },

  props: {
    total: {
      type: Number,
      isRequired: true,
    },
    page: {
      type: Number,
      isRequired: true,
    },
  },

  methods: {
    checkPage(page) {
      this.$emit("checkPage", page);
    },
  },
};
</script>

<style scoped></style>
