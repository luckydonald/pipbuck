import directive from './directive';
import component from './component.vue';

const VColorized = {
  install: (Vue) => {
    // registration
    Vue.directive('colorized-bg', directive);
    Vue.component('colorized', component);
  },
  directive,
  component,
};

export default VColorized;
