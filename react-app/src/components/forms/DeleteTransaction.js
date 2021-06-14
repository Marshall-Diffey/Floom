import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTransaction } from "../../store/transaction"
import { getAccounts } from "../../store/account"

const DeleteTransactionForm = ({setDeletingTransaction, deletingTransaction}) => {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const remove = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteTransaction(deletingTransaction, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    else {
      setDeletingTransaction(false)
      dispatch(getAccounts())
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={remove} className="deleteTransactionForm">
      <div className="deleteTransactionForm__div">
        <div>
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
        <div>
            If you are certain that you want to delete this transaction from your account, enter your password below to confirm.
        </div>
        <div>
          <label htmlFor="Password"></label>
          <input
            name="password"
            type="text"
            placeholder="password"
            value={password}
            onChange={updatePassword}
            className="deleteTransactionForm__password"
          />
        </div>
        <button type="submit" className="deleteTransactionForm__delete">Delete</button>
      </div>
    </form>
  );
};

export default DeleteTransactionForm;
