export type UserType = {
    id: number,
    name: string,
}

export type GroupType = {
    id: number,
    name: string,
}

export type UserGroupType = {
    group: GroupType,
    users: UserType[],
}

export type ExpenseParticipant = {
    userId: number,
    amount: number
}

export type ExpenseType = {
    id: number,
    groupId: number,
    name: string,
    date: string,
    totalAmount: number,
    paidBy: UserType,
    owed: number,
    settleUp: boolean,
    participants: ExpenseParticipant[]
}