import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTransaction} from "../../store/transaction"

const TransactionForm = ({ types, setCreateTransactionView, accountDisplayId }) => {
    const [errors, setErrors] = useState([]);
    const [amount, setAmount] = useState("");
    const [type_id, setType_id] = useState("");
    const [description, setDescription] = useState("");
    const user_id = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();

    const create = async (e) => {
        e.preventDefault();
        const transaction = {
            amount,
            account_id: accountDisplayId,
            type_id,
            description,
        }
        const data = await dispatch(createTransaction(transaction));
        if (data.errors) {
            setErrors(data.errors);
        }
        else {
            setCreateTransactionView(false)
            // dispatch(getAccounts())
            // setAccountDisplayId(data.id)
        }
    };


    const updateAmount = (e) => {
        setAmount(e.target.value);
    };

    const updateType_id = (e) => {
        setType_id(Number(e.target.value));
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    return (
        <form onSubmit={create} className="createTransactionForm">
            <div className="createTransactionForm__div">
                <div>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        name="amount"
                        type="number"
                        placeholder="0"
                        value={amount}
                        onChange={updateAmount}
                        className="createTransactionForm__amount"
                    />
                </div>
                <div>
                    <label htmlFor="Type">Type</label>
                    <select
                        // name="type"
                        // type="select"
                        // placeholder="..."
                        value={type_id}
                        onChange={updateType_id}
                        className="updateTransactionForm__type"
                    >
                        {types.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="Description">Description</label>
                    <input
                        name="description"
                        type="text"
                        placeholder="..."
                        value={description}
                        onChange={updateDescription}
                        className="updateTransactionForm__description"
                    />
                </div>
                {/* <button onClick={closeCreateTransaction} className="updateTransactionForm__cancel">Cancel</button> */}
                <button type="submit" className="creatTransactionForm__submit">Update</button>
            </div>
        </form>
    );
};

export default TransactionForm;
