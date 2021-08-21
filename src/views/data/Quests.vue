<template>
  <div class="page">
    Client: [{{ this.client.getCalendarInformation() }}]
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
import Scrollbar from '../../components/context/Scrollbar';
import { CalendarClient } from 'simple-caldav-client';

const startDate = new Date();
const calendarUrl = 'https://owncloud10.ocloud.de/remote.php/dav/calendars/admin/personal/';
const username = 'admin';
const password = 'demo123';



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
      return new CalendarClient(this.calendarUrl, username, password);
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
