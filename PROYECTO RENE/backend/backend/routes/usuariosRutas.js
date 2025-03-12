import { Router } from "express";
import { register, login } from "../db/usuariosBD.js";
import { usuarioAutorizado, adminAutorizado } from "../middlewares/funcionesPassword.js";
const router = Router();

router.post("/registro", async(req,res)=>{
    console.log(req.body);
    const respuesta = await register(req.body);
    console.log(respuesta);
    res.cookie('token',respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.post("/ingresar", async(req,res)=>{
    const respuesta = await login(req.body.usuario);
    res.cookie('token',respuesta.token).status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/salir", async(req,res)=>{
    res.cookie('token','',{expires:new Date(0)}).clearCookie('token').status(200).json("Cerraste sesión correctamente");
});

router.get("/usuarios", async(req,res)=>{
    const respuesta = usuarioAutorizado(req.cookies.token, req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/administradores", async(req,res)=>{
    const respuesta = await adminAutorizado(req);
    res.status(respuesta.status).json(respuesta.mensajeUsuario);
});

router.get("/todos", async(req,res)=>{
    res.send("Estas en todos");
});

router.get("/buscarPorId/:id", async(req,res)=>{
    res.send("Estas en buscar por id");
});

export default router;