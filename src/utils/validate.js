const STATE_TYPE = {
  pending: ['object'],
  finished: ['object'],
};

const VALUE_TYPE = {
  id: 'string',
  value: 'string',
};

export const isValidate = state => {
  if (!state || !Object.entries(state).length) {
    throw new Error('state자체에서 에러 발생');
  }

  for (const key in state) {
    const value = state[key];
    if (!STATE_TYPE[key]) {
      throw new Error(`${key}에서 에러 발생`);
    }

    if (!STATE_TYPE[key].includes(typeof value)) {
      throw new Error(`${JSON.stringify(value)}에서 에러 발생`);
    }

    for (const index in value) {
      const objectContent = value[index];
      for (const objKey in objectContent) {
        const objValue = objectContent[objKey];
        if (!VALUE_TYPE[objKey]) {
          throw new Error(`${objKey}에서 에러 발생`);
        }

        if (!VALUE_TYPE[objKey].includes(typeof objValue)) {
          throw new Error(`${JSON.stringify(objValue)}에서 에러 발생`);
        }
      }
    }
  }

  return true;
};
