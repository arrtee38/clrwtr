import sqlite3 from "sqlite3";
let pools;
let response;

//establish connection to db
export default class PoolsDAO {
  static async injectDB() {
    pools = new sqlite3.Database('./pools.db', sqlite3.OPEN_READWRITE, (err) => {
	    if (err && err.code == "SQLITE_CANTOPEN") { 
		    console.log("Initializing... creating pools database")
		    //createDatabase();
	    } else if (err && err.code != "SQLITE_CANTOPEN") { 
		    console.log("Getting error " + err);
		      exit(1);
	    } else {
        //this.checkTables(pools);
        console.log("database successfully connected");
      }
    })
  }
						 
  static async getPools({filters = null, page = 0, poolsPerPage = 5, } = {}) {
    let query = "SELECT * FROM Pools WHERE ";
    if (filters) {
      if ("name" in filters) {
        query += "name = \"" + filters["name"] + "\";";
      } else if ("type" in filters) {
        query += "type = \"" + filters["type"] + "\";";
      } else if ("age" in filters) {
        query += "age = " + filters["age"] + ";";
      } else {
        query = "SELECT * FROM Pools;";
      }
    }

    return new Promise((resolve, reject) => {
      pools.all(query, [], (err, rows) => {
        if (err) {
          console.error(`Unable to issue find command`);
          reject({poolList: [], totalNumPools: 0}); 
        }
        else {
          console.log("query \"" + query + "\" successful.");
          resolve({poolsList: rows, totalNumPools: rows.length});
        }
      });
    });
  }

/*
function createDatabase() {
    var newdb = new sqlite3.Database("pools.db", (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
		console.log("pools.db created\n Setting up tables...");
        createTables(newdb);
    });
	return;
}


function createTables(newdb) {
	newdb.exec("CREATE TABLE Pools " +
		"(pool_id int primary key not null, " +
		"name text, " +
		"location text, " +
		"age int, " +
		"type text, " +
		"shape text, " +
		"volume int not null, " +
		"finish text);"
    );

    newdb.exec("INSERT INTO POOLS " +
		"(pool_id, name, age, type, volume) " +
        "VALUES (1, 'Lakeview', 25, 'Chlorine', 25000), " +
        "(2, 'Mandeville', 3, 'SWG', 17500);"
	);
	console.log("tables created!");
	return;
}

*/
  static async checkTables(db) {
  	db.all("SELECT * FROM Pools;", (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        rows.forEach( row => { console.log(row.pool_id, 
                      row.name, 
                      row.location, 
                      row.age, 
                      row.type, 
                      row.shape, 
                      row.volume, 
                      row.finish);
          });
      }
    });
  }

}