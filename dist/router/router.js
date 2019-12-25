"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
        SELECT * 
        FROM heroes`;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
router.get('/heroes/:id', (req, res) => {
    let id = req.params.id;
    const idEscapado = mysql_1.default.instance.cnn.escape(id);
    const query = `
        SELECT * 
        FROM heroes
        WHERE id=${idEscapado}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            heroe: heroe[0]
        });
    });
});
exports.default = router;
