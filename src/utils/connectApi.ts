interface callback {
  (myArgument: void): void;
}

export function connectApi(query: string, doSomething?: callback) {
  return fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      query {
        ${query}
      }`,
    }),
  }).then((res) => {
    if (doSomething) {
      doSomething();
    }
    return res.json();
  });
}
