const LOAD = "transaction/LOAD";
const ADD_ONE = "transaction/ADD_ONE";
const LOAD_ONE = "transaction/LOAD_ONE";
const DELETE_ONE = "transaction/DELETE_ONE";


const create = (transaction) => ({
    type: ADD_ONE,
    transaction,
})

const deleteOne = (transactionId) => ({
    type: DELETE_ONE,
    transactionId
})
const load = ({transactions}) => ({
    type: LOAD,
    transactions,
})

const load_one = (transaction) => ({
    type: LOAD_ONE,
    transaction
})

// export const displaytransaction = (id) => async (dispatch) => {
//     const res = await fetch(`/api/transactions`);
//     const data = await res.json();

//     if (data.errors) {
//         return;
//     }

//     dispatch(load_one(data));
// }

// export const getTransactions = (id) => async (dispatch) => {
//     const res = await fetch(`/api/transactions`);
//     const data = await res.json();

//     if (data.errors) {
//         return;
//     }

//     dispatch(load(data));
// }

export const createTransaction = (transaction) => async (dispatch) => {
    const res = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction)
    });

    const data = await res.json();

    if (data.errors) {
        return {'errors': data.errors};
    }

    dispatch(create(data));

    return data;
};

export const updatetransaction = (transaction) => async (dispatch) => {
    const response = await fetch("/api/transactions", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
    });

    const data = await response.json();

    if (data.errors) {
        return {'errors': data.errors};
    }

    dispatch(create(data));
    return {}
};

export const deletetransaction = (id, password) => async (dispatch) => {
    console.log(id, password, "-----")
    const res = await fetch(`/api/transactions/${id}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
    })
    const data = await res.json()
    if(data.errors) {
        return {'errors': data.errors}
    }
    dispatch(deleteOne(id))
    return {}
}

const initialState = {};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            let newState = { ...state };
            action.transactions.forEach((transaction) => {
                newState[transaction.id] = transaction;
            });
            return newState;
        }
        case ADD_ONE: {
            return {
                ...state,
                [action.transaction.id]: action.transaction,
            };
        }
        case LOAD_ONE: {
            return {
                ...state,
                [action.transaction.id]: action.transaction,
            }
        }
        case DELETE_ONE: {
            const newState = { ...state };
            delete newState[action.transactionId]
            return newState
        }
        default:
            return state;
    }
};

export default transactionReducer;
