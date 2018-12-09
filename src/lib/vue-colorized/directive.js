import commAon from './common';

export default {
  inserted(el, binding, vnode) {                     // eslint-disable-line no-unused-vars
    // eslint-disable-next-line no-param-reassign
    el.colorized = {
      img: common.createImage(),
    };
    this.update(el, binding, vnode, null);
  },
  update(el, binding, vnode, oldVnode) {             // eslint-disable-line no-unused-vars
    // Implementing the following:
    // ```js
    // watch: {
    //   src() { this.loadImage(); },
    //   hue() { this.applyImage(); },
    //   preScale() { this.applyImage(); },
    // },
    // ```
    //
    // With using the HTML `v-colorized-bg.full-scale:background-image="hue"`
    // our `binding` will look like:
    // ```json
    //  {
    //    name: "colorized-bg",  // name of the directive. `v-colorized-bg`
    //    value: 123, // New hue. `v-colorized-bg="hue"`
    //    value: { hue: 123, src: "https://..." }, // New hue/src. `v-colorized-bg="{ hue: hue, src: 'https://...' }"`
    //    oldValue: { hue, src }, // old hue/src.
    //    expression: "...", // raw code string of value. `v-colorized-bg="..."`
    //    arg: "background", // behind the colon. `v-colorized-bg:background`
    //    modifiers: { full-scale: true }, // Only present if present. `v-colorized-bg.full-scale`
    //  }

    // See https://vuejs.org/v2/guide/custom-directive.html#Directive-Hook-Arguments

    if (binding.oldValue === binding.value) {
      // hue doesn't need to update
      return;
    }
    const options = {
      hue: binding.value.hue,
      src: binding.value.src,
      fullScale: binding.modifier.fullScale || false,
      cssAttribute: binding.arg || (
        typeof binding.value === 'object' && typeof binding.value.cssAttribute !== 'undefined'
          ? binding.value.cssAttribute
          // eslint-disable-next-line no-shadow, no-unused-vars
          : (image, options) => 'background'
      ),
      cssTemplate: (
        typeof binding.value === 'object' && typeof binding.value.cssTemplate === 'function'
          ? binding.value.cssTemplate
          // eslint-disable-next-line no-shadow, no-unused-vars
          : (image, options) => `${image} no-repeat`
      ),
      img: el.colorized.img,
      target: el,
    };
    common.updateImage(options.img, options.src, common.createCallback(this.applyImage, options));
  },
  // eslint-disable-line no-param-reassign
  applyImage(options) {
    console.log('applying img.');
    const { width, height } = common.calculateScale(options.preScale, options.target, options.img);
    const computedSrc = common.calculateImage(options.img, width, height, options.hue);
    if (!computedSrc) {
      return; // we couldn't calculate anything, as the image was not yet loaded.
    }
    const attribute = (
      typeof options.cssAttribute === 'string'
        ? options.cssAttribute
        : options.cssAttribute(computedSrc, options)
    );
    // eslint-disable-next-line no-param-reassign
    options.target.style[attribute] = options.cssTemplate(computedSrc, options);
  },
};
