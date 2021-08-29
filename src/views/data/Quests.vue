<template>
  <div class="page">
    <table>
      <!-- URL -->
      <tr>
        <td>URL:</td>
        <td><input type="text" v-model="url" placeholder="URL" id="url" /><br></td>
      </tr>
      <!-- User -->
      <tr>
        <td>User:</td>
        <td><input type="text" v-model="username" placeholder="User" id="username" /><br></td>
      </tr>
      <!-- Password -->
      <tr>
        <td>Password:</td>
        <!-- eslint-disable-next-line max-len -->
        <td><input type="password" v-model="password" placeholder="Password" id="password" /><br></td>
      </tr>
      <!-- Debug -->
      <tr>
        <td>Client:</td>
        <td>[{{ "" + this.client }}]<br></td>
      </tr>
    </table>
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
import BetterSimpleCalDAV from '../../caldav';
import Scrollbar from '../../components/context/Scrollbar.vue';
import base64 from '../../base64';


export default {
  name: 'Quests',
  components: { Scrollbar },
  props: {
    // url: {
    //   default: null,
    //   type: String,
    // },
    // username: {
    //   default: null,
    //   type: String,
    // },
    // password: {
    //   default: null,
    //   type: String,
    // },
  },
  data() {
    return {
      url: '',
      username: '',
      password: '',
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
      return new BetterSimpleCalDAV(this.calendarUrl, { credentials: 'include', mode: 'cors', headers });
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
