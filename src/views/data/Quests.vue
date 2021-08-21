<template>
  <div class="page">
    Client: [{ this.client.getCalendarInformation() }]
    <scrollbar
      class="scroll-wrapper"
      content-class=""
      scrollbar-class="scroll"
      :items="itemSelection"
      @equip="$emit('equip', $event)"
      @unequip="$emit('unequip', $event)"
      :selected="activeId"
      @select="$emit('select', $event)"
    >
      <template slot-scope="item">

        <a class="item">
          {{ item.name }}
          <span v-if="item.amount > 1"> ({{item.amount}})</span>
        </a>
      </template>
    </scrollbar>
  </div>
</template>

<script>
import { SimpleCalDAV } from 'simple-caldav';
import Scrollbar from '../../components/context/Scrollbar.vue';
import base64 from '../../base64';


export default {
  name: 'Quests',
  components: { Scrollbar },
  props: {
    calendarUrl: {
      default: null,
      type: String,
    },
    username: {
      default: null,
      type: String,
    },
    password: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    client() {
      if (!this.calendarUrl || !this.username || !this.password) {
        return null;
      }
      const headers = new Headers();
      const basicAuth = base64.encode(`${this.username}:${this.password}`);
      headers.append('Authorization', `Basic ${basicAuth}`);
      // TODo:
      return new SimpleCalDAV(this.calendarUrl, { credentials: 'include', mode: 'cors', headers });
    },
  },
};
</script>
<style scoped lang="scss">
.page {
  padding-left: 5vmin;
  padding-right: 3vmin;
  padding-bottom: 2vmin;
}
</style>
