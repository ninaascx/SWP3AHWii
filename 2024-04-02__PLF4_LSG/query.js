const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Eine Abfrage, welche die Watchlist-Namen zu einem gegebenen Benutzer liefert.
async function getWatchlistNamesForUser(userId) {
    try {
        const user = await prisma.benutzer.findUnique({
            where: {
                id: userId,
            },
            include: {
                watchLists: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!user) throw new Error('Benutzer nicht gefunden');
        user.watchLists.map((watchlist) => console.log(watchlist.name));
    } catch (error) {
        console.log(error.message);
    }
}

// Eine Abfrage, welche die Musikstücke aus einer Watchlist ausgibt.
async function getTracksFromWatchlist(watchlistId) {
    try {
        const watchlist = await prisma.watchlist.findUnique({
            select: {tracks: true},
            where: {
                id: watchlistId,
            },
        });
        if (!watchlist) throw new Error('Watchlist nicht gefunden');
        for( track in watchlist.tracks) {
            console.log(track);
        }
    } catch (error) {
        console.log(error.message);
    }
}

getWatchlistNamesForUser(1);
getTracksFromWatchlist(2);