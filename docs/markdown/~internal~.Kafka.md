# Class: Kafka

[~internal~](../wiki/~internal~).Kafka

## Table of contents

### Constructors

- [constructor](../wiki/~internal~.Kafka#constructor)

### Methods

- [send](../wiki/~internal~.Kafka#send)
- [subscribe](../wiki/~internal~.Kafka#subscribe)

## Constructors

### constructor

• **new Kafka**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.kafkaHost` | `string` |
| `config.origin` | `string` |
| `config.ssl` | `Object` |
| `config.ssl.ca` | `string`[] |
| `config.ssl.cert` | `string` |
| `config.ssl.key` | `string` |
| `config.ssl.rejectUnauthorized` | `boolean` |

#### Defined in

global.d.ts:29

## Methods

### send

▸ **send**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`KafkaPostMessage`](../wiki/~internal~.KafkaPostMessage)<`unknown`\> |

#### Returns

`void`

#### Defined in

global.d.ts:46

___

### subscribe

▸ **subscribe**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Object` |
| `config.callback` | (`message`: [`KafkaMessage`](../wiki/~internal~.KafkaMessage)<`unknown`\>) => `void` |
| `config.groupId` | `string` |
| `config.topic` | `string` |

#### Returns

`void`

#### Defined in

global.d.ts:40
