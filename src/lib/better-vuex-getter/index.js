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

/**
 * Wraps vuex.esm.js's mapState, accepting a tuple value with a formatting func.
 * @param namespace {string}
 * @param states {Dictionary<string|function|[string, function]>}
 * @return {Dictionary<function>}
 * @example
 * { localInt: ['stateNumber', Math.floor] }
 */
const betterMapState = normalizeNamespace((namespace, states) => {
  console.log('betterMapState 0', states);
  Object.keys(states).forEach((key) => {
    const val = states[key];
    console.log('betterMapState i', key, val);
    // eslint-disable-next-line no-param-reassign
    states[key] = !Array.isArray(val) ? val : function stateInner(state) {
      console.log('betterMapState x', key, val[1], val[0]);
      return val[1].call(this, state[val[0]]);
    };
  });
  console.log('betterMapState 1', states);
  return mapState(namespace, states);
});

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
  betterMapState, mapState,
  betterMapGetters,
};
export default {
  betterMapState,
  mapState,
  betterMapGetters,
};
