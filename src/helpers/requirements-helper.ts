import { IRequirement, ISkill } from 'declarations/interfaces';

interface IRequirementMatch {
  requirement: IRequirement;
  skill: ISkill;
  notIncluded?: boolean;
}

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

const compareMatch = (a: IRequirementMatch, b: IRequirementMatch) => {
  const aPrior = a.requirement.priority.value;
  const bPrior = b.requirement.priority.value;
  if (aPrior > bPrior) {
    return -1;
  }
  if (aPrior < bPrior) {
    return 1;
  }
  if (a.notIncluded && !b.notIncluded) {
    return 1;
  }
  if (!a.notIncluded && b.notIncluded) {
    return -1;
  }
  return 0;
};

export const sortRequirementsMatchesByPriority = (requirements: IRequirementMatch[]) =>
  requirements.sort(compareMatch);
