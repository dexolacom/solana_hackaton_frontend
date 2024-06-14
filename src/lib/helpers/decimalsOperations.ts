import Decimal from 'decimal.js';

export enum OperationType {
  MUL,
  DIV
}

type Arg = string | number;

export const decimalsOperations = (firstArg: Arg, secondArg: Arg, operation: OperationType) => {
  if (!firstArg || !secondArg || isNaN(Number(firstArg)) || isNaN(Number(secondArg))) {
    return 0;
  }
  let result: number;
  const decFirstArg = new Decimal(firstArg);
  const decSecondArg = new Decimal(secondArg);

  if (operation === OperationType.MUL) {
    result = decFirstArg.mul(decSecondArg).toNumber();
    return result;
  }

  if (operation === OperationType.DIV) {
    result = decFirstArg.div(decSecondArg).toNumber();
    return result;
  }
  return 0;
};
