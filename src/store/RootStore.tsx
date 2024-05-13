import {create} from "mobx-persist";
import GroupStore from "./GroupStore";
import {UserStore} from "./UserStore";
import {action} from "mobx";

const hydrate = create({storage: localStorage, jsonify: true});

export class RootStore {
    public static Instance: RootStore | null = null;
    public groupStore: GroupStore | null = null;
    public userStore: UserStore | null =  null;
    public isExpenseModalOpen= false;

    constructor() {
        // Create the other stores
        this.groupStore = new GroupStore(this);
        this.userStore = new UserStore(this);

        // Persistence
        hydrate("UserStore", this.userStore);
        hydrate("GroupStore", this.groupStore);
    }

    public static new = async () => {
        // Singleton
        if (!RootStore.Instance) {
            RootStore.Instance = new RootStore();
            return RootStore.Instance;
        }
        return Promise.resolve(RootStore.Instance);
    }

    @action
    openExpenseModel = () => {
        this.isExpenseModalOpen = true;
        console.log("OPENED", this.isExpenseModalOpen)
    }

    @action
    closeExpenseModel = () => {
        this.isExpenseModalOpen = false;
        console.log("CLOSED", this.isExpenseModalOpen)
    }
}

export interface RootStoreProps {
    rootStore?: RootStore
}