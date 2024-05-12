import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {RootStore} from "./RootStore";
import {persist} from "mobx-persist";
import {ExpenseType, GroupType} from "./Types";


export default class GroupStore {
    private rootStore: RootStore;
    static Instance: GroupStore

    @persist("list")
    @observable
    public allGroups: GroupType[] = []

    @persist("object")
    @observable
    public currentGroup: GroupType | null = null

    @persist("list")
    @observable
    public groupExpenses: ExpenseType[] = []

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        autorun(() => {
            this.getGroups();
        });
    }

    public static new = async (rootStore: RootStore) => {
        if (!GroupStore.Instance) {
            GroupStore.Instance = new GroupStore(rootStore);
        }
        return Promise.resolve(GroupStore.Instance);
    }

    @action
    public getGroups = (): void => {
        axios.get("http://localhost:3001/api/groups")
            .then(({ data }: { data: GroupType[] }) => {
                this.allGroups = data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public setCurrentGroup = (groupId: number): void => {
        axios.get(`http://localhost:3001/api/groups/${groupId}`)
            .then(({ data }:  {data: GroupType }) => {
                this.currentGroup = data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    getGroupExpenses = (userId: number, groupId: number): void => {
        axios.get("http://localhost:3001/api/expense/",{
            params: {
                userid: userId.toString(),
                groupid: groupId.toString(),
            }
        })
            .then(({ data }: {data: ExpenseType[]}) => {
                this.groupExpenses = data;
                this.setCurrentGroup(groupId)
                console.log(data)
                console.log(this.rootStore.userStore?.currentUser)
            })
            .catch(error => {
                console.error(error);
            });
    }
}
