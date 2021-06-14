import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../store/transaction"
import { getAccounts } from "../../store/account"

const UpdateTransactionForm = ({ id, closeUpdateTransaction, types, accountDisplayId }) => {
  const [errors, setErrors] = useState([]);
  const [amount, setAmount] = useState("");
  const [type_id, setType_id] = useState("");
  const [description, setDescription] = useState("");
  const accounts = useSelector(state => Object.values(state.account))
  const dispatch = useDispatch();

  const update = async (e) => {
    e.preventDefault();
    const transaction = {
        id,
        amount,
        description,
        type_id
    }
    const data = await dispatch(updateTransaction(transaction));
    if (data.errors) {
      setErrors(data.errors);
    }
    else {
      closeUpdateTransaction()
      dispatch(getAccounts())
    }
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const updateType_id = (e) => {
    setType_id(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    console.log(typeof(accountDisplayId))
    for (const account of accounts) {
      if (account.id === Number(accountDisplayId)) {
        for (const transaction of account.transactions) {
          if (transaction.id === id) {
            setAmount(transaction.amount);
            setType_id(transaction.type_id);
            setDescription(transaction.description);
          }
        }
      }
    }
  }, [])


  return (
    <form onSubmit={update} className="updateTransactionForm">
      <div className="updateTransactionForm__div">
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
            className="updateTransactionForm__amount"
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
        <button onClick={closeUpdateTransaction} className="updateTransactionForm__cancel">Cancel</button>
        <button type="submit" className="updateTransactionForm__submit">Update</button>
      </div>
    </form>
  );
};

export default UpdateTransactionForm;
