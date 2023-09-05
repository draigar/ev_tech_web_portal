import {
    configurePersistable,
    getPersistedStore,
    makePersistable,
    stopPersisting,
} from "mobx-persist-store";

import { makeAutoObservable } from "mobx";

interface filterStateType {
    url: string;
    from?: string;
    to?: string;
}

class FilterStore {
    searchData: [] = [];
    filterResults: [] = [];
    filterStates: Partial<filterStateType> = {}

    constructor() {
        makeAutoObservable(this);
        configurePersistable(
            {
                storage:
                    typeof window !== "undefined" ? window.localStorage : undefined,
                expireIn: 604800000,
                removeOnExpiration: true,
                stringify: true,
                debugMode: false,
            },
            { delay: 200, fireImmediately: false }
        );
        makePersistable(this, {
            name: "filterStore",
            properties: [],
        });
    }
    
    setFilterData(val: [], states: filterStateType) {
        this.filterResults = val;
        this.filterStates = states;
    }

    setSearchData(val: []) {
        this.searchData = val;
    }

    async getFilterData() {
        const fRe = this.filterResults;
        const fRs = this.filterStates;
        return {
            filterResults: fRe,
            filterStates: fRs,
        }
    }

    async getStoredData() {
        return await getPersistedStore(this);
    }

    stopStore() {
        stopPersisting(this);
    }
}

export const filterStore = new FilterStore();
