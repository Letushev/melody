const { getUserId } = require('../../utils.js');

async function user(_, _, context) {
  const id = getUserId(context);
  return await context.prisma.user({ id });
}

async function getMelody(_, args, context) {
  return await context.prisma.melody({ id: args.id });
}

async function getMelodies(_, args, context) {
  const where = {
    public: true,
  };

  if (args.text) {
    where.OR = [
      {
        name_contains: args.text
      },
      {
        by_contains: args.text
      }
    ];
  }

  const count = await context.prisma
    .melodiesConnection({ where })
    .aggregate()
    .count()

  const melodies = await context.prisma.melodies({
    where,
    skip: args.skip,
    first: args.first,
  });

  return {
    melodies,
    count,
  }
}

module.exports = {
  user,
  getMelody,
  getMelodies,
};
