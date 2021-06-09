import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import AccountForm from './forms/Accounts'
import { getAccounts } from '../store/account';

const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: 0,
        // background: 'none',
        // height: '100%',
    }
}

Modal.setAppElement('body');


const Accounts = () => {
    const [accountView, setAccountView] = useState(false);
    // const [accounts, setAccounts] = useState([]);
    const [accountDisplayId, setAccountDisplayId] = useState(null);
    const [accountDisplay, setAccountDisplay] = useState({});
    const [createAccount, setCreateAccount] = useState(false);
    // const [editAccount, setEditAccount] = useState(false);
    const user = useSelector(state => state.session.user);
    const accounts = useSelector(state => Object.values(state.account))
    const dispatch = useDispatch();
    console.log(accountDisplay);

    const openCreateAccount = () => {
        setCreateAccount(true)
    }

    const closeCreateAccount = () => {
        setCreateAccount(false)
    }

    const accountsDisplay = () => {
        if (!accountView) {
            return setAccountView(true)
        }
        else {
            return setAccountView(false)
        }
    }

    useEffect(() => {
        // (async () => {
        //     const res = await fetch(`/api/accounts/${user.id}`);
        //     const data = await res.json();
        //     setAccounts(data.accounts)
        // }) ()
        dispatch(getAccounts())
    }, [accountView])

    useEffect(() => {
        if (accounts) {
            console.log(accounts)
            for(const i in accounts) {
                if(accounts[i].id === accountDisplayId) {
                    return setAccountDisplay(accounts[i]);
                }
            }
        }
    }, [accountDisplayId])

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
                <button key={account.id} value={account.id} onClick={e => setAccountDisplayId(e.target.value)}>
                    {account.name}
                    {/* <div>{account.amount}</div> */}
                </button>
            ))
            : null}
            {accountView?
                <div>
                    <button onClick={openCreateAccount}>+ Add Bank Account</button>
                    <Modal
                        isOpen={createAccount}
                        onRequestClose={closeCreateAccount}
                        style={customStyles}
                        id="loginModal"
                        // className="loginModal"
                    >
                        <AccountForm setCreateAccount={setCreateAccount}></AccountForm>
                    </Modal>
                </div>
            : null}
        </div>
    )
}

export default Accounts;
