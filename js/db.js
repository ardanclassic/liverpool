const dbPromised = idb.open("Liverpool-DB", 2, (liverpoolDB) => {
    switch (liverpoolDB.oldVersion) {
        case 0:
            const playerStore = liverpoolDB.createObjectStore('players', {keyPath: 'id'});
            playerStore.createIndex('name', 'name');
        case 1:
            const leagueStore = liverpoolDB.createObjectStore('league', {keyPath: 'id'});
            leagueStore.createIndex('name', 'name');
    }
});


/** ------------------------- BOOKMARK PLAYER ------------------------- */

export function bookmarkPlayer(player) {
    dbPromised.then(db => {
        const tx = db.transaction("players", "readwrite");
        const store = tx.objectStore("players");
        store.put(player);

        return tx.complete;
    })
    .then(() => console.log(`Add ${player.name} to Favorite List`));
}

export function getAllBookmarkPlayer() {
    return new Promise(async (resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("players", "readonly");
            const store = tx.objectStore("players");
            return store.getAll();
        })
        .then((players) => resolve(players));
    });
}

export function getBookmarkPlayerById(id) {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("players", "readonly");
            const store = tx.objectStore("players");
            
            return store.get(id);
        })
        .then((player) => resolve(player));
    });
}

export function deleteBookmarkPlayer(player) {
    dbPromised
    .then((db) => {
        var tx = db.transaction('players', 'readwrite');
        var store = tx.objectStore('players');
        store.delete(player.id);

        return tx.complete;
    }).then(() => console.log(`Remove ${player.name} from Favorite List`));
}


/** ------------------------- BOOKMARK LEAGUE ------------------------- */

export function bookmarkLeague(league) {
    dbPromised.then(db => {
        const tx = db.transaction("league", "readwrite");
        const store = tx.objectStore("league");
        store.put(league);

        return tx.complete;
    })
    .then(() => console.log(`Add ${league.competition.name} to Favorite List`));
}

export function getAllBookmarkLeague() {
    return new Promise(async (resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("league", "readonly");
            const store = tx.objectStore("league");
            return store.getAll();
        })
        .then((league) => resolve(league));
    });
}

export function getBookmarkLeagueById(id) {
    return new Promise(async (resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("league", "readonly");
            const store = tx.objectStore("league");
            
            return store.get(id);
        })
        .then((league) => resolve(league));
    });
}

export function deleteBookmarkLeague(league) {
    dbPromised
    .then((db) => {
        var tx = db.transaction('league', 'readwrite');
        var store = tx.objectStore('league');
        store.delete(league.id);

        return tx.complete;
    }).then(() => console.log(`Remove ${league.name} from Favorite List`));
}