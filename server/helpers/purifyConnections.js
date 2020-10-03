// remove double connections, keep one way from > 
export default (formattedFriends) => {

    return formattedFriends
        // get all friends' from connections
        .reduce((acc, friend) => [
            ...acc,
            ...friend.connections.from
        ], [])
        // remove ones that go both ways
        .reduce((acc, conn) => {
            const {
                source: sourceId,
                target: targetId
            } = conn

            // connection exists both ways, so keep only 1 of them
            if (acc.find((conn) => conn.source === targetId && conn.target === sourceId)) {
                return acc
            }

            // conn is unique/one way so keep as is
            return [...acc, conn]
        }, [])
}