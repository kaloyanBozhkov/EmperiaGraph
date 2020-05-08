function findVertexById(id) {
  const filterResult = this.filter((vertex) => vertex.id === id)

  return filterResult.length ? filterResult[0] : null
}

const formatEdges = (edges, vertices) =>
  edges.map((edge) => {
    const totalEmperiaMembers = vertices.length
    const sourceVertex = findVertexById.call(vertices, edge.source)

    // if source not found, edge is invalid?!  Is data not always gonna be neat?
    if (!sourceVertex) {
      console.log('edge is not linked to a valid source', edge)
      return edge
    }

    const targetVertex = findVertexById.call(vertices, edge.target)

    if (!targetVertex) {
      console.log('edge is not linked to a valid target', edge)
      return edge
    }

    const weight = Math.sqrt(
      (totalEmperiaMembers * 100) / sourceVertex.totalFacebookFriends
    ).toFixed(2)

    return {
      ...edge,
      weight,
      label: `${sourceVertex.label} -> ${targetVertex.label}`,
    }
  })
export default formatEdges
