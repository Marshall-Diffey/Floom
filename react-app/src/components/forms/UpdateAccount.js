import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAccount, getAccounts } from "../../store/account"

const UpdateAccountForm = ({props}) => {
  const [errors, setErrors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const { accountDisplay, setUpdateAccount } = props
  const dispatch = useDispatch();

  const update = async (e) => {
    e.preventDefault();
    const account = {
        id: accountDisplay.id,
        name: accountName,
        amount,
    }
    const data = await dispatch(updateAccount(account));
    if (data.errors) {
      setErrors(data.errors);
    }
    else {
      setUpdateAccount(false)
      dispatch(getAccounts())
    }
  };

  const updateAccountName = (e) => {
    setAccountName(e.target.value);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
      setAccountName(accountDisplay.name);
      setAmount(accountDisplay.amount);
  }, [])


  return (
    <form onSubmit={update} className="updateAccountForm">
      <div className="updateAccountForm__div">
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
            className="updateAccountForm__accountName"
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
            className="updateAccountForm__accountBalance"
          />
        </div>
        <button type="submit" className="updateAccountForm__submit">Update</button>
      </div>
    </form>
  );
};

export default UpdateAccountForm;
