<template>
  <div class="page">
    <ul class="statuses">
      <li v-for="(effect, status) in statuses" :key="status" class="status">
        <div class="label">{{ status }}</div>
        <div class="value">{{ effect }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Effects',
  data() {
    return {
      statuses: {
        'Med-X Withdrawl': 'INT -1, AGL -1',
        'Minor Rad-Poision.': 'END -1',
        'Psycho Withdrawl': 'PER -1, END -1',
      },
    };
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.statuses {
    padding-bottom: 15vmin;
}
.status {
  margin-left: 20vmin;
  left: 0;
  right: 0;

  border-bottom-width: 0.75vmin;
  border-bottom-style: solid;
  padding: 0.5vmin;

  display: flex;
  justify-content: space-between;

  &:last-child {
    border: none;
  }

  > .label,
  > .value {
    display: inline;
    width: 50%;
    text-align: left;
  }
}
</style>
