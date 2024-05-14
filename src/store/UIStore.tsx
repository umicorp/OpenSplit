import {action, autorun, makeAutoObservable, observable} from "mobx";
import axios from "axios";
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
    public isUserModalOpen = false

    @persist
    @observable
    public header = ""


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
        this.isExpenseModalOpen = true
    }

    @action
    closeExpenseModal = (): void => {
        this.isExpenseModalOpen = false;
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
}