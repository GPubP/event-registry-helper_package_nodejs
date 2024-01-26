# Class: EventRegistryHelper

## Table of contents

### Constructors

- [constructor](../wiki/EventRegistryHelper#constructor)

### Methods

- [getEvents](../wiki/EventRegistryHelper#getevents)
- [getModuleEvents](../wiki/EventRegistryHelper#getmoduleevents)
- [registerEvent](../wiki/EventRegistryHelper#registerevent)
- [registerEvents](../wiki/EventRegistryHelper#registerevents)
- [sendMessage](../wiki/EventRegistryHelper#sendmessage)
- [unregisterEvent](../wiki/EventRegistryHelper#unregisterevent)

## Constructors

### constructor

• **new EventRegistryHelper**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `gatewayBaseUrl` | `string` |
| › `kafkaConfig` | [`IKafkaConfig`](../wiki/~internal~.IKafkaConfig) |
| › `tenantsConfig` | `TenantsConfig` |

#### Defined in

index.ts:17

## Methods

### getEvents

▸ **getEvents**(`tenantKey`, `searchParams?`): `Promise`<[`PaginatedEvents`](../wiki/~internal~.PaginatedEvents)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantKey` | `string` |
| `searchParams?` | `Object` |
| `searchParams.category?` | ``"public"`` \| ``"internal"`` |
| `searchParams.event?` | `string` |
| `searchParams.moduleId?` | `string` |
| `searchParams.source?` | `string` |
| `searchParams.version?` | `string` |

#### Returns

`Promise`<[`PaginatedEvents`](../wiki/~internal~.PaginatedEvents)\>

#### Defined in

index.ts:137

___

### getModuleEvents

▸ **getModuleEvents**(`tenantKey`, `searchParams?`): `Promise`<[`PaginatedEvents`](../wiki/~internal~.PaginatedEvents)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantKey` | `string` |
| `searchParams?` | `Object` |
| `searchParams.event?` | `string` |
| `searchParams.source?` | `string` |
| `searchParams.version?` | `string` |

#### Returns

`Promise`<[`PaginatedEvents`](../wiki/~internal~.PaginatedEvents)\>

#### Defined in

index.ts:115

___

### registerEvent

▸ **registerEvent**(`tenantKey`, `event`): `Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantKey` | `string` |
| `event` | [`CreateEventDto`](../wiki/~internal~.CreateEventDto) |

#### Returns

`Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Defined in

index.ts:47

___

### registerEvents

▸ **registerEvents**(`tenantKey`, `events`): `Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantKey` | `string` |
| `events` | [`UpsertEventDto`](../wiki/~internal~.UpsertEventDto)[] |

#### Returns

`Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Defined in

index.ts:68

___

### sendMessage

▸ **sendMessage**(`eventData`, `topic`, `action?`, `correlationId?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventData` | `Partial`<[`EventData`](../wiki/~internal~.EventData)\> |
| `topic` | `string` |
| `action?` | `string` |
| `correlationId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

index.ts:156

___

### unregisterEvent

▸ **unregisterEvent**(`tenantKey`, `source`, `event`, `version`): `Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tenantKey` | `string` |
| `source` | `string` |
| `event` | `string` |
| `version` | `string` |

#### Returns

`Promise`<[`Event`](../wiki/~internal~.Event)\>

#### Defined in

index.ts:89
