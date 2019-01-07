import { mapState } from 'vuex';

/** From vuex.esm.js */
function normalizeNamespace(fn) {
  // eslint-disable-next-line func-names
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      // eslint-disable-next-line no-param-reassign
      map = namespace;
      // eslint-disable-next-line no-param-reassign
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      // eslint-disable-next-line no-param-reassign
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

/** From vuex.esm.js */
function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }));
}

/** From vuex.esm.js, disabled getModuleByNamespace check. */
const betterMapGetters = normalizeNamespace((namespace, getters) => {
  const res = {};
  normalizeMap(getters).forEach((ref) => {
    const { key } = ref;
    let { val } = ref;

    val = namespace + val;
    res[key] = function mappedGetter() {
      /* Disabled: We don't wanna limit the namespace on just modules
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      */
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error((`[better-vuex-getter] unknown getter: ${val}`));
        return undefined;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

export {
  mapState,
  betterMapGetters,
};
export default {
  mapState,
  betterMapGetters,
};
