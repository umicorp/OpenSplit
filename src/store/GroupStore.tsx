import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {RootStore} from "./RootStore";
import {persist} from "mobx-persist";
import {ExpenseType, GroupType, UserType} from "./Types";


export default class GroupStore {
    private rootStore: RootStore;
    static Instance: GroupStore;

    @persist("list")
    @observable
    public allGroups: GroupType[] = []

    @persist("list")
    @observable
    public usersInCurrentGroup: UserType[] = []

    @persist("object")
    @observable
    public currentGroup: GroupType | null = null

    @persist("list")
    @observable
    public groupExpenses: ExpenseType[] = []

    @persist
    @observable
    public userGroupBalance = 0

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

        autorun(() => {
            this.getGroupsAPI();
        });
    }

    public static new = async (rootStore: RootStore) => {
        if (!GroupStore.Instance) {
            GroupStore.Instance = new GroupStore(rootStore);
        }
        return Promise.resolve(GroupStore.Instance);
    }

    @action
    public getGroupsAction = (groups: GroupType[]) => {
        this.allGroups = groups
    }

    @action
    public getGroupsAPI = (): void => {
        axios.get("http://localhost:3001/api/groups")
            .then(({ data }: { data: GroupType[] }) => {
                this.getGroupsAction(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public createGroup = (name: string): void => {
        axios.post("http://localhost:3001/api/groups",{"name": name})
            .then(({ data }) => {
                this.allGroups.push(data);
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
    public getUsersCurrentGroup = (groupId: number): void =>{
        axios.get(`http://localhost:3001/api/usergroup/${groupId}`)
            .then(({ data }:  {data: UserType[] }) => {
                this.usersInCurrentGroup = data;
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
                this.setCurrentGroup(groupId);
                this.calculateCurrentUserBalance(this.groupExpenses, userId);
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    calculateCurrentUserBalance = (groupExpenses: ExpenseType[], currentUser: number): void => {
        let userGroupBalance = 0;
        for (const expense of groupExpenses) {
            for ( const participant of expense.participants){
                if (currentUser === expense.paidBy.id) {
                    userGroupBalance += expense.owed;
                } else{
                    userGroupBalance-= Number(Object.values(participant)[0]);
                }
            }
        }
        this.userGroupBalance = userGroupBalance;
}

}
