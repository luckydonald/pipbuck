import directive from './directive';
import component from './component.vue';

const VColorized = {
  install: (Vue) => {
    // registration
    Vue.directive(directive.name, directive);
    Vue.component(component.name, component);
  },
  directive,
  component,
};

export default VColorized;
