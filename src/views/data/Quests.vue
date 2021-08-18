<template>
  <div class="page">
    Sample text
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
  components: { },
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
