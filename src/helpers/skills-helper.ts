import { ISkill } from 'declarations/interfaces';

const compare = (a: ISkill, b: ISkill) => {
  const aPrior = a.level.value;
  const bPrior = b.level.value;
  if (aPrior > bPrior) {
    return -1;
  }
  if (aPrior < bPrior) {
    return 1;
  }
  return 0;
};

export const sortSkillsByLevels = (requirements: ISkill[]) => requirements.sort(compare);

export const getMainSkills = (skills: ISkill[]) => {
  const sorted = sortSkillsByLevels(skills);
  if (sorted.length < 3) {
    return sorted.slice(sorted.length - 1);
  }
  return sorted.slice(2);
};
