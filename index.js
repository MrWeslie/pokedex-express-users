
/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Added in for cookies and user/ pw authentication
const sha256 = require('js-sha256');
const cookieParser = require('cookie-parser');

// Initialise postgres client
const config = {
  user: 'weslie',
  host: '127.0.0.1',
  database: 'pokemons1',
  port: 5432,
};

if (config.user === 'ck') {
  throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      //console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/home', {pokemon: result.rows} );
    }
  });
}

const userNewForm = (request, response) => {
  response.render('users/new');
}  

const userRegister = (request, response) => {
  const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *';
  let hashedPassword = sha256(request.body.password);
  const values = [request.body.name, hashedPassword];
  pool.query(queryString, values, (err, result) => {
    if (err) 
    {
      console.error('Query error:', err.stack);
    } else 
    {
      console.log('Query usercreate:', result.rows);
      //set cookies 
      response.cookie('userId', result.rows[0].id);        
      // redirect to home page
      response.redirect('/');
    }
  });
}

// Test cookies
const TestCookies = (request, response) => {
  //response.send('Visits: ' + request.cookies.visits + ', User Id: ' + request.cookies.userId);
  response.send(request.cookies);
};

// Create Form, user login
const userLogInForm = (request, response) => {
  response.render('users/login');
};

const userLogIn = (request, response) => {
  //let id = request.body.name;
  //console.log(id);
  const queryString = 'SELECT * FROM users WHERE name = ($1) AND password = ($2)';
  const values = [request.body.name, sha256(request.body.password)];
  pool.query(queryString, values, (err, result) => {
    if (err) 
    {
      console.log('Query error:', err.stack);
    } else 
    {
      console.log('Query result', result.rows);
      console.log('Query result password', result.rows[0].password);
      console.log('Query result password hashed', sha256(request.body.password));
      if (result.rows[0].password === sha256(request.body.password))
      {
        response.cookie('userId', result.rows[0].id);
        //response.redirect('/users/' + result.rows[0].id);
        response.redirect('/');
      } else 
      {        
        response.redirect('/login');
      }
    }
  })
}

// Create Logout page
const userLogout = (request, response) => {
  response.clearCookie('userId');
  response.redirect('/');
};

// const userLogIn = (request, response) => {
//   const queryString = `SELECT * from users WHERE name = '${request.body.name}'`;
//   pool.query(queryString, (err, result) => {
//     if (err) 
//     {
//       console.error('Query error:', err.stack);
//       response.send('Query Error');
//     } else 
//     {
//       const password = sha256(request.body.password);
//       const userId = result.rows[0].id;
//       if (password === result.rows[0].password) 
//       {
//         response.cookie('userId', userId);
//       }
//        response.redirect(`/users/${userId}`);
//     }
//   });
// };

const getNew = (request, response) => {
  response.render('pokemon/new');
}

// const getPokemon = (request, response) => {
//   let id = request.params['id'];
//   const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
//   pool.query(queryString, (err, result) => {
//     if (err) {
//       console.error('Query error:', err.stack);
//     } else {
//       console.log('Query result:', result);

//       // redirect to home page
//       response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
//     }
//   });
// }

// const postPokemon = (request, response) => {
//   let params = request.body;
  
//   const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2);';
//   const values = [params.name, params.height];

//   pool.query(queryString, values, (err, result) => {
//     if (err) {
//       console.log('query error:', err.stack);
//     } else {
//       console.log('query result:', result);

//       // redirect to home page
//       response.redirect('/');
//     }
//   });
// };

// const editPokemonForm = (request, response) => {
//   let id = request.params['id'];
//   const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
//   pool.query(queryString, (err, result) => {
//     if (err) {
//       console.error('Query error:', err.stack);
//     } else {
//       console.log('Query result:', result);

//       // redirect to home page
//       response.render( 'pokemon/edit', {pokemon: result.rows[0]} );
//     }
//   });
// }

// const updatePokemon = (request, response) => {
//   let id = request.params['id'];
//   let pokemon = request.body;
//   const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
//   const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
//   console.log(queryString);
//   pool.query(queryString, values, (err, result) => {
//     if (err) {
//       console.error('Query error:', err.stack);
//     } else {
//       console.log('Query result:', result);

//       // redirect to home page
//       response.redirect('/');
//     }
//   });
// }

// const deletePokemonForm = (request, response) => {
//   response.send("COMPLETE ME");
// }

// const deletePokemon = (request, response) => {
//   response.send("COMPLETE ME");
// }
/**
 * ===================================
 * User
 * ===================================
 */

const getUserId = (request, response) => {
    response.render('users/catch');
}

const idCreateUserPokemon = (request, response) => {
     const queryString = 'INSERT INTO users_pokemons (user_id, pokemon_id) VALUES ($1, $2)';
     const values = [request.body.user_id, request.body.pokemon_id];
     pool.query(queryString, values, (err, result) => {
     if (err) 
     {
      console.error('Query error:', err.stack);
    } else 
    {
      console.log('Query result:', result);
       // redirect to home page
      //response.redirect('/');
       //response.redirect('/pokemon/' + request.body.pokemon_id + '/users/' + request.body.user_id);
       response.redirect('/users/' + request.body.user_id);
    }
  });
}

const showPokemonListCatch = (request, response) => {
    let id = request.params.id;
    console.log(id);
    const queryString = 'SELECT users_pokemons.user_id, pokemon.name FROM pokemon INNER JOIN users_pokemons ON (users_pokemons.pokemon_id = pokemon.id) WHERE users_pokemons.user_id =' + id;
    console.log(queryString);
       pool.query(queryString, (err, result) => {
        if (err) 
        {
            console.error('Query error:', err.stack);
        } else 
        {
            // redirect to home page
            response.render('users/show', {pokemon: result.rows});
            //response.redirect('/');
        }
      })
    }

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);

// app.get('/pokemon/:id/edit', editPokemonForm);
// app.get('/pokemon/new', getNew);
// app.get('/pokemon/:id', getPokemon);
// app.get('/pokemon/:id/delete', deletePokemonForm);

// app.post('/pokemon', postPokemon);

// app.put('/pokemon/:id', updatePokemon);

// app.delete('/pokemon/:id', deletePokemon);

app.get('/users/new', userNewForm);
app.post('/users', userRegister);
app.get('/cookies', TestCookies);
app.get('/logout', userLogout);
app.get('/login', userLogInForm);
app.post('/login', userLogIn);

app.get('/users/catch', getUserId);
app.post('/users', idCreateUserPokemon);
app.get('/users/:id', showPokemonListCatch);
//app.get('/pokemon/:id/users/:id', showPokemonListCatch);






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
// function shutDown() {
//   console.log('Recalling all ships to harbour...');
//   server.close(() => {
//     console.log('... all ships returned...');
//     pool.end(() => {
//       console.log('... all loot turned in!');
//       process.exit(0);
//     });
//   });
// };

// process.on('SIGTERM', shutDown);
// process.on('SIGINT', shutDown);


