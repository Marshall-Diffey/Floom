const LOAD = "account/LOAD";
const ADD_ONE = "account/ADD_ONE";
const LOAD_ONE = "account/LOAD_ONE";

const load = ({accounts}) => ({
    type: LOAD,
    accounts,
})

const create = (account) => ({
    type: ADD_ONE,
    account,
})

const load_one = (account) => ({
    type: LOAD_ONE,
    account
})

export const getAccounts = (id) => async (dispatch) => {
    const res = await fetch(`/api/accounts`);
    const data = await res.json();
    console.log(data, "-------------------------------");

    if (data.errors) {
        return;
    }

    dispatch(load(data));
}

export const createAccount = (account) => async (dispatch) => {
    const res = await fetch(`/api/accounts`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(account)
    });

    const data = await res.json();

    if (data.errors) {
        return {'errors': data.errors};
    }

    dispatch(create(data));

    return {};
};

export const updateAccount = (account) => async (dispatch) => {
    const response = await fetch("/api/accounts", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
    });

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(create(data));
};

export const deleteAccount = (id) => async () => {
    await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        }
    })
}

const initialState = {};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            let newState = { ...state };
            action.accounts.forEach((account) => {
                newState[account.id] = account;
            });
            return newState;
        }
        case ADD_ONE: {
            return {
                ...state,
                [action.account.id]: action.account,
            };
        }
        case LOAD_ONE: {
            return {
                ...state,
                [action.account.id]: action.account,
            }
        }
        default:
            return state;
    }
};

export default accountReducer;
