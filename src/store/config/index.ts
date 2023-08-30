import {
  configurePersistable,
  getPersistedStore,
  makePersistable,
  stopPersisting,
} from "mobx-persist-store";

import { makeAutoObservable } from "mobx";

class Store {
  AppName: string = "EVTech";
  AppDescription: string = "EVTech Mobility services";
  AppVersion: string = "1.0.0";

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
      name: "config",
      properties: ["AppName"],
    });
  }

  async getStoredData() {
    return await getPersistedStore(this);
  }

  stopStore() {
    stopPersisting(this);
  }
}

export const config = new Store();
