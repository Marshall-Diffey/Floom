import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import AccountForm from './forms/Accounts';
import DeleteAccountForm from './forms/DeleteAccount';
import UpdateAccountForm from './forms/UpdateAccount';
import Transactions from './Transactions';
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
    const [accountDisplayId, setAccountDisplayId] = useState(null);
    const [accountDisplay, setAccountDisplay] = useState(null);
    const [createAccount, setCreateAccount] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [updateAccount, setUpdateAccount] = useState(false);
    // const [editAccount, setEditAccount] = useState(false);
    const [transactions, setTransactions] = useState(null);
    const user = useSelector(state => state.session.user);
    const accounts = useSelector(state => Object.values(state.account))
    const dispatch = useDispatch();
    console.log(accounts)
    console.log(transactions)
    const formatNumber = (num) => {
        const value = num.toString();
        let count = 1;
        let result = [];
        for (let i = value.length - 1; i >= 0; i--) {
            result.unshift(value[i]);
            if (i === 0) {
                continue;
            }
            if (count === 3) {
                result.unshift(",");
                count = 0;
            }
            count++;
        }
        return result.join("");
    };

    const openCreateAccount = () => {
        setCreateAccount(true)
    }

    const closeCreateAccount = () => {
        setCreateAccount(false)
    }

    const openDeleteAccount = () => {
        setDeleteAccount(true)
    }

    const closeDeleteAccount = () => {
        setDeleteAccount(false)
    }

    const openUpdateAccount = () => {
        setUpdateAccount(true)
    }

    const closeUpdateAccount = () => {
        setUpdateAccount(false)
    }

    const showAccounts = () => {
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
            // console.log(accounts)
            for(const i in accounts) {
                // console.log(accounts[i])
                // console.log(typeof(accountDisplayId))
                // console.log(typeof(accounts[i].id))
                if(accounts[i].id === Number(accountDisplayId)) {
                    // console.log(accounts[i])
                    setAccountDisplay(accounts[i]);
                    setTransactions(accounts[i].transactions)
                }
            }
        }
    }, [accountDisplayId, accounts])

    return (
        <>
            <div className="profilePage__accounts">
                <span>Bank Accounts</span>
                <button
                    type="button"
                    className="profilePage__accounts--show"
                    onClick={showAccounts}
                >
                {accountView ? "Close" : "View"}
                </button>
                {accountView && accounts? accounts.map((account) => (
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
                            <AccountForm props={{setCreateAccount, setAccountDisplayId}}></AccountForm>
                        </Modal>
                    </div>
                : null}
            </div>
            <div>
                {accountDisplay?
                    <>
                        <span>
                            {accountDisplay.name}
                        </span>
                        <span>
                            <div>
                                CURRENT BALANCE
                            </div>
                            <div>
                                ${formatNumber(accountDisplay.amount)}
                            </div>
                        </span>
                        <span>
                            <button onClick={openUpdateAccount}>
                                Update Account
                            </button>
                            <Modal
                                isOpen={updateAccount}
                                onRequestClose={closeUpdateAccount}
                                style={customStyles}
                                id="loginModal"
                                // className="loginModal"
                            >
                                <UpdateAccountForm props={{setUpdateAccount, accountDisplay}}></UpdateAccountForm>
                            </Modal>
                        </span>
                        <span>
                            <button onClick={openDeleteAccount}>
                                Delete Account
                            </button>
                            <Modal
                                isOpen={deleteAccount}
                                onRequestClose={closeDeleteAccount}
                                style={customStyles}
                                id="loginModal"
                                // className="loginModal"
                            >
                                <DeleteAccountForm
                                    setAccountDisplay={setAccountDisplay} setAccountDisplayId={setAccountDisplayId} props={{setDeleteAccount, accountDisplayId}}
                                >
                                </DeleteAccountForm>
                            </Modal>
                        </span>
                        <Transactions formatNumber={formatNumber} transactions={transactions} accountDisplayId={accountDisplayId}></Transactions>
                    </>
                : null}
            </div>
        </>
    )
}

export default Accounts;
