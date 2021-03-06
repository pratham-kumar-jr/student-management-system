import { Entity } from "./entity";
import State from "./State.model";
import User from "./User.model";

export default interface Group extends Entity {
    name: string;
    is_private?: boolean;
    description: string;
    introductory_message?: string;
    group_image_url: null | string;
    join_code?: string;
    created_at?: Date;
    updated_at?: Date;
    chatCount?: number;
    state?: State;
    creator?: User;
    issues?: any[];
    invitedMembers?: User[];
    participants?: User[];
    advocatePage?: string;
}