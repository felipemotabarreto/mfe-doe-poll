export const createGame = async (option) => {
  const gameMode = await prisma.gameMode.findFirst({ where: { name: option } });
  return prisma.game.create({
    data: { active: true, gameModeId: gameMode.id },
    include: { gameMode: true },
  });
};
