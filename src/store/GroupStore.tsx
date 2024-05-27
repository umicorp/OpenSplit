import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {RootStore} from "./RootStore";
import {persist} from "mobx-persist";
import {ExpenseType, GroupType, UserGroupType, UserType} from "./Types";


export default class GroupStore {
    private rootStore: RootStore;
    static Instance: GroupStore;

    @persist("list")
    @observable
    public allGroups: UserGroupType[] = []

    @persist("list")
    @observable
    public currentGroupUsers: UserType[] = []

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
    public getGroupsAction = (groups: UserGroupType[]) => {
        this.allGroups = groups
    }

    @action
    public getGroupsAPI = (): void => {
        axios.get("http://localhost:3001/api/groups")
            .then(({ data }: { data: UserGroupType[] }) => {
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
                this.allGroups = data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public deleteGroup = (id: number): void => {
        axios.delete(`http://localhost:3001/api/groups/${id}`)
            .then(({ data }) => {
                this.allGroups = data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public setCurrentGroup = (groupId: number, userId: number): void => {
        const userGroups: UserGroupType[] = this.allGroups.filter((userGroup) => userGroup.group.id == groupId)
        this.currentGroup = userGroups[0].group
        this.rootStore.uiStore?.setHeader(userGroups[0].group.name)
        this.getCurrentGroupUsersAPI(groupId)
        this.getGroupExpensesAPI(userId, groupId)
    }

    @action
    public getCurrentGroupUsersAction = (data: UserType[]): void => {
        this.currentGroupUsers = data;
    }

    @action
    public getCurrentGroupUsersAPI = (groupId: number): void =>{
        axios.get(`http://localhost:3001/api/usergroup/${groupId}`)
            .then(({ data }:  {data: UserType[]}) => {
                this.getCurrentGroupUsersAction(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public getGroupExpensesAction = (data: ExpenseType[]): void => {
        this.groupExpenses = data
    }

    @action
    public getGroupExpensesAPI = (userId: number, groupId: number): void => {
        axios.get("http://localhost:3001/api/expense/",{
            params: {
                userid: userId.toString(),
                groupid: groupId.toString(),
            }
        })
            .then(({ data }: {data: ExpenseType[]}) => {
                this.getGroupExpensesAction(data)
                this.calculateCurrentUserBalance(userId);
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    public calculateCurrentUserBalance = ( userId: number): void => {
        let userGroupBalance = 0;
        this.groupExpenses.forEach((expense: ExpenseType) => {
            if (userId === expense.paidBy.id) {
                userGroupBalance += expense.owed;
            } else if (userId != expense.paidBy.id ){
                userGroupBalance -= expense.owed
            }
        })
        this.userGroupBalance = userGroupBalance;
    }

    @action
    private addUserToGroupAction = (userGroups:UserGroupType[]): void => {
        this.allGroups = userGroups
    }

    @action
    public addUserToGroupAPI = (userId: number, groupId: number): void => {
        axios.post("http://localhost:3001/api/usergroup",{"userid": userId, "groupid": groupId})
            .then(({ data }: { data: UserGroupType[] }) => {
                this.addUserToGroupAction(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    @action
    private addExpenseAction = (expense: ExpenseType): void => {
        this.groupExpenses.push(expense)
        console.log("Expense data submitted:", expense);
        if (this.rootStore.userStore) {
            if(this.rootStore.userStore?.currentUser && this.rootStore.groupStore?.currentGroup) {
                this.calculateCurrentUserBalance(this.rootStore.userStore.currentUser.id)
                // TODO: Ask sheena why this line fixes the "you are owed" when adding a expense
                // When line is not there the full expense amount gets added to "you are owed". When its there only the actual amount owed is added to "you are owed"
                this.getGroupExpensesAPI(this.rootStore.userStore.currentUser.id, this.rootStore.groupStore.currentGroup.id)

            }
        }
    }

    @action
    public addExpenseAPI = (expense: ExpenseType): void => {
        axios.post("http://localhost:3001/api/expense", expense)
            .then(() => this.addExpenseAction(expense))
            .catch((error) => console.log(error));
    }
}
