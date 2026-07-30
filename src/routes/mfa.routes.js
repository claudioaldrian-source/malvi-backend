import { Router } from "express";
import mfaController from "../controllers/mfa.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Generar QR y secreto
router.post("/setup", authMiddleware, mfaController.setup);

// Verificar el código de 6 dígitos
router.post("/verify", authMiddleware, mfaController.verify);

// Desactivar MFA
router.post("/disable", authMiddleware, mfaController.disable);

export default router;