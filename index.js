
const express = require('express');
const req = require('express/lib/request');
const path = require('path');
const PORT = process.env.PORT || 5432; 
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express().use(express.static(path.join(__dirname, 'public'))).use(express.json()).use(express.urlencoded({ extended: true})).set('views', path.join(__dirname, 'views')).set('view engine', 'ejs').get('/', async(req, res) => {
  
  try {
    const client = await pool.connect();
gi
    const tasks = await client.query(
      `SELECT * FROM tasks ORDER BY id ASC`
    );

    const locals = {
      'tasks': (tasks) ? tasks.rows : null
    };
    res.render('pages/index', locals);
    client.release();

    
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
})
.get('/db-info', async(req,res) => {
  try {
    const client = await pool.connect();
    const tables = await client.query(
      `SELECT c.relname AS table, a.attname AS column, t.typname AS type
      FROM pg_catalog.pg_class as c
      LEFT JOIN pg_catalog.pg_attribute as a
      ON c.oid = a.attrelid AND a.attnum > 0
      LEFT JOIN pg_catalog.pg_type as t
      on a.atttypid = t.oid
      WHERE c.relname in ('users', 'observations', 'students', 'schools', 'tasks')
      ORDER BY c.relname, a.attnum;`
    );

    const locals = {
      'tables': (tables) ? tables.rows : null
    };

    res.render('pages/db-info', locals);
    client.release();
    
  } catch (error) {
    console.error(error);
    res.send( error)
  }
})

.listen(PORT, () => console.log(`listening on ${ PORT }`))

