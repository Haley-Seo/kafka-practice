import ip from 'ip';

import { Kafka, logLevel } from 'kafkajs';

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'example-consumer2',
})

const topic = 'producer-topic'
const consumer = kafka.consumer({ groupId: 'test-group2' });
await consumer.subscribe({ topic, fromBeginning: true });
await consumer.run({
  eachMessage: async ({ topic, partition, message, heartbeat }) => {
    console.log({
      key: message.key?.toString(),
      value: message.value.toString(),
      headers: message.headers,
  })
  },
})

// const run = async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic, fromBeginning: true })
//   await consumer.run({
//     // eachBatch: async ({ batch }) => {
//     //   console.log(batch)
//     // },
//     eachMessage: async ({ topic, partition, message }) => {
//       const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
//       console.log(`- ${prefix} ${message.key}#${message.value}`)
//     },
//   })
// }

// run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

// const errorTypes = ['unhandledRejection', 'uncaughtException']
// const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

// errorTypes.forEach(type => {
//   process.on(type, async e => {
//     try {
//       console.log(`process.on ${type}`)
//       console.error(e)
//       await consumer.disconnect()
//       process.exit(0)
//     } catch (_) {
//       process.exit(1)
//     }
//   })
// })

// signalTraps.forEach(type => {
//   process.once(type, async () => {
//     try {
//       await consumer.disconnect()
//     } finally {
//       process.kill(process.pid, type)
//     }
//   })
// })