type state = { expenses: []; }
type action = { type: string; payload: string; }
export default (state: state, action: action) => {
    switch(action.type) {
        case "DELETE_EXPENSE":
            return {
                ...state,
                expenses: state.expenses.filter((expense: { id: string; }) => expense.id !== action.payload )
            };
        case "ADD_EXPENSE":
            return {
                ...state,
                expenses:[action.payload, ...state.expenses]

            };
        default:
            return state;
    }
};