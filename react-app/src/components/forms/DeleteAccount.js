import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { getAccounts, deleteAccount } from "../../store/account"

const DeleteAccountForm = ({props}) => {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
//   const user_id = useSelector(state => state.session.user.id);
  const dispatch = useDispatch();
  const accountDisplayId = props.accountDisplayId
  const setDeleteAccount = props.setDeleteAccount

  const remove = async (e) => {
    e.preventDefault();
    const data = await dispatch(deleteAccount(accountDisplayId, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    else {
      setDeleteAccount(false)
      dispatch(getAccounts())
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={remove} className="deleteAccountForm">
      <div className="deleteAccountForm__div">
        <div>
          {errors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
        <div>
            If you are certain that you want to delete this bank account from your profile, enter your password below to confirm.
        </div>
        <div>
          <label htmlFor="Password"></label>
          <input
            name="password"
            type="text"
            placeholder="password"
            value={password}
            onChange={updatePassword}
            className="deleteAccountForm__password"
          />
        </div>
        <button type="submit" className="deleteAccountForm__delete">Delete</button>
      </div>
    </form>
  );
};

export default DeleteAccountForm;
