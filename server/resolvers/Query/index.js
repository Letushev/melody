const { getUserId } = require('../../utils.js');

async function user(_, _, context) {
  const id = getUserId(context);
  return await context.prisma.user({ id });
}

module.exports = {
  user,
};
