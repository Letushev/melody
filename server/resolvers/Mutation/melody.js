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
    public: false,
  });
}

async function deleteMelody(_, args, context) {
  return await context.prisma.deleteMelody({ id: args.id });
}

async function updateMelody(_, args, context) {
  const { id, name, by, public, level } = args;
  return await context.prisma.updateMelody({
    data: {
      ...name && { name },
      ...by && { by },
      ...public && { public },
      ...level && { level },
    },
    where: {
      id,
    },
  });
}

async function editMelodyTabs(_, args, context) {
  return await context.prisma.updateMelody({
    data: {
      tabs: args.tabs,
    },
    where: {
      id: args.id,
    },
  });
}

module.exports = {
  createMelody,
  deleteMelody,
  updateMelody,
  editMelodyTabs,
};
