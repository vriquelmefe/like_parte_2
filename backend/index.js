const { agregarPost, obtenerPost, eliminarPosts, like } = require('./consulta');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO puerto..."));

app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPost();
        console.log('POST', posts)
        res.json(posts)
    } 
    catch (error) {
      console.log('error', error)
        res.status(500).send("Error al obtener los posts: " + error.message);}}
);
app.post("/posts", async (req,res)=>{
  const {titulo,url,descripcion,like} = req.body
  await agregarPost(titulo,url,descripcion,like)
  res.send("Viaje agregado con exito")
});

app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  console.log('id index likes', id)
    try {
        await like(id)
        res.send("Like actualizado con éxito");
    } catch (error) {
        console.error("Error al actualizar likes", error.message);
        res.status(500).send("Error al actualizar likes");
    }
});

app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await eliminarPosts(id)
        res.send("Post eliminado con éxito");
    } catch (error) {
        console.error("Error al eliminar post", error.message);
        res.status(500).send("Error al eliminar post");
    }
});