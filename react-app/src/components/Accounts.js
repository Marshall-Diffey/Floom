import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Accounts = () => {
    const [accountView, setAccountView] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const user = useSelector(state => state.session.user);

    const accountsDisplay = () => {
        if (!accountView) {
            return setAccountView(true)
        }
        else {
            return setAccountView(false)
        }
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/accounts/${user.id}`);
            const data = await res.json();
            setAccounts(data.accounts)
        }) ()
    }, [accountView])

    return (
        <div className="profilePage__accounts">
            <span>Bank Accounts</span>
            <button
                type="button"
                className="profilePage__accounts--show"
                onClick={accountsDisplay}
            >
            {accountView ? "Close" : "View"}
            </button>
            {accountView? accounts.map((account) => (
                <div key={account.id}>
                    {account.name}
                    {/* <div>{account.amount}</div> */}
                </div>
            ))
            : null}
            {accountView?
                <div>
                    <button>+ Add Bank Account</button>
                </div>
            : null}
        </div>
    )
}

export default Accounts;
