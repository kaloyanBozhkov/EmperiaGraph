const formatFriends = (friends, connections) =>
    friends.map((friend) => ({
        ...friend,
        label: `${friend.firstName} ${friend.lastName}`,
        connections: {
            to: connections.filter((connection) => connection.target === friend.id),
            from: connections.filter((connection) => connection.source === friend.id)
        }
    }))

module.exports = formatFriends