import {action, makeAutoObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {RootStore} from "./RootStore";

export class UIStore {
    private rootStore: RootStore;
    static Instance: UIStore;

    @persist
    @observable
    public isExpenseModalOpen = false

    @persist
    @observable
    public isGroupModalOpen = false

    @persist
    @observable
    public isGenericSnackbarOpen = false

    @persist
    @observable
    public isGenericSnackbarMessage = ""

    @persist
    @observable
    public isGenericSnackbarDuration = 1000

    @persist
    @observable
    public isUserModalOpen = false

    @persist
    @observable
    public isUserGroupModalOpen = false

    @persist
    @observable
    public header = ""

    @persist
    @observable
    public isConfirmBoxOpen = false

    @persist
    @observable
    public isConfirmBoxMessage = ""


    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    public static new = async (rootStore: RootStore) => {
        if (!UIStore.Instance) {
            UIStore.Instance = new UIStore(rootStore);
        }
        return Promise.resolve(UIStore.Instance);
    }

    @action
    openExpenseModal = (): void => {
        this.isExpenseModalOpen = true;
    }

    @action
    closeExpenseModal = (): void => {
        this.isExpenseModalOpen = false;
    }
    @action
    openGenericSnackbar = (message:string, duration = 1000): void => {
        this.isGenericSnackbarOpen = true;
        this.isGenericSnackbarMessage = message
        this.isGenericSnackbarDuration = duration
    }

    @action
    closeGenericSnackbar = (): void => {
        this.isGenericSnackbarOpen = false;
    }

    @action
    openGroupModal = (): void => {
        this.isGroupModalOpen = true;
    }

    @action
    closeGroupModal = (): void => {
        this.isGroupModalOpen = false;
    }

    @action
    openUserModal = (): void => {
        this.isUserModalOpen = true;
    }

    @action
    closeUserModal = (): void => {
        this.isUserModalOpen = false;
    }

    @action
    setHeader = (header: string): void => {
        this.header = header;
    }

    @action
    openUserGroupModal = (): void => {
        this.isUserGroupModalOpen = true;
    }

    @action
    closeUserGroupModal = (): void => {
        this.isUserGroupModalOpen = false;
    }

    @action
    openConfirmBox = (message:string): void => {
        this.isConfirmBoxOpen = true;
        this.isConfirmBoxMessage = message
    }

    @action
    closeConfirmBox = (): void => {
        this.isConfirmBoxOpen = false;
    }
}