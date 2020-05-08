// returns obj with prop equal to vertex id and value to array of the ids of vertices it is connected to
const setConnections = (vertices, edges) =>
  vertices.reduce(
    (acc, vertex) => ({
      ...acc,
      [vertex.id]: [
        // edges that have that vertex as target
        ...edges.filter((edge) => edge.target === vertex.id).map(({ source }) => +source),
        // edges that have that vertex as source
        ...edges.filter((edge) => edge.source === vertex.id).map(({ target }) => +target),
      ],
    }),
    {}
  )

export default setConnections
