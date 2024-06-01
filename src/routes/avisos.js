var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar", function (req, res) {
    avisoController.listar(req, res);
});

router.post("/publicar", function (req, res) {
    avisoController.publicar(req, res);
    console.log("res avisos", res);
    console.log("req avisos", req);
});

router.put("/editar/:idComentario", function (req, res) {
    avisoController.editar(req, res);
});

router.delete("/deletar/:idComentario", function (req, res) {
    avisoController.deletar(req, res);
});

module.exports = router;