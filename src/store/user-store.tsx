import {action, makeAutoObservable, observable} from "mobx";
import RootStore from "./root-store";
import {User} from "../../server/models/Model";
import {rootStore} from "../components/OpenSplit";

export default class UserStore {
    private rootStore: RootStore;
    static Instance: UserStore

    @observable
    public users: any[] = [];

    @observable
    public currentUser = "";

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    public static new = async (rootStore: RootStore) => {
        if (!UserStore.Instance) {
            UserStore.Instance = new UserStore(rootStore);
            return UserStore.Instance;
        }
        return Promise.resolve(UserStore.Instance);
    }

    @action
    setCurrentUser(user: string) {
        this.currentUser = user;
    }

    @action
    setUsers(users: any[]) {
        this.users = users;
    }
}