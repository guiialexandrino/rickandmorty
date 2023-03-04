export function connectApi(query: string) {
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
  }).then((res) => res.json());
}
