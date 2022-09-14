class EventDataDto {
	public version: string;
	public specVersion: string;
	public source: string;
	public event: string;
	public type?: string;
	public dataContentType: string;
	public dataSchema: object;
}

class EventMetaDto {
	public category: string;
}

export class CreateEventDto {
	public data: EventDataDto;
	public meta: EventMetaDto;
}
