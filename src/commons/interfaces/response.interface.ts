import { StatusResponse } from "src/commons/enums/status-response.enum";

export class CommonResponse<T>{
    status: StatusResponse;
    data?: T;
}