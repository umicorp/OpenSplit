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
            this.getUsers();
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
    public getUsers = (): void => {
        axios.get("http://localhost:3001/api/users/")
            .then(({ data }:{ data: UserType[] }) => {
                this.users = data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public createUser = (user: string): void => {
        axios.post("http://localhost:3001/api/users/",{"username": user})
            .then(({ data }: { data: UserType }) => {
                this.users.push(data)})
            .catch(error => {
                console.error(error);
            });
    }

}