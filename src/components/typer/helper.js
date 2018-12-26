// https://stackoverflow.com/a/42956086/3423324#how-to-reference-text-thats-in-slot-in-vue-js
export const getChildrenTextContent = function getChildrenTextContent(children) {
  // eslint-disable-next-line arrow-body-style
  return children.map((node) => {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text;
  }).join('').trim();
};

export default {};
