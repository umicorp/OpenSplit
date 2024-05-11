import UserStore from "./user-store";
import GroupStore from "./group-store";

export default class RootStore {
    public static Instance: RootStore | null = null;
    public groupStore: GroupStore | null = null;
    public userStore: UserStore | null =  null;

    constructor() {
        this.groupStore = new GroupStore(this);
        this.userStore = new UserStore(this);
    }

    public static new = async () => {
        if (!RootStore.Instance) {
            RootStore.Instance = new RootStore();
            return RootStore.Instance;
        }
        return Promise.resolve(RootStore.Instance);
    }
}