const { getUserId } = require('../../utils.js');

async function user(_, _, context) {
  const id = getUserId(context);
  return await context.prisma.user({ id });
}

async function getMelody(_, args, context) {
  return await context.prisma.melody({ id: args.id });
}

module.exports = {
  user,
  getMelody,
};
