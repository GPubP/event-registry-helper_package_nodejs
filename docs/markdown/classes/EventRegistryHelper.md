[**@wcm/event-registry-helper**](../README.md)

***

[@wcm/event-registry-helper](../globals.md) / EventRegistryHelper

# Class: EventRegistryHelper

Defined in: index.ts:10

## Constructors

### Constructor

> **new EventRegistryHelper**(`__namedParameters`): `EventRegistryHelper`

Defined in: index.ts:17

#### Parameters

##### \_\_namedParameters

###### gatewayBaseUrl

`string`

###### kafkaConfig

[`IKafkaConfig`](../~internal~/interfaces/IKafkaConfig.md)

###### tenantsConfig

`TenantsConfig`

#### Returns

`EventRegistryHelper`

## Methods

### getEvents()

> **getEvents**(`tenantKey`, `searchParams?`): `Promise`\<[`PaginatedEvents`](../~internal~/classes/PaginatedEvents.md)\>

Defined in: index.ts:137

#### Parameters

##### tenantKey

`string`

##### searchParams?

###### category?

`"public"` \| `"internal"`

###### event?

`string`

###### moduleId?

`string`

###### source?

`string`

###### version?

`string`

#### Returns

`Promise`\<[`PaginatedEvents`](../~internal~/classes/PaginatedEvents.md)\>

***

### getModuleEvents()

> **getModuleEvents**(`tenantKey`, `searchParams?`): `Promise`\<[`PaginatedEvents`](../~internal~/classes/PaginatedEvents.md)\>

Defined in: index.ts:115

#### Parameters

##### tenantKey

`string`

##### searchParams?

###### event?

`string`

###### source?

`string`

###### version?

`string`

#### Returns

`Promise`\<[`PaginatedEvents`](../~internal~/classes/PaginatedEvents.md)\>

***

### registerEvent()

> **registerEvent**(`tenantKey`, `event`): `Promise`\<[`Event`](../~internal~/classes/Event.md)\>

Defined in: index.ts:47

#### Parameters

##### tenantKey

`string`

##### event

[`CreateEventDto`](../~internal~/classes/CreateEventDto.md)

#### Returns

`Promise`\<[`Event`](../~internal~/classes/Event.md)\>

***

### registerEvents()

> **registerEvents**(`tenantKey`, `events`): `Promise`\<[`Event`](../~internal~/classes/Event.md)\>

Defined in: index.ts:68

#### Parameters

##### tenantKey

`string`

##### events

[`UpsertEventDto`](../~internal~/classes/UpsertEventDto.md)[]

#### Returns

`Promise`\<[`Event`](../~internal~/classes/Event.md)\>

***

### sendMessage()

> **sendMessage**(`eventData`, `topic`, `action?`, `correlationId?`): `Promise`\<`void`\>

Defined in: index.ts:156

#### Parameters

##### eventData

`Partial`\<[`EventData`](../~internal~/classes/EventData.md)\>

##### topic

`string`

##### action?

`string`

##### correlationId?

`string` = `...`

#### Returns

`Promise`\<`void`\>

***

### unregisterEvent()

> **unregisterEvent**(`tenantKey`, `source`, `event`, `version`): `Promise`\<[`Event`](../~internal~/classes/Event.md)\>

Defined in: index.ts:89

#### Parameters

##### tenantKey

`string`

##### source

`string`

##### event

`string`

##### version

`string`

#### Returns

`Promise`\<[`Event`](../~internal~/classes/Event.md)\>
