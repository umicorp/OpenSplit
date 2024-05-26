export type UserType = {
    id: number,
    name: string,
}

export type ExpenseType = {
    id: number,
    groupId: number,
    name: string,
    totalAmount: number,
    paidBy: UserType,
    owed: number,
    participants: ExpenseParticipant[]
}

export type ExpenseParticipant = {
    userId: number,
    amount: number
}

export type UserGroupType = {
    group: GroupType,
    users: UserType[],
}

export type GroupType = {
    id: number,
    name: string,
}

export type UserAmountsType = {
    userid: number
    amount: number
}