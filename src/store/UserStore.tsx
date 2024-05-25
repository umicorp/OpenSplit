import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {persist} from "mobx-persist";
import {RootStore} from "./RootStore";
import {UserType} from "./Types";

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
    }

    @action
    public getUsersAction = (data: UserType[]): void => {
        this.users = data;
    }

    @action
    public getUsersAPI = (): void => {
        axios.get("http://localhost:3001/api/users/")
            .then(({ data }:{ data: UserType[] }) => {
                this.getUsersAction(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public createUserAction = (data: UserType): void => {
        this.users.push(data)
    }

    @action
    public createUserAPI = (user: string): void => {
        axios.post("http://localhost:3001/api/users/",{"username": user})
            .then(({ data }: { data: UserType }) => {
                this.createUserAction(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

}