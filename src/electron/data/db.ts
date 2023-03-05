/*import BetterSqlite3 from 'better-sqlite3';


const db: BetterSqlite3.Database = new BetterSqlite3('timeSqlDb.db');

function dbTest(){
    const querry: string = 'SELECT * FROM test';
    const statement = db.prepare(querry);
    console.log(statement);
    return statement.all();
}*/


function ok(): string{
    return "Ok";
}


export {ok};