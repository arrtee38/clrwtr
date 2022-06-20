import sqlite3 from "sqlite3";
let pools;
let response;

//establish connection to db
export default class PoolsDAO {
  static async injectDB() {
    pools = new sqlite3.Database('./pools.db', sqlite3.OPEN_READWRITE, (err) => {
	    if (err) {
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
}