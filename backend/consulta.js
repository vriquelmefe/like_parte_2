const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'likeme',
    port: 5433,
    allowExitOnIdle: true
});

const agregarPost = async (titulo, img, descripcion, likes=1) => {
    try {
        const consulta = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
        const values = [titulo, img, descripcion, likes];
        await pool.query(consulta, values);
        console.log("Post agregado con éxito");    } 
    catch (error) {
        console.error("Error al agregar el post:", error.message);
        throw new Error("No se pudo agregar el post.");}
};

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");
        return rows;
    } 
    catch (error) {
        console.error("Error al obtener los posts:", error.message);
        throw new Error("No se pudieron obtener los posts.");
    }
};

const like = async (id) => {
    console.log('id like ', id)
    try{
        const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
        const values = [id];
        const result = await pool.query(consulta, values);
        console.log("Like agregado", result);
    }
    catch(error){
        console.error("Error al agregar like", error.message);
    }
}

const eliminarPosts = async (id) => {
    try{
        const consulta = "DELETE FROM posts WHERE id = $1";
        const values = [id];
        const result = await pool.query(consulta, values);
        console.log(" eliminado el Post");}
    catch(error){
        console.error("Error al eliminar post", error.message);
    }
 
}


module.exports = { agregarPost, obtenerPost, like, eliminarPosts };