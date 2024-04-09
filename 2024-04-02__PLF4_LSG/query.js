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
        return user.watchLists.map(watchlist => watchlist.name);
    } catch (error) {
        throw new Error(`Fehler beim Abrufen der Watchlist-Namen: ${error.message}`);
    }
}

// Eine Abfrage, welche die Musikstücke aus einer Watchlist ausgibt.
async function getTracksFromWatchlist(watchlistId) {
    try {
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                id: watchlistId,
            },
            include: {
                tracks: true,
            },
        });
        if (!watchlist) throw new Error('Watchlist nicht gefunden');
        return watchlist.tracks;
    } catch (error) {
        throw new Error(`Fehler beim Abrufen der Musikstücke: ${error.message}`);
    }
}

module.exports = {
    getWatchlistNamesForUser,
    getTracksFromWatchlist,
};
