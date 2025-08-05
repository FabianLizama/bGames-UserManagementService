const express = require('express');
const player_config = express.Router();
const mysqlConnection = require('../database');
import { testEnvironmentVariable } from '../settings';

/**
 * @swagger
 * tags:
 *   name: Player
 *   description: Endpoints de gestión de jugadores
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Mensaje de entorno de prueba
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: Mensaje retornado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
player_config.get("/", (req,res) =>{
    res.status(200).json({ message: testEnvironmentVariable})


});

/*
Input: Nothing
Output: List of all the players of Blended Games
Description: Simple MYSQL query
*/
/**
 * @swagger
 * /players/:
 *   get:
 *     summary: Lista todos los jugadores de Blended Games
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
player_config.get('/players/',(req,res)=>{
    var aux = undefined;
    mysqlConnection.query('SELECT*FROM playerss',(err,rows,fields)=>{
        try{
            aux = JSON.parse(JSON.stringify(rows))[0]
        }catch{
            res.json("Error in parse Json, please retry");
        }
        if (undefined == aux){
            res.json("Error on obtain resume");
        }else{
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
        }
    })
})

/**
 * @swagger
 * /players/id:
 *   get:
 *     summary: Obtiene todos los IDs de los jugadores
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: Lista de IDs de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_players:
 *                     type: integer
 */
player_config.get('/players/id',(req,res)=>{
    var aux = undefined;
    mysqlConnection.query('SELECT id_players FROM playerss',(err,rows,fields)=>{
        try{
            aux = JSON.parse(JSON.stringify(rows))[0]
        }catch{
            res.json("Error in parse Json, please retry");
        }
        if (undefined == aux){
            res.json("Error on obtain resume");
        }else{
            if(!err){
                res.json(rows);
            } else {
                console.log(err);
            }
        }
    })
})

/**
 * @swagger
 * /player_by_email/{email}:
 *   get:
 *     summary: Obtiene la información de un jugador por email
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del jugador
 *     responses:
 *       200:
 *         description: Información del jugador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
player_config.get('/player_by_email/:email',(req,res)=>{
    var email = req.params.email;
    var select = 'SELECT * '
    var from = 'FROM `playerss` '
    var where = 'WHERE `playerss`.`email` = ? '

    var query = select+from+where
    mysqlConnection.getConnection(function(err, connection) {
        if (err){
            res.status(400).json({message:'No se pudo obtener una conexion para realizar la consulta en la base de datos, consulte nuevamente', error: err})
            throw err;
        }
        connection.query(query,[email], function(err,rows,fields){
            if (!err){
                let id = rows[0]
                console.log(rows);
                res.status(200).json(id)
            } else {
                console.log(err);
                res.status(400).json({message:'No se pudo consultar a la base de datos', error: err})
            }
            connection.release();

        });
    })
})
/*
Input: Id of a player (range 0 to positive int)
Output: Name, pass and age of that player
Description: Simple MYSQL query
*/
/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Obtiene la información de un jugador por ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Información del jugador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
player_config.get('/players/:id', (req,res) =>{
    const {id} = req.params;
    console.log("entro en el GET");
    var aux = undefined;
    mysqlConnection.query('SELECT*FROM playerss WHERE id_players = ?',[id],(err,rows,fields) =>{
        try{
            aux = JSON.parse(JSON.stringify(rows))[0]
        }catch{
            res.json("Error in parse Json, please retry");
        }
        if (undefined == aux){
            res.json("Error on GET player information.");
        }else{
            if(!err){
                console.log("Entro a Configuración");
                res.json(rows); 
            } else {
                console.log(err);
            }
        }
    })
})
/*
Input: Id of a player (range 0 to positive int)
Output: Void (authentication of the player in the system)
Description: Simple MYSQL query
*/
/**
 * @swagger
 * /player/{name}/{pass}:
 *   get:
 *     summary: Autentica a un jugador por nombre y contraseña
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del jugador
 *       - in: path
 *         name: pass
 *         schema:
 *           type: string
 *         required: true
 *         description: Contraseña del jugador
 *     responses:
 *       200:
 *         description: ID del jugador autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *       400:
 *         description: Error en la autenticación
 */
player_config.get('/player/:name/:pass', (req,res) =>{
    var aux = undefined;
    const name = req.params.name
    const pass = req.params.pass
    console.log(name+","+pass);
    mysqlConnection.query('SELECT* FROM playerss WHERE name = ? AND password = ?',[name, pass],(err,rows,fields) =>{
        try{
            aux = JSON.parse(JSON.stringify(rows))[0]
        }catch{
            res.json("Error in parse Json, please retry");
        }
        if (undefined == aux){
            res.status(400).json("Error on GET player information.");
        }else{
            if(!err){
                console.log("Entro a Configuración");
                res.json(rows[0].id_players);
            } else {
                res.status(404).json("Player doesnt exist or incorrect password");
                console.log(err);
            }
        }
    })
    
})


// OPCIONES DE CONFIGURACION
/**
 * @swagger
 * /player:
 *   post:
 *     summary: Crea un jugador con información externa
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               external_type:
 *                 type: string
 *               external_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jugador creado
 *       400:
 *         description: Error de conexión a la base de datos
 */
player_config.post('/player',(req,res)=>{
    let {name,email,password,external_type,external_id} = req.body;
    console.log(req.body);
    var insertInto = 'INSERT INTO `playerss` '
    var columnValues = '(`name`,`email`,`password`, `external_type`, `external_id`) '
    if(password === undefined){
        password = ''
    }
    var newValues = 'VALUES (?,?,?,?,?)'
    var query = insertInto+columnValues+newValues
    mysqlConnection.getConnection(function(err, connection) {
        if (err){
            res.status(400).json({message:'No se pudo obtener una conexion para realizar la consulta en la base de datos, consulte nuevamente', error: err})
            throw err
        } 
        connection.query(query,[name,email,password,external_type,external_id], function(err,rows,fields){
            if (!err){
                console.log(rows);
                res.status(200).json(rows)
            } else {
                console.log(err);
                res.status(400).json({message:'No se pudo consultar a la base de datos', error: err})
            }
            connection.release();

        });
    })
   
})

/**
 * @swagger
 * /create_desktop_key/{id_player}:
 *   post:
 *     summary: Agrega/actualiza el desktop_key de un jugador
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id_player
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clave actualizada
 *       400:
 *         description: Error de conexión a la base de datos
 */
player_config.post('/create_desktop_key/:id_player',(req,res)=>{
    var key = req.body.key
    var id_player = req.params.id_player
    console.log(key, id_player)
    var update = 'UPDATE `playerss`'
    var set = ' SET `desktop_key` = ? '
    var where = ' WHERE `playerss`.`id_players` = ?'

    var query = update+set+where
    mysqlConnection.getConnection(function(err, connection) {
        if (err){
            res.status(400).json({message:'No se pudo obtener una conexion para realizar la consulta en la base de datos, consulte nuevamente', error: err})
            throw err
        } 
        connection.query(query,[key, id_player], function(err,rows,fields){
            if (!err){
                console.log(rows);
                const data = {
                    "key": key
                }
                res.status(200).json(data)
            } else {
                console.log(err);
                res.status(400).json({message:'No se pudo consultar a la base de datos', error: err})
            }
            connection.release();

        });
      })

   
})

// add or eddit player, hay que probarlo!!!!! parece que esta malo un Not o un True del 1er if
/*
Input: Name, pass and age of that player
Output: Void (Creates a new player with the input information)
Description: Simple MYSQL query
*/
/**
 * @swagger
 * /players/:
 *   post:
 *     summary: Crea un nuevo jugador (o edita si existe)
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pass:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Jugador creado o editado
 *       400:
 *         description: Error al guardar jugador
 */
player_config.post('/players/',(req,res)=>{
    const {name,pass,age} = req.body;
    console.log(req.body);
    const id = 0;
    const query = `
        SET @id = ?;
        SET @name = ?;
        SET @pass = ?;
        SET @age = ?;
        CALL playerAddOrEdit(@id,@name,@pass,@age);
    `;
    // Mirar este select!!!
    mysqlConnection.query('SELECT*FROM playerss WHERE id_players = ?',[id],(err,rows,fields)=>{
        console.log("El selec entrega: "+!err);
        if(!err){
            if(!!rows){
                mysqlConnection.query(query,[id,name,pass,age],(err,rows,fields) =>{
                    if(!err){
                        res.json({Status:'Player Saved'});
                    } else {
                        console.log(err);
                    }
                })
            }
        } else {
            console.log(err);
            res.json({Status:'ERROR: Player Saved'});
        }
    })
})

/*
Input: Name, pass and age of that player
Output: Void (Edits an existing player in the db)
Description: Simple MYSQL query
*/
//Con id en 0 se ingresa un nuevo jugador, con cualquier otro id se edita el existente
/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Edita un jugador existente
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               pass:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Jugador editado
 *       400:
 *         description: Error al editar jugador
 */
player_config.put('/players/:id',(req,res)=>{
    console.log("entro en el PUT");
    const {name,pass,age} = req.body;
    const {id} = req.params;
    //console.log("El selec entrega: "+JSON.parse(JSON.stringify(req.body))[0]);
    const query = `
            SET @id = ?;
            SET @name = ?;
            SET @pass = ?;
            SET @age = ?;
            CALL playerAddOrEdit(@id,@name,@pass,@age);
    `;
    mysqlConnection.query('SELECT*FROM playerss WHERE id_players = ?',[id],(err,rows,fields)=>{
        console.log("El selec entrega: "+rows);try{
            aux = JSON.parse(JSON.stringify(rows))[0]
        }catch{
            res.json("Error in parse Json, please retry");
        }
        if (undefined != aux){
            mysqlConnection.query(query,[id,name,pass,age],(err,rows,fields) =>{
                if(!err){
                    res.json({Status:'Player Update'});
                    console.log("Lo logró");
                } else {
                    res.json({Status:'ERROR: Player Update'});
                    console.log(err);
                }
            })
        }else{
            res.json({Status:'ERROR: Player not exists'});
        }
    })

})
/*
Input: Id of a player (range 0 to positive int)
Output: Void (Deletes the player of the database)
Description: Simple MYSQL query
*/
/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Elimina un jugador por ID
 *     tags: [Player]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado
 */
player_config.delete('/players/:id',(req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM playerss WHERE id_players =?',[id],(err,rows,fields)=>{
        if(!err){
            res.json({Status:`Player ${id} Deleted`});
        } else {
            console.log(err);
        }
    })
})

export default player_config;