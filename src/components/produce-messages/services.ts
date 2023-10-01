import { ProduceMessageSender } from "../../common/produce-message-sender";

export class ProduceMessageService {
  produceMessageSender!: ProduceMessageSender;
  constructor() {
    this.produceMessageSender = new ProduceMessageSender();
  }

  getAppInfo = async (): Promise<String> => {
    const result = await this.produceMessageSender.sendMessage();
    return result;
  };
}
