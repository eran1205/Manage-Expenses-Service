import { OK } from "http-status/lib";
import { ProduceMessageService } from "./services";
import { apiResponse } from "@/helpers/apiResponse";

export class ProduceMessageController {
  /**
   * @description Gets the API information.
   * @param {Req} req
   * @param {Res} res
   */
  static getAppInfo = async (req: Req, res: Res, next: NextFn) => {
    try {
      process.stdout.write(`⏱ req Object: ${req}\n`);

      const homeServices = new ProduceMessageService();
      const result = await homeServices.getAppInfo();

      res.status(OK).json(apiResponse(result));
    } catch (error) {
      next(error);
    }
  };
}
