import mfaService from "../services/mfa.service.js";
import { successResponse } from "../helpers/response.helper.js";

class MfaController {
  async setup(req, res, next) {
    try {
      const result = await mfaService.setup(req.user.userId);

      return successResponse(
  res,
  result,
  "Operación realizada correctamente",
);
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    try {
      const { token } = req.body;

      const result = await mfaService.verify(req.user.userId, token, );

      return successResponse(
  res,
  result,
  "Operación realizada correctamente",
);
    } catch (error) {
      next(error);
    }
  }

  async disable(req, res, next) {
    try {
      const result = await mfaService.disable(req.user.userId);

      return successResponse(
  res,
  result,
  "Operación realizada correctamente",
);
    } catch (error) {
      next(error);
    }
  }
}

export default new MfaController();