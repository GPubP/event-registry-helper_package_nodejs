/* istanbul ignore file */
class PaginationLink {
	public href: string;
}

class PaginationLinks {
	public self: PaginationLink;
	public prev: PaginationLink;
	public next: PaginationLink;
	public first: PaginationLink;
	public last: PaginationLink;
}

class PaginationPage {
	public size: number;
	public totalElements: number;
	public totalPages: number;
	public number: number;
}

export class Pagination {
	public _links: PaginationLinks;
	public _page: PaginationPage;
}
