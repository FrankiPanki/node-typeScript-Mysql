import {Router, Request, Response} from 'express';
import Mysql from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req:Request,res:Response)=>{
    const query = `
        SELECT * 
        FROM heroes`;
        Mysql.ejecutarQuery(query,(err:any,heroes:Object[])=>{
            if (err) {
                res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                heroes: heroes
            })

        });
});


router.get('/heroes/:id', (req:Request,res:Response)=>{
    let id= req.params.id;
    const idEscapado= Mysql.instance.cnn.escape(id);
    const query = `
        SELECT * 
        FROM heroes
        WHERE id=${idEscapado}`;
        Mysql.ejecutarQuery(query,(err:any,heroe:Object[])=>{
            if (err) {
                res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                heroe: heroe[0]
            })

        });
});

 export default router;