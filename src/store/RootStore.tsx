import {create} from "mobx-persist";
import GroupStore from "./GroupStore";
import {UserStore} from "./UserStore";
import {UIStore} from "./UIStore";

const hydrate = create({storage: localStorage, jsonify: true});

export class RootStore {
    public static Instance: RootStore | null = null;
    public groupStore: GroupStore | null = null;
    public userStore: UserStore | null = null;
    public uiStore: UIStore | null = null;

    constructor() {
        // Create the other stores
        this.groupStore = new GroupStore(this);
        this.userStore = new UserStore(this);
        this.uiStore = new UIStore(this);

        // Persistence
        hydrate("UserStore", this.userStore);
        hydrate("GroupStore", this.groupStore);
        hydrate("UIStore", this.uiStore);
    }

    public static new = async () => {
        // Singleton
        if (!RootStore.Instance) {
            RootStore.Instance = new RootStore();
            return RootStore.Instance;
        }
        return Promise.resolve(RootStore.Instance);
    }

}

export interface RootStoreProps {
    rootStore?: RootStore
}