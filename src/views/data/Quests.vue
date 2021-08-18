<template>
  <div class="page">
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
import { CalendarClient } from 'caldav-client-typescript/src/calendar-client';
import Scrollbar from '../../components/context/Scrollbar';

const startDate = new Date();
const calendarUrl = 'https://owncloud10.ocloud.de/remote.php/dav/calendars/admin/personal/';
const username = 'admin';
const password = 'demo123';

const calendarClient = new CalendarClient(calendarUrl, username, password);

export default {
  name: 'Quests',
  // eslint-disable-next-line vue/no-unused-components
  components: { Scrollbar },
  data() {
    return {
    };
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
