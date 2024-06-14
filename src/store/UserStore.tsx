import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {persist} from "mobx-persist";
import {RootStore} from "./RootStore";
import {UserType} from "./Types";
import {uppercaseName} from "../helpers/Common";

export class UserStore {
    private rootStore: RootStore;
    static Instance: UserStore;

    @persist("list")
    @observable
    public users: UserType[] = [];

    @persist("object")
    @observable
    public currentUser: UserType | null = null;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        autorun(() => {
            this.getUsersAPI();
        });
    }

    public static new = async (rootStore: RootStore) => {
        if (!UserStore.Instance) {
            UserStore.Instance = new UserStore(rootStore);
        }
        return Promise.resolve(UserStore.Instance);
    }

    @action
    public setCurrentUser = (username: string): void =>  {
        const user: UserType[] = this.users.filter((user: UserType): boolean => user.name === username);
        this.currentUser = user[0];
        this.rootStore.uiStore?.openGenericSnackbar(`Logged in as ${uppercaseName(user[0].name)}`, 1000);

    }

    @action
    public getUsersAction = (data: UserType[]): void => {
        this.users = data;
    }

    @action
    public getUsersAPI = (): void => {
        axios.get(`${window._env_.BACKEND_ADDRESS}/api/users/`)
            .then(({ data }:{ data: UserType[] }) => {
                this.getUsersAction(data);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                    this.rootStore.uiStore?.openGenericSnackbar("Server Unreachable", 5000, "error" );
                }
            });
    }

    @action
    public createUserAction = (data: UserType): void => {
        this.users.push(data);
        this.rootStore.uiStore?.openGenericSnackbar("User Created");
    }

    @action
    public createUserAPI = (user: string): void => {
        axios.post(`${window._env_.BACKEND_ADDRESS}/api/users/`,{"username": user})
            .then(({ data }: { data: UserType }) => {
                this.createUserAction(data);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                    this.rootStore.uiStore?.openGenericSnackbar("Server Unreachable", 5000, "error" );
                }
            });
    }

}