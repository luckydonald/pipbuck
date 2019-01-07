export default {
  computed: {
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    activeItem() {
      const result = this.items.filter(piece => piece.id === this.activeId)[0];
      if (result === undefined) {
        return this.emptyItem;
      }
      return result;
    },
  },
};
