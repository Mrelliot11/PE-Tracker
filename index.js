
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

    client.release();
    res.send("Works");
    
  } catch (err) {
    console.error(err);
    res.send("Error" + err);
  }
})
.get('/db-info', async(req,res) => {
  try {
    const client = await pool.connect();
    const tables = await client.query(
      `SELECT * FROM tasks ORDER BY id ASC`);

    const locals = {
      'tasks': (tasks) ? tasks.rows : null
    };

    res.render('pages/index', locals);
    client.release();
    
  } catch (error) {
    console.error(error);
    res.send( error)
  }
})

.listen(PORT, () => console.log(`listening on ${ PORT }`))

