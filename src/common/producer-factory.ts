import {
  Kafka,
  Message,
  Producer,
  ProducerBatch,
  TopicMessages,
  Partitioners,
  RetryOptions,
} from "kafkajs";

interface CustomMessageFormat {
  a: string;
}

export class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
      process.stdout.write(`Succeed to connect to Kafka server\n`);
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
    process.stdout.write(`Succeed to disconnect from Kafka server\n`);
  }

  public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: "Delivery-Topic",
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producer.sendBatch(batch);
    process.stdout.write(`Succeed to send messages to Kafka server\n`);
  }

  private createProducer(): Producer {
    const retryConfig: RetryOptions = {
      retries: 1,
    };
    const kafka = new Kafka({
      clientId: "expense-app",
      brokers: ["localhost:9093"],
      retry: retryConfig,
    });

    return kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
    });
  }
}
