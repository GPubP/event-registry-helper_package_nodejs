import Kafka from '@acpaas/kafka-nodejs-helper';

import { EventRegistryHelper } from './index';
import { getEmptyTenantsConfigMock, getTenantsConfigMock } from '../test/helpers/tenantsConfigMock';
import eventMock from '../test/mocks/event.json';

const moduleId = 'module-uuid';
const tenantKey = 'tenant-key';
const source = 'content';
const event = 'created';
const version = 'v1';
const category = 'public';

jest.useFakeTimers().setSystemTime(new Date('2022-08-16T13:53:30.415Z'));

describe('[UNIT UPSERT] BraasBslHelper', () => {
	let eventRegistryHelper: EventRegistryHelper;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let requestModule = jest.fn(() => Promise.resolve(true) as any);

	const helperConfig = {
		gatewayBaseUrl: 'http://localhost:7200',
		kafkaConfig: {
			origin: 'origin',
			host: 'host',
			ca: 'ca',
			key: 'key',
			cert: 'cert'
		}
	};

	beforeEach(() => {
		eventRegistryHelper = new EventRegistryHelper({
			tenantsConfig: getTenantsConfigMock({ requestModuleFn: requestModule }),
			...helperConfig
		});
	});

	afterEach(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eventRegistryHelper = null as any;
		requestModule.mockClear();
	});

	it('should init correctly', () => {
		const getModuleContext = jest.fn(() => undefined);
		const configMock = getEmptyTenantsConfigMock({
			requestModuleFn: requestModule,
			getModuleContextFn: getModuleContext
		});

		new EventRegistryHelper({
			tenantsConfig: configMock,
			...helperConfig
		});

		configMock.on('ready', () => ({}));
		expect(getModuleContext).toHaveBeenCalledTimes(2);
	});

	it('should register single event', async () => {
		await eventRegistryHelper.registerEvent(tenantKey, eventMock);

		const registerCall: unknown[] = requestModule.mock.calls[0];

		expect(registerCall[0]).toEqual(tenantKey);
		expect(registerCall[1]).toEqual('event-registry');
		expect(registerCall[2]).toEqual('POST');
		expect(registerCall[3]).toEqual('/v1/events');
		expect(registerCall[4]).toHaveProperty('json');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((registerCall[4] as any).json).toHaveProperty('data', eventMock.data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((registerCall[4] as any).json).toHaveProperty('meta', {
			...eventMock.meta,
			moduleId
		});
	});

	it('should register multiple events', async () => {
		await eventRegistryHelper.registerEvents(tenantKey, [eventMock]);

		const registerCall: unknown[] = requestModule.mock.calls[0];

		expect(registerCall[0]).toEqual(tenantKey);
		expect(registerCall[1]).toEqual('event-registry');
		expect(registerCall[2]).toEqual('PATCH');
		expect(registerCall[3]).toEqual('/v1/events');
		expect(registerCall[4]).toHaveProperty('json');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((registerCall[4] as any).json[0]).toHaveProperty('data', eventMock.data);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((registerCall[4] as any).json[0]).toHaveProperty('meta', {
			...eventMock.meta,
			moduleId
		});
	});

	it('should unregister events', async () => {
		requestModule = jest.fn(() =>
			Promise.resolve({ _embedded: { events: [{ uuid: '1' }] } })
		);
		eventRegistryHelper = new EventRegistryHelper({
			tenantsConfig: getTenantsConfigMock({ requestModuleFn: requestModule }),
			...helperConfig
		});
		await eventRegistryHelper.unregisterEvent(tenantKey, 'content', 'created', 'v1');

		const getCall: unknown[] = requestModule.mock.calls[0];
		const unregisterCall: unknown[] = requestModule.mock.calls[1];

		expect(getCall[0]).toEqual(tenantKey);
		expect(getCall[1]).toEqual('event-registry');
		expect(getCall[2]).toEqual('GET');
		expect(getCall[3]).toEqual('/v1/events');
		expect(getCall[4]).toHaveProperty('searchParams');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('source', source);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('event', event);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('version', version);

		expect(unregisterCall[0]).toEqual(tenantKey);
		expect(unregisterCall[1]).toEqual('event-registry');
		expect(unregisterCall[2]).toEqual('DELETE');
		expect(unregisterCall[3]).toEqual('/v1/events/1');
	});

	it('should throw error on unregister if event is not found', async () => {
		requestModule = jest.fn(() =>
			Promise.resolve({ _embedded: { events: [] } })
		);
		eventRegistryHelper = new EventRegistryHelper({
			tenantsConfig: getTenantsConfigMock({ requestModuleFn: requestModule }),
			...helperConfig
		});
		await expect(
			eventRegistryHelper.unregisterEvent(tenantKey, 'content', 'created', 'v1')
		).rejects.toThrow('Cannot unregister event');

		const getCall: unknown[] = requestModule.mock.calls[0];

		expect(getCall[0]).toEqual(tenantKey);
		expect(getCall[1]).toEqual('event-registry');
		expect(getCall[2]).toEqual('GET');
		expect(getCall[3]).toEqual('/v1/events');
		expect(getCall[4]).toHaveProperty('searchParams');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('source', source);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('event', event);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('version', version);
	});

	it('should get module events', async () => {
		await eventRegistryHelper.getModuleEvents(tenantKey, {
			source,
			event,
			version
		});

		const getCall: unknown[] = requestModule.mock.calls[0];

		expect(getCall[0]).toEqual(tenantKey);
		expect(getCall[1]).toEqual('event-registry');
		expect(getCall[2]).toEqual('GET');
		expect(getCall[3]).toEqual('/v1/events');
		expect(getCall[4]).toHaveProperty('searchParams');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('source', source);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('event', event);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('version', version);
	});

	it('should get events', async () => {
		await eventRegistryHelper.getEvents(tenantKey, {
			category,
			source,
			version,
			event
		});

		const getCall: unknown[] = requestModule.mock.calls[0];

		expect(getCall[0]).toEqual(tenantKey);
		expect(getCall[1]).toEqual('event-registry');
		expect(getCall[2]).toEqual('GET');
		expect(getCall[3]).toEqual('/v1/events');
		expect(getCall[4]).toHaveProperty('searchParams');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('source', source);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('event', event);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('version', version);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((getCall[4] as any).searchParams).toHaveProperty('category', category);
	});

	it('send a message', async () => {
		const sendSpy = jest.spyOn(Kafka.prototype, 'send').mockImplementation();
		await eventRegistryHelper.sendMessage(
			{
				source: 'tests',
				event: 'test',
				version: 'v1'
			},
			'topic',
			'action',
			'1239a2e4-cc8c-4b9d-a283-dfb8d689d947'
		);

		expect(sendSpy).toHaveBeenCalledWith({
			body: {
				dataContentType: 'application/json',
				dataSchema: 'http://localhost:7200/events/v1/sources/tests/events/test/versions/v1',
				specVersion: '1.0',
				type: 'be.digipolis.wcm.tests.test.v1',
				version: 'v1',
				event: 'test',
				source: 'tests',
				time: '2022-08-16T13:53:30.415Z'
			},
			headers: {
				action: 'action',
				correlationId: '1239a2e4-cc8c-4b9d-a283-dfb8d689d947',
				origin: 'origin',
				timestamp: '2022-08-16T13:53:30.415Z',
				topic: 'topic',
				type: 'event'
			},
			key: 'action',
			topic: 'topic'
		});
	});

	it('init without all kafka credentials', async () => {
		eventRegistryHelper = new EventRegistryHelper({
			tenantsConfig: getTenantsConfigMock({ requestModuleFn: requestModule }),
			...helperConfig,
			kafkaConfig: {
				origin: '',
				host: '',
				ca: '',
				key: '',
				cert: ''
			}
		});

		const sendSpy = jest.spyOn(Kafka.prototype, 'send').mockImplementation();
		await eventRegistryHelper.sendMessage(
			{
				source: 'tests',
				event: 'test'
			},
			'topic',
			'action',
			'1239a2e4-cc8c-4b9d-a283-dfb8d689d947'
		);

		expect(sendSpy).toHaveBeenCalledWith({
			body: {
				dataContentType: 'application/json',
				dataSchema: 'http://localhost:7200/events/v1/sources/tests/events/test/versions/v1',
				specVersion: '1.0',
				type: 'be.digipolis.wcm.tests.test.v1',
				version: 'v1',
				event: 'test',
				source: 'tests',
				time: '2022-08-16T13:53:30.415Z'
			},
			headers: {
				action: 'action',
				correlationId: '1239a2e4-cc8c-4b9d-a283-dfb8d689d947',
				origin: 'origin',
				timestamp: '2022-08-16T13:53:30.415Z',
				topic: 'topic',
				type: 'event'
			},
			key: 'action',
			topic: 'topic'
		});
	});
});
