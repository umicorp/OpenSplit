import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
import {RootStore} from "./RootStore";
import {persist} from "mobx-persist";
import {ExpenseType, GroupType, UserGroupType, UserType} from "./Types";
import dayjs from "dayjs";


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
    public getGroupsAction = (groups: UserGroupType[]): void => {
        this.allGroups = groups;
    }

    @action
    public getGroupsAPI = (): void => {
        axios.get(`${window._env_.BACKEND_ADDRESS}/api/groups`)
            .then(({ data }: { data: UserGroupType[] }) => {
                this.getGroupsAction(data);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                    this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }


            });
    }

    @action
    public createGroup = (name: string): void => {
        axios.post(`${window._env_.BACKEND_ADDRESS}/api/groups`,{"name": name})
            .then(({ data }) => {
                this.allGroups = data;
                this.rootStore.uiStore?.openGenericSnackbar("Group Created");

            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
    public deleteGroup = (id: number): void => {
        axios.delete(`${window._env_.BACKEND_ADDRESS}/api/groups/${id}`)
            .then(({ data }) => {
                this.allGroups = data;
                this.rootStore.uiStore?.openGenericSnackbar("Group Deleted");
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
    public setCurrentGroup = (groupId: number, userId: number): void => {
        const userGroups: UserGroupType[] = this.allGroups.filter((userGroup) => userGroup.group.id == groupId);
        this.currentGroup = userGroups[0].group;
        this.rootStore.uiStore?.setHeader(userGroups[0].group.name);
        this.getCurrentGroupUsersAPI(groupId);
        this.getGroupExpensesAPI(userId, groupId);
    }

    @action
    public getCurrentGroupUsersAction = (data: UserType[]): void => {
        this.currentGroupUsers = data;
    }

    @action
    public getCurrentGroupUsersAPI = (groupId: number): void =>{
        axios.get(`${window._env_.BACKEND_ADDRESS}/api/usergroup/${groupId}`)
            .then(({ data }:  {data: UserType[]}) => {
                this.getCurrentGroupUsersAction(data);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
    public getGroupExpensesAction = (data: ExpenseType[]): void => {
        // sort in expenses from latest
        this.groupExpenses = data.sort((a,b) => dayjs(b.date).format("D") == dayjs(a.date).format("D") ? b.id - a.id : dayjs(b.date).unix() - dayjs(a.date).unix() );
    }

    @action
    public getGroupExpensesAPI = (userId: number, groupId: number): void => {
        axios.get(`${window._env_.BACKEND_ADDRESS}/api/expense/`,{
            params: {
                userid: userId.toString(),
                groupid: groupId.toString(),
            }
        })
            .then(({ data }: {data: ExpenseType[]}) => {
                this.getGroupExpensesAction(data);
                this.calculateCurrentUserBalance(userId);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
// TODO: Find out a better way to deal with this.
    public calculateCurrentUserBalance = ( userId: number | undefined | null): void => {
        let userGroupBalance = 0;
        this.groupExpenses.forEach((expense: ExpenseType) => {
            if (userId === expense.paidBy.id) {
                userGroupBalance += expense.owed;
            } else if (userId != expense.paidBy.id ){
                userGroupBalance -= expense.owed;
            }
        });
        this.userGroupBalance = userGroupBalance;
    }

    @action
    private addUserToGroupAction = (userGroups:UserGroupType[], groupId: number): void => {
        this.allGroups = userGroups;
        this.getCurrentGroupUsersAPI(groupId);
        this.rootStore.uiStore?.openGenericSnackbar("User Added");
    }

    @action
    public addUserToGroupAPI = (userId: number, groupId: number): void => {
        axios.post(`${window._env_.BACKEND_ADDRESS}/api/usergroup`,{"userid": userId, "groupid": groupId})
            .then(({ data }: { data: UserGroupType[] }) => {
                this.addUserToGroupAction(data, groupId);
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                    this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
    private addExpenseAction = (expense: ExpenseType): void => {
        this.groupExpenses.push(expense);
        if (expense.settleUp) {
            this.rootStore.uiStore?.openGenericSnackbar("Settled up!");
        } else {
            this.rootStore.uiStore?.openGenericSnackbar("Expense Created");

        }

        if (this.rootStore.userStore) {
            if(this.rootStore.userStore?.currentUser && this.rootStore.groupStore?.currentGroup) {
                this.calculateCurrentUserBalance(this.rootStore.userStore.currentUser.id);
                // TODO: Ask sheena why this line fixes the "you are owed" when adding a expense
                //  When line is not there the full expense amount gets added to "you are owed". When its there only the actual amount owed is added to "you are owed"
                this.getGroupExpensesAPI(this.rootStore.userStore.currentUser.id, this.rootStore.groupStore.currentGroup.id);

            }
        }
    }

    @action
    public addExpenseAPI = (expense: ExpenseType): void => {
        axios.post(`${window._env_.BACKEND_ADDRESS}/api/expense`, expense)
            .then(() => this.addExpenseAction(expense))
            .catch((error) => {
                console.log(error)
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }

    @action
    public deleteExpense = (id: number): void => {
        axios.delete(`${window._env_.BACKEND_ADDRESS}/api/expense/${id}`)
            .then(({ data }) => {
                this.groupExpenses = this.groupExpenses.filter((expense) => expense.id !== data.id);
                const currentUser = this.rootStore.userStore?.currentUser
                this.calculateCurrentUserBalance(currentUser?.id)
                this.rootStore.uiStore?.openGenericSnackbar("Deleted");
            })
            .catch(error => {
                console.error(error);
                if (error.code === "ERR_NETWORK") {
                                       this.rootStore.uiStore?.openGenericSnackbar(`Server ${window._env_.BACKEND_ADDRESS} is Unreachable`, 5000, "error" );
                }
            });
    }
}
