import { Reducer } from "redux";
import { GROUP_QUERY, GROUP_QUERY_COMPLETED } from "../actions/actions.constants";

import Group from "../../models/Group.model";
import { AppData } from "../store";

export interface GroupState{
    query: string;
    groupCollections: { [query: string]: number[] };
    groups: { [groupId: number]: Group };
}

const intialState : GroupState = {
    query: "",
    groupCollections: {},
    groups:{}
};

export const groupSelector = () => (state:AppData) => {
    const currentGroupIds = state.groups.groupCollections[state.groups.query] || [];
	const currentGroup = currentGroupIds.map(
		(groupId) => state.groups.groups[groupId]
    );
	return currentGroup;
};

export const groupQuerySelector = () => (state:AppData) => state.groups.query;

export const groupReducer: Reducer<GroupState> = (state = intialState, action) => {
    switch (action.type) {
        case GROUP_QUERY:
            return { ...state, query: action.payload };
        case GROUP_QUERY_COMPLETED:
            const groups: Group[] = action.payload.groups as Group[];
            const groupIds = groups.map((value) => value.id);
            
            const normalizeGroup = groups.reduce((prev, group) => ({...prev, [group.id]:group}), { });

            return {
                ...state, groupCollections: { ...state.groupCollections, [action.payload.query]: groupIds },
                groups :{...state.groups,...normalizeGroup}
            };
        default:
            return state;
    }
}