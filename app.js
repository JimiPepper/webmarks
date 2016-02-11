/*
* @author : Lord Rose
*/

var fs = require('fs')

function cleanSQL(sql_statements) {
    return sql_statements.split(';').slice(0, -1);
}

function appendNewItemList(content) {
    var listItem = document.createElement('li');
    var link = document.createElement('a');
    
    link.setAttribute('href', content);
    link.appendChild(document.createTextNode(content));
    listItem.appendChild(link);

    document.querySelector("#latest_bookmarks").appendChild(listItem);
}

function initializeDB() {
    var database = openDatabase('webmarks', '0.1', 'WebMarks SQLite database', 2 * 1024 * 1024)
    
    fs.readFile('./resources/db.sql', 'utf8', function(error, data) {
        database.transaction(function(tr) {
            var sqlRequests = cleanSQL(data);

            for(index in sqlRequests) {
                alert(sqlRequests[index]);
                tr.executeSql(sqlRequests[index]);    
            }

            // tr.executeSql(data);
        });
    });

    return database;
}

function initializeEvent(database) {
    var button_newTuple = document.querySelector("#add_bm");
    var button_newTag = document.querySelector("#add_tag");
    var button_emptyDb = document.querySelector("#empty_db");

    button_newTuple.addEventListener('click', function() {
        database.transaction(function(tr) {
            tr.executeSql('INSERT INTO Bookmarks (url) VALUES (?)',
                [
                    document.querySelector("#new_bm").value
                ]);
        });
    });

    button_newTag.addEventListener('click', function() {
        database.transaction(function(tr) {
            tr.executeSql('INSERT INTO Tags (name) VALUES (?)',
                [
                    document.querySelector("#new_tag").value
                ]);
        });
    });

    button_emptyDb.addEventListener('click', function() {
        database.transaction(function(tr) {
            tr.executeSql('DROP TABLE Bookmarks');
            //tr.executeSql('DROP TABLE Tags');
        });
    });
}

function loadGUI(database) {
    database.transaction(function(tr) {
        tr.executeSql('SELECT * FROM Bookmarks', [], function(tr, results) {
            var len = results.rows.length, i;
            for (i = 0 ; i < len ; i++) {
                appendNewItemList(results.rows.item(i).url);
            }    
        });
    });
}

window.onload = function() {
    var database = initializeDB();
    initializeEvent(database);
    loadGUI(database);
};
