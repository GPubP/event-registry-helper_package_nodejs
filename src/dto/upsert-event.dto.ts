import { CreateEventDto } from './create-event.dto';

export class UpsertEventDto extends CreateEventDto {
	public uuid?: string;
}
