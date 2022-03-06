import ip from 'ip';

import { Kafka, logLevel } from 'kafkajs';

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: 'example-producer',
})

const topic = 'topic-3'
const producer = kafka.producer()


await producer.connect()
// await producer.send({
//     topic: 'topic',
//     messages: [
//         { key: 'key1', value: 'hello world', partition: 0 },
//         { key: 'key2', value: 'hey hey!', partition: 1 }
//     ],
// })

function queueRandomMessage() {
  const category = getRandomAnimal();
  const noise = getRandomNoise(category);
  const event = { key:category, value:noise };
  return event;
}

function getRandomAnimal() {
  const categories = ['CAT', 'DOG'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(animal) {
  if (animal === 'CAT') {
    const noises = ['meow', 'purr'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else if (animal === 'DOG') {
    const noises = ['bark', 'woof'];
    return noises[Math.floor(Math.random() * noises.length)];
  } else {
    return 'silence..';
  }
}

setInterval(() => {
  producer.send({
    topic,
    messages: [
      queueRandomMessage(),queueRandomMessage()
    ],
});
}, 3000);

// const getRandomNumber = () => Math.round(Math.random(10) * 1000)
// const createMessage = num => ({
//   key: `key-${num}`,
//   value: `value-${num}-${new Date().toISOString()}`,
// })

// const sendMessage = async () => {
//   return producer
//     .send({
//       topic,
//       compression: CompressionTypes.GZIP,
//       messages: Array(getRandomNumber())
//         .fill()
//         .map(_ => createMessage(getRandomNumber())),
//     })
//     .then(console.log)
//     .catch(e => console.error(`[example/producer] ${e.message}`, e))
// }

// const run = async () => {
//   await producer.connect()
//   setInterval(sendMessage, 3000)
// }

// run().catch(e => console.error(`[example/producer] ${e.message}`, e))

// const errorTypes = ['unhandledRejection', 'uncaughtException']
// const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

// errorTypes.forEach(type => {
//   process.on(type, async () => {
//     try {
//       console.log(`process.on ${type}`)
//       await producer.disconnect()
//       process.exit(0)
//     } catch (_) {
//       process.exit(1)
//     }
//   })
// })

// signalTraps.forEach(type => {
//   process.once(type, async () => {
//     try {
//       await producer.disconnect()
//     } finally {
//       process.kill(process.pid, type)
//     }
//   })
// })