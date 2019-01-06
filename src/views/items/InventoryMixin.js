export default {
  computed: {
    /**
     * @return {{type: string, name: string, ammunition: string}}
     */
    activeItem() {
      console.log('activeItem', this);
      console.log('activeItem', this.activeId, this.items);
      const result = this.items.filter(piece => piece.id === this.activeId)[0];
      if (result === undefined) {
        return null;
      }
      return result;
    },
  },
};
