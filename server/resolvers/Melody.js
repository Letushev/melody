function createdBy(root, _, context) {
  return context.prisma.melody({ id: root.id }).createdBy();
}

module.exports = {
  createdBy,
};
