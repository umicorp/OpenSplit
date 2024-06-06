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
    public isUserGroupModalOpen = false;

    @persist
    @observable
    public header = "";

    @persist
    @observable
    public isConfirmBoxOpen = false;

    @persist
    @observable
    public isConfirmBoxMessage = "";

    @persist
    @observable
    public isConfirmBoxTitle = "";

    @observable
    public confirmAction: () => void = () => {const placeholder = "placeholder"}

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
    openConfirmBox = (title:string, message:string, action: () => void): void => {
        this.isConfirmBoxOpen = true;
        this.isConfirmBoxMessage = message
        this.isConfirmBoxTitle = title
        this.confirmAction = action
    }

    @action
    exitConfirmBox = (): void => {
        this.isConfirmBoxOpen = false;
    }

}