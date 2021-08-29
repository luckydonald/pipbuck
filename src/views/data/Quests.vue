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
      :items="events"
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
      console.debug('calculating client...');
      if (!this.url || !this.username || !this.password) {
        console.debug('client is none.');
        return null;
      }
      console.debug('client is calc.');
      const basicAuthInput = `${this.username}:${this.password}`;
      console.debug('basic auth soon:', basicAuthInput);
      const basicAuth = base64.encode(basicAuthInput);
      console.debug('got the basic auth.');
      const headers = {
        Authorization: `Basic ${basicAuth}`,
      };
      console.debug('client it is...');
      return new BetterSimpleCalDAV(this.url, { credentials: 'include', mode: 'cors', headers });
    },
    events() {
      if (!this.client) {
        return [];
      }
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return this.client.listEventsSince(
        /* startDate */ oneWeekAgo,
      );
    },
  },
};
</script>

<style lang="scss">
  input[type='text'], input[type='password'] {
    border-bottom: 0.75vmin solid var(--color-front);
    color: var(--color-front);
    background: transparent;
    margin-bottom: 0.75vmin;
    margin-top: -0.75vmin;

    &::placeholder {
      color: var(--color-front);
      text-align: center;
      opacity: 0.4;
    }
  }
</style>

<style scoped lang="scss">
.page {
  padding-left: 5vmin;
  padding-right: 3vmin;
  padding-bottom: 2vmin;
}
</style>
