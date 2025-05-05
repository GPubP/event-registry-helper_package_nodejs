[**@wcm/event-registry-helper**](../../README.md)

***

[@wcm/event-registry-helper](../../globals.md) / [~internal~](../README.md) / Kafka

# Class: Kafka

Defined in: global.d.ts:28

## Constructors

### Constructor

> **new Kafka**(`config`): `Kafka`

Defined in: global.d.ts:29

#### Parameters

##### config

###### kafkaHost

`string`

###### origin

`string`

###### ssl

\{ `ca`: `string`[]; `cert`: `string`; `key`: `string`; `rejectUnauthorized`: `boolean`; \}

###### ssl.ca

`string`[]

###### ssl.cert

`string`

###### ssl.key

`string`

###### ssl.rejectUnauthorized

`boolean`

#### Returns

`Kafka`

## Methods

### send()

> **send**(`message`): `void`

Defined in: global.d.ts:46

#### Parameters

##### message

`KafkaPostMessage`

#### Returns

`void`

***

### subscribe()

> **subscribe**(`config`): `void`

Defined in: global.d.ts:40

#### Parameters

##### config

###### callback

(`message`) => `void`

###### groupId

`string`

###### topic

`string`

#### Returns

`void`
