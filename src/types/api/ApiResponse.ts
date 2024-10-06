export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
}