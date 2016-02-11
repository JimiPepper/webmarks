CREATE TABLE IF NOT EXISTS Bookmarks 
(
    url TEXT NOT NULL,
    name TEXT
    description TEXT,
    added_date TEXT,
    PRIMARY KEY(url) -- INTEGER PRIMARY KEY should be used without AUTOINCREMENT statement according to SQLite documentation
);

CREATE TABLE IF NOT EXISTS Tags
(
    name TEXT NOT NULL,
    PRIMARY KEY(name)
);
