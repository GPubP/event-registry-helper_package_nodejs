/* istanbul ignore file */
import { Meta } from './Meta';
import { Pagination } from './Pagination';

class EventMeta extends Meta {
	public lastModified: string;
	public moduleId: string;
	public deleted: boolean;
	public enabled: boolean;
}

export class EventData {
	public version: string;
	public specVersion: string;
	public source: string;
	public event: string;
	readonly dataContentType: string;
	readonly dataSchema: object;
	public subject?: string;
	public type?: string;
	// tslint:disable-next-line: no-any
	public data?: Record<string, any>;
}

export class Event {
	public uuid: string;
	public data: EventData;
	public meta: EventMeta;
}

class EventList {
	public events: Event[];
}

export class PaginatedEvents extends Pagination {
	// tslint:disable-next-line: variable-name
	public _embedded: EventList;
}
