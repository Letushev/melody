const { getUserId } = require('../../utils');

async function createMelody(_, args, context) {
  const userId = getUserId(context);
  return await context.prisma.createMelody({
    name: args.name,
    by: args.by,
    createdBy: {
      connect: {
        id: userId,
      },
    },
  });
}

async function deleteMelody(_, args, context) {
  return await context.prisma.deleteMelody({ id: args.id });
}

module.exports = {
  createMelody,
  deleteMelody,
};
