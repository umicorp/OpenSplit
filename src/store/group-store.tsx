import {action, makeAutoObservable} from "mobx";
import RootStore from "./root-store";

export default class GroupStore {
    groups: any[] = []
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore
    }

    @action
    getGroups() {
        this.groups = [
            {
                "id": 1,
                "name": "Morin",
                "createdAt": "2024-05-07T02:02:18.722Z",
                "updatedAt": "2024-05-07T02:02:18.722Z"
            },
            {
                "id": 2,
                "name": "Cruise",
                "createdAt": "2024-05-07T02:02:18.722Z",
                "updatedAt": "2024-05-07T02:02:18.722Z"
            }
        ]
    }
}
