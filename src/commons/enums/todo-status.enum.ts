import { registerEnumType } from "@nestjs/graphql";

export enum TodoStatus {
    OPEN = 'OPEN',
    IN_PROCESS = 'IN_PROCESS',
    DONE = 'DONE'
}

registerEnumType(TodoStatus, { name: 'TodoStatus' })