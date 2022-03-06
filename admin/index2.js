import ip from 'ip';

import { Kafka, logLevel } from 'kafkajs';

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'example-admin',
})

const admin = kafka.admin();

await admin.connect()

console.log('##LIST TOPICS');
const topicList = await admin.listTopics();
console.log(topicList)
await admin.fetchTopicOffsets(topic);
await admin.fetchTopicMetadata({ topics: [topic] })
await admin.describeGroups([ 'test-group' ])

// console.log('##CREATE TOPICS');
// await admin.createTopics({
//     timeout: 5000,
//     topics: [{topic:'topic-1'},{topic:'topic-2'}]
// })


await admin.disconnect()