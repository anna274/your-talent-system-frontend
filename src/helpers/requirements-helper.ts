import { IRequirement } from 'declarations/interfaces';

const compare = (a: IRequirement, b: IRequirement) => {
  const aPrior = a.priority.value;
  const bPrior = b.priority.value;
  if (aPrior > bPrior) {
    return -1;
  }
  if (aPrior < bPrior) {
    return 1;
  }
  return 0;
};

export const sortRequirementsByPriority = (requirements: IRequirement[]) =>
  requirements.sort(compare);
