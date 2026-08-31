String.prototype.interpolate = function (data) {
  return this.replace(/{{(.*?)}}/g, (match, expression) => {
    const key = expression.trim();
    const path = key.split(".");
    const value = path.reduce((acc, seg) => acc?.[seg], data);
    return value !== undefined ? value : match;
  });
};
