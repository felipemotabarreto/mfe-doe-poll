import { prisma } from "./db";

export const createGame = async (option) => {
  const gameMode = await prisma.gameMode.findFirst({ where: { name: option } });
  const firstChallenge = await prisma.gameChallenge.findFirst({
    where: { gameModeId: gameMode.id },
  });

  return prisma.game.create({
    data: {
      active: true,
      gameModeId: gameMode.id,
      currentChallengeId: firstChallenge.id,
    },
    include: { gameMode: true },
  });
};
