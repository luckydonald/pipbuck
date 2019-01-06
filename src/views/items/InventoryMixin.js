export default {
  computed: {
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    activeItem() {
      return this.items.filter(piece => piece.baseId === this.activeId)[0];
    },
  },
};
