import Kafka from '@acpaas/kafka-nodejs-helper';
import { ModuleConfig, TenantsConfig } from '@wcm/config-helper';
import { v4 as uuid } from 'uuid';

import { Event, EventData, PaginatedEvents } from './classes/Event';
import { CreateEventDto } from './dto/create-event.dto';
import { UpsertEventDto } from './dto/upsert-event.dto';
import { IKafkaConfig } from './index.types';

export class EventRegistryHelper {
	private tenantsConfig: TenantsConfig = null;
	private module: ModuleConfig = null;
	private kafka: Kafka = null;
	private kafkaConfig: IKafkaConfig = null;
	private gatewayBaseUrl: string = null;

	constructor({
		tenantsConfig,
		kafkaConfig,
		gatewayBaseUrl
	}: { tenantsConfig: TenantsConfig, kafkaConfig: IKafkaConfig, gatewayBaseUrl: string }) {
		this.tenantsConfig = tenantsConfig;
		this.module = tenantsConfig.getModuleContext();

		if (!this.module) {
			this.tenantsConfig.on('ready', () => {
				this.module = tenantsConfig.getModuleContext();
			});
		}

		this.kafkaConfig = kafkaConfig;
		this.gatewayBaseUrl = gatewayBaseUrl;
		this.kafka = new Kafka({
			kafkaHost: kafkaConfig.host,
			origin: kafkaConfig.origin,
			...(kafkaConfig.ca ? {
				ssl: {
					rejectUnauthorized: true,
					ca: [kafkaConfig.ca],
					key: kafkaConfig.key,
					cert: kafkaConfig.cert
				}
			} : null)
		});
	}

	public async registerEvent(
		tenantKey: string,
		event: CreateEventDto
	): Promise<Event> {
		return this.tenantsConfig.requestModule(
			tenantKey,
			'event-registry',
			'POST',
			'/v1/events',
			{
				json: {
					...event,
					meta: {
						...event.meta,
						moduleId: this.module.uuid
					}
				}
			} as Record<string, object>
		);
	}

	public async registerEvents(
		tenantKey: string,
		events: UpsertEventDto[]
	): Promise<Event> {
		const json = events.map(event => ({
			...event,
			meta: {
				...event.meta,
				moduleId: this.module.uuid
			}
		}));

		return this.tenantsConfig.requestModule(
			tenantKey,
			'event-registry',
			'PATCH',
			'/v1/events',
			{ json } as Record<string, object>
		);
	}

	public async unregisterEvent(
		tenantKey: string,
		source: string,
		event: string,
		version: string
	): Promise<Event> {
		const moduleEvents = await this.getModuleEvents(tenantKey, {
			source,
			event,
			version
		});

		const eventUuid = moduleEvents?._embedded?.events[0]?.uuid;

		if (!eventUuid) {
			throw new Error('Cannot unregister event');
		}

		return this.tenantsConfig.requestModule(
			tenantKey,
			'event-registry',
			'DELETE',
			`/v1/events/${eventUuid}`
		);
	}

	public async getModuleEvents(
		tenantKey: string,
		searchParams?: {
			source?: string;
			event?: string;
			version?: string;
		}
	): Promise<PaginatedEvents> {
		return this.tenantsConfig.requestModule(
			tenantKey,
			'event-registry',
			'GET',
			'/v1/events',
			{
				searchParams: {
					...searchParams,
					moduleId: this.module.uuid
				}
			} as Record<string, object>
		);
	}

	public async getEvents(
		tenantKey: string,
		searchParams?: {
			category?: 'public' | 'internal',
			source?: string;
			event?: string;
			version?: string;
			moduleId?: string;
		}
	): Promise<PaginatedEvents> {
		return this.tenantsConfig.requestModule(
			tenantKey,
			'event-registry',
			'GET',
			'/v1/events',
			{ searchParams } as Record<string, object>
		);
	}

	public async sendMessage(eventData: Partial<EventData>, topic: string, action?: string, correlationId = uuid()) {
		const body = {
			version: 'v1',
			specVersion: '1.0',
			type: `be.digipolis.wcm.${eventData.source}.${eventData.event}.${eventData.version || 'v1'}`,
			dataContentType: 'application/json',
			dataSchema: `${this.gatewayBaseUrl}/events/v1/sources/${eventData.source}/events/${eventData.event}/versions/${eventData.version || 'v1'}`,
			time: new Date().toISOString(),
			...eventData
		};

		return this.kafka.send({
			body,
			topic,
			key: action || body.type,
			headers: {
				correlationId,
				topic,
				action: action || body.type,
				type: 'event',
				origin: this.kafkaConfig.origin,
				timestamp: new Date().toISOString()
			}
		});
	}
}
