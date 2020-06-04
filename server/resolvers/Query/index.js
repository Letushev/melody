const { getUserId } = require('../../utils.js');

async function user(_, _, context) {
  const id = getUserId(context);
  return await context.prisma.user({ id });
}

async function getMelody(_, args, context) {
  return await context.prisma.melody({ id: args.id });
}

async function getMelodies(_, args, context) {
  return await context.prisma.melodies({
    where: {
      public: true,
    },
  });
}

async function searchMelodies(_, args, context) {
  return await context.prisma.melodies({
    where: {
      OR: [
        {
          name_contains: args.text
        },
        {
          by_contains: args.text
        }
      ]
    }
  });
}

module.exports = {
  user,
  getMelody,
  getMelodies,
  searchMelodies,
};
