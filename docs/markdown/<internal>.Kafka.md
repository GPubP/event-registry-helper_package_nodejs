# Class: Kafka

[<internal>](../wiki/%3Cinternal%3E).Kafka

## Table of contents

### Constructors

- [constructor](../wiki/%3Cinternal%3E.Kafka#constructor)

### Methods

- [send](../wiki/%3Cinternal%3E.Kafka#send)
- [subscribe](../wiki/%3Cinternal%3E.Kafka#subscribe)

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
| `message` | [`KafkaPostMessage`](../wiki/%3Cinternal%3E.KafkaPostMessage)<`unknown`\> |

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
| `config.callback` | (`message`: [`KafkaMessage`](../wiki/%3Cinternal%3E.KafkaMessage)<`unknown`\>) => `void` |
| `config.groupId` | `string` |
| `config.topic` | `string` |

#### Returns

`void`

#### Defined in

global.d.ts:40
