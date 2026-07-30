import User from "../models/user.model.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

class MfaService {

     // Generar el secreto y el QR
  async setup(userId) {

  // Buscar el usuario
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (user.mfaEnabled) {
  throw new Error("El MFA ya está activado para este usuario");
}

  // Generar un secreto único para este usuario
  const secret = speakeasy.generateSecret({
    name: `Portal Malvinas (${user.email})`,
    issuer: "Portal Malvinas",
  });

  // Guardar el secreto en la base de datos
  user.mfaSecret = secret.base32;
  await user.save();

  // Generar el código QR
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  // Devolver la información al frontend
  return {
    qrCode,
    manualCode: secret.base32,
    enabled: user.mfaEnabled,
  };
}


  async verify(userId, token) {
  // Verificar el código de 6 dígitos
}

async disable(userId) {
  // Desactivar MFA
}

}

export default new MfaService();