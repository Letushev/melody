function melodies(root, _, context) {
  return context.prisma.user({ id: root.id }).melodies();
}

module.exports = {
  melodies,
};
