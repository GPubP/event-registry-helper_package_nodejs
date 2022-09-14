# WCM Event Registry Helper #

This packages provides the tools to register and send events. 

It provides the following methods:

## Interface 

### Create instance
```ts
const eventRegistry = new EventRegistryHelper({
	tenantsConfig: tenantConfig,
	kafkaConfig: {
		host: "hostname of kafka";
		origin: "server origin";
		ca: "CA PUBLIC KEY";
		key: "PRIVATE KEY";
		cert: "PUBLIC KEY";
	},
	gatewayBaseUrl: "http://api-gw-o.antwerpen.be",
});
```

### Register event
The register event function takes a single event and registers it in the registry. 

```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.registerEvent(tenantConfig.getAllApps()[0].apikey, {
	data: {
		source: "content",
		event: "created",
		version: "v1",
		specVersion: "1.0",
		description: "Wanneer een content item aangemaakt is",
		dataContentType: "application/json",
		dataSchema: {
			...
		}
	},
	meta: {
		category: "public",
	}
});
```

### Register events
The register event function takes multiple events and registers it in the registry. 

```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.registerEvents(tenantConfig.getAllApps()[0].apikey, [{
	data: {
		source: "content",
		event: "created",
		version: "v1",
		specVersion: "1.0",
		description: "Wanneer een content item aangemaakt is",
		dataContentType: "application/json",
		dataSchema: {
			...
		}
	},
	meta: {
		category: "public",
	}
}])
```

### Unregister event
The unregister event function will unregister an event based upon source, event and version. Throws an error if event is not found. 

```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.unregisterEvent(tenantConfig.getAllApps()[0].apikey, 'content', 'created', 'v1');
```

### Get module events
The getModuleEvents function will only return the events from the module it is called in. The current module is determined by using `tenantsConfig.getModuleContext()`. 
It accepts source, event and version as search params.

```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.getModuleEvents(tenantConfig.getAllApps()[0].apikey, {
	source: 'content', 
	event: 'created', 
	version: 'v1',
});
```

### Get events
The getEvents function will return all events. It accepts source, event, version, moduleId and category as search params.
```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.getEvents(tenantConfig.getAllApps()[0].apikey, {
	source: 'content', 
	event: 'created', 
	version: 'v1',
	moduleId: 'c5c61f16-f8bd-41a4-aace-c47d701ee401',
	category: 'public',
});
```

### Send Message
The sendMessage function is used to send an event to Kafka. It needs an event body and topic. 
Optionally you can pass a specific action (eg: be.digipolis.wcm.content.created.v1) and correlation uuid.

```ts
const eventRegistry = new EventRegistryHelper({
	...
});

eventRegistry.sendMessage({
	subject: 'een-content-item',
	source: 'content',
	event: 'created',
	data: {
		tenant: {
			id: 'ca3bf72e-6276-4cb0-ab59-a98ac8c95ea1',
			name: 'tenant-test-1',
		},
		contentType: {
			id: 'c2d16b2a-a186-49f3-956b-6fde906d8cb9',
			name: 'event-ct',
		},
		site: {
			id: 'ff043d59-5a62-4e9e-b035-e31864ab0878',
			name: 'IBS',
		},
		content: {
			id: '5b69d8ca-c969-423d-a70d-19d7071d67b5',
			label: 'een-content-item',
			lang: 'nl',
			state: 'DRAFT',
			workflowState: 'werkversie',
		},
	},
}, 'wcm-digipolis.content.json');
```
