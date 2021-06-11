import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import Modal from 'react-modal';
import { getAccounts } from '../store/account';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateTransactionForm from './forms/UpdateTransaction'
import TransactionForm from './forms/Transaction';

// const customStyles = {
//     content : {
//         top                   : '30%',
//         left                  : '50%',
//         right                 : 'auto',
//         bottom                : 'auto',
//         marginRight           : '-50%',
//         transform             : 'translate(-50%, -50%)',
//         padding: 0,
//         // background: 'none',
//         // height: '100%',
//     }
// }

// Modal.setAppElement('body');


const Transactions = ({formatNumber, transactions, accountDisplayId}) => {
    // const [accountView, setAccountView] = useState(false);
    // const [accounts, setAccounts] = useState([]);
    // const [transactionDisplayId, setTransactionDisplayId] = useState(null);
    // const [transactionDisplay, setTransactionDisplay] = useState(null);
    const [createTransactionView, setCreateTransactionView] = useState(false);
    // const [createTransaction, setCreateTransaction] = useState(false);
    const [deleteTransaction, setDeleteTransaction] = useState(false);
    const [updateTransaction, setUpdateTransaction] = useState(false);
    // const [showUpdateTransaction, setShowUpdateTransaction] = useState(false);
    const [types, setTypes] = useState([])
    // const [editAccount, setEditAccount] = useState(false);
    // const user = useSelector(state => state.session.user);
    // const accounts = useSelector(state => Object.values(state.account))
    const dispatch = useDispatch();

    // const openCreateTransaction = () => {
    //     setCreateTransaction(true)
    // }

    // const closeCreateTransaction = () => {
    //     setCreateTransaction(false)
    // }

    const openDeleteTransaction = () => {
        setDeleteTransaction(true)
    }

    const closeDeleteTransaction = () => {
        setDeleteTransaction(false)
    }

    const openUpdateTransaction = (e) => {
        if(e.target.id) {
            setUpdateTransaction(Number(e.target.parentElement.value))
        }
        else {
            setUpdateTransaction(Number(e.target.parentElement.parentElement.value))
        }
    }

    const closeUpdateTransaction = () => {
        setUpdateTransaction(false)
    }

    const showCreateTransaction = () => {
        if (createTransactionView) {
            return setCreateTransactionView(false)
        }
        else {
            return setCreateTransactionView(true)
        }
    }

    // useEffect(() => {
    //     // (async () => {
    //     //     const res = await fetch(`/api/accounts/${user.id}`);
    //     //     const data = await res.json();
    //     //     setAccounts(data.accounts)
    //     // }) ()
    //     dispatch(getAccounts())
    // }, [accountView])

    // useEffect(() => {
    //     if (accounts) {
    //         // console.log(accounts)
    //         for(const i in accounts) {
    //             // console.log(accounts[i])
    //             // console.log(typeof(accountDisplayId))
    //             // console.log(typeof(accounts[i].id))
    //             if(accounts[i].id === Number(accountDisplayId)) {
    //                 // console.log(accounts[i])
    //                 setAccountDisplay(accounts[i]);
    //             }
    //         }
    //     }
    // }, [accountDisplayId, accounts])

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/types');
            const data = await res.json();
            setTypes(data.types);
        })()
    }, [])

    return (
        <>
        <div>
            <div>
                <span>
                    Add Transaction
                </span>
                <button
                    type="button"
                    className="profilePage__accounts--show"
                    onClick={showCreateTransaction}
                >
                {createTransactionView ? "Cancel" : "Add"}
                </button>
            </div>
            {createTransactionView ?
                <div>
                    <TransactionForm
                        types={types} setCreateTransactionView={setCreateTransactionView} accountDisplayId={accountDisplayId}
                    >
                    </TransactionForm>
                </div>
            : null}
        </div>
        <div className="transactions">
            <div className="transactionsHeader">
                <span className="transactionsHeader__title">
                    Transactions
                </span>
            </div>
            <div className="transactionsBody">
                <div>
                    <span>
                        Amount
                    </span>
                    <span>
                        Type
                    </span>
                    <span>
                        Description
                    </span>
                    <span>
                    </span>
                </div>
                {transactions? transactions.map(transaction => (
                        (Number(updateTransaction) === transaction.id) ?
                            <div key={transaction.id}>
                                <UpdateTransactionForm
                                id={transaction.id}
                                closeUpdateTransaction={closeUpdateTransaction}
                                types={types}
                                ></UpdateTransactionForm>
                            </div> :
                            <div key={transaction.id}>
                                <span>
                                    ${formatNumber(transaction.amount)}
                                </span>
                                <span>
                                    {transaction.type.name}
                                </span>
                                <span>
                                    {transaction.description}
                                </span>
                                <span>
                                    <button value={transaction.id} onClick={openUpdateTransaction} className="editTransactionButton">
                                        <EditIcon id="editIcon"></EditIcon>
                                    </button>
                                    <button value={transaction.id} onClick={openDeleteTransaction} className="deleteTransactionButton">
                                        <DeleteForeverIcon id="deleteIcon"></DeleteForeverIcon>
                                    </button>
                                </span>
                            </div>
                    ))
                : null}
            </div>
        </div>
        </>
    )
}

export default Transactions;
