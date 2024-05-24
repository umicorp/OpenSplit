export type UserType = {
    id: number,
    name: string,
}

export type ExpenseType = {
    id: number,
    name: string,
    totalAmount: number,
    paidBy: UserType,
    owed: number,
    participants: [{number: number}]
}

export type UserGroupType = {
    group: GroupType,
    users: UserType,
}

export type GroupType = {
    id: number,
    name: string,
}
