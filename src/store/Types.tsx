export type UserType = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

export type ExpenseType = {
    id: number,
    name: string,
    totalAmount: number,
    paidBy: UserType,
    owed: number,
    participants: [{number: number}]
}

export type GroupType = {
    id: number,
    name: string,
}