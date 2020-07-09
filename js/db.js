const dbPromised = idb.open("Liverpool-DB", 5, (liverpoolDB) => {
    switch (liverpoolDB.oldVersion) {
        case 0:
            const playerStore = liverpoolDB.createObjectStore('players', {keyPath: 'id'});
            playerStore.createIndex('name', 'name');
        case 1:
            const leagueStore = liverpoolDB.createObjectStore('league', {keyPath: 'id'});
            leagueStore.createIndex('name', 'name');
        case 2:
            liverpoolDB.createObjectStore('Liverpool', {keyPath: 'id'});
        case 3:
            liverpoolDB.createObjectStore('OffLeague', {keyPath: 'id'});
        case 4:
            liverpoolDB.createObjectStore('OffPlayer', {keyPath: 'id'});
    }
});


/** ------------------------- OFFLINE MODE ------------------------- */

function saveLiverpoolData(team) {
    dbPromised.then(db => {
        const tx = db.transaction("Liverpool", "readwrite");
        const store = tx.objectStore("Liverpool");
        store.put(team);
        return tx.complete;
    })
}

function getLiverpoolData(id) {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("Liverpool", "readonly");
            const store = tx.objectStore("Liverpool");
            return store.get(id);
        })
        .then((data) => resolve(data));
    });
}

function saveLeagueByID(league) {
    dbPromised.then(db => {
        const tx = db.transaction("OffLeague", "readwrite");
        const store = tx.objectStore("OffLeague");
        store.put(league);
        return tx.complete;
    })
}

function getLeagueByID(id) {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("OffLeague", "readonly");
            const store = tx.objectStore("OffLeague");
            return store.get(id);
        })
        .then((data) => resolve(data));
    });
}

function savePlayerByID(player) {
    dbPromised.then(db => {
        const tx = db.transaction("OffPlayer", "readwrite");
        const store = tx.objectStore("OffPlayer");
        store.put(player);
        return tx.complete;
    })
}

function getPlayerByID(id) {
    return new Promise((resolve, reject) => {
        dbPromised
        .then((db) => {
            const tx = db.transaction("OffPlayer", "readonly");
            const store = tx.objectStore("OffPlayer");
            return store.get(id);
        })
        .then((data) => resolve(data));
    });
}



/** ------------------------- BOOKMARK PLAYER ------------------------- */

function bookmarkPlayer(player) {
    dbPromised.then(db => {
        const tx = db.transaction("players", "readwrite");
        const store = tx.objectStore("players");
        store.put(player);

        return tx.complete;
    })
    .then(() => console.log(`Add ${player.name} to Favorite List`));
}

function getAllBookmarkPlayer() {
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

function getBookmarkPlayerById(id) {
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

function deleteBookmarkPlayer(player) {
    dbPromised
    .then((db) => {
        var tx = db.transaction('players', 'readwrite');
        var store = tx.objectStore('players');
        store.delete(player.id);

        return tx.complete;
    }).then(() => console.log(`Remove ${player.name} from Favorite List`));
}


/** ------------------------- BOOKMARK LEAGUE ------------------------- */

function bookmarkLeague(league) {
    dbPromised.then(db => {
        const tx = db.transaction("league", "readwrite");
        const store = tx.objectStore("league");
        store.put(league);

        return tx.complete;
    })
    .then(() => console.log(`Add ${league.competition.name} to Favorite List`));
}

function getAllBookmarkLeague() {
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

function getBookmarkLeagueById(id) {
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

function deleteBookmarkLeague(league) {
    dbPromised
    .then((db) => {
        var tx = db.transaction('league', 'readwrite');
        var store = tx.objectStore('league');
        store.delete(league.id);

        return tx.complete;
    }).then(() => console.log(`Remove ${league.name} from Favorite List`));
}