import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { createAccount, getAccounts } from "../../store/account"

const AccountForm = ({props}) => {
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const user_id = useSelector(state => state.session.user.id);
  const {setAccountDisplayId, setCreateAccount} = props;
  const dispatch = useDispatch();

  const create = async (e) => {
    e.preventDefault();
    const account = {
      name: accountName,
      amount,
      user_id
    }
    const data = await dispatch(createAccount(account));
    if (data.errors) {
      setErrors(data.errors);
    }
    else {
      setCreateAccount(false)
      // dispatch(getAccounts())
      setAccountDisplayId(data.id)
    }
  };

  const updateAccountName = (e) => {
    setAccountName(e.target.value);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <form onSubmit={create} className="accountForm">
      <div className="accountForm__div">
        <div>
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="Account Name">Account Name</label>
          <input
            name="account"
            type="text"
            placeholder=""
            value={accountName}
            onChange={updateAccountName}
            className="accountForm__accountName"
          />
        </div>
        <div>
          <label htmlFor="Balance">Balance</label>
          <input
            name="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={updateAmount}
            className="accountForm__accountBalance"
          />
        </div>
        <button type="submit" className="accountForm__create">Create</button>
      </div>
    </form>
  );
};

export default AccountForm;
