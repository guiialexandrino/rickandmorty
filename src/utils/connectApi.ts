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

export const QUERY_PAGES = `characters{
    info {
      count
      pages
    }
  }`;

export const QUERY_CHARACTERS = (id: Number) => {
  return `characters(page: ${id}){
          results {
            id
            name
            image
          }
        }`;
};

export const QUERY_CHARACTER = (id: String) => {
  return `
    character(id: ${id}) {
    id
    name
    image
    gender
    species
    status
    type
    location {
      dimension
      name
      type
    }
    origin {
      dimension
      name
      type
    }
    episode {
      episode
      name
    }
  }`;
};
