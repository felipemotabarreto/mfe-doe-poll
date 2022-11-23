import { prisma } from "./db";

export const getPollResults = async () => {
  const results = await prisma.poll.findMany();
  const pollOptions = await prisma.pollOption.findMany();
  return results.reduce(
    (acc, result) => {
      return acc.map((pollResult) => {
        if (pollResult.id === result.pollOptionId) {
          return { ...pollResult, count: pollResult.count + 1 };
        }
        return pollResult;
      });
    },
    pollOptions.reduce((acc, result) => {
      if (!acc.find(({ id }) => id === result.id)) {
        return [...acc, { ...result, count: 0 }];
      }
      return acc;
    }, [])
  );
};

export const savePollEntry = async (pollOptionId, userId) => {
  if (!!(await prisma.poll.findFirst({ where: { userId } }))) {
    return prisma.poll.update({
      where: { userId },
      data: { pollOptionId, userId },
    });
  }
  return prisma.poll.create({ data: { pollOptionId, userId } });
};
