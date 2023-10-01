import { ProducerFactory } from "./producer-factory";

export class ProduceMessageSender {
  producerFactory!: ProducerFactory;
  constructor() {
    this.producerFactory = new ProducerFactory();
  }
  /**
   * @description Get application information.
   * @returns AppInformation
   */
  sendMessage = async (): Promise<string> => {
    await this.producerFactory.start();
    await this.producerFactory.sendBatch([{ a: "Hello KafkaJS user!" }]);
    await this.producerFactory.shutdown();
    return "Hello my friend";
  };
}
