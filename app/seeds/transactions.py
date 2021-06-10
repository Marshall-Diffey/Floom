from ..models import db, Transaction


def seed_transactions():
    demo_account1_transaction1 = Transaction(
        description = "Paycheck",
        amount = 2200,
        account_id = 1,
        type_id = 1,
    )

    demo_account1_transaction2 = Transaction(
        description = "Rent",
        amount = 1100,
        account_id = 1,
        type_id = 5,
    )

    demo_account1_transaction3 = Transaction(
        description = "Bank transfer",
        amount = 1000,
        account_id = 1,
        type_id = 4,
    )

    demo_account1_transaction4 = Transaction(
        description = "Electricity",
        amount = 140,
        account_id = 1,
        type_id = 5,
    )

    demo_account2_transaction1 = Transaction(
        description = "Bank transfer",
        amount = 1000,
        account_id = 2,
        type_id = 3,
    )

    demo_account2_transaction2 = Transaction(
        description = "Clothes",
        amount = 212,
        account_id = 2,
        type_id = 5,
    )

    demo_account2_transaction3 = Transaction(
        description = "Withdraw",
        amount = 200,
        account_id = 2,
        type_id = 2,
    )

    demo_account2_transaction4 = Transaction(
        description = "TV Speaker",
        amount = 195,
        account_id = 2,
        type_id = 5,
    )

    db.session.add(demo_account1_transaction1)
    db.session.add(demo_account1_transaction2)
    db.session.add(demo_account1_transaction3)
    db.session.add(demo_account1_transaction4)
    db.session.add(demo_account2_transaction1)
    db.session.add(demo_account2_transaction2)
    db.session.add(demo_account2_transaction3)
    db.session.add(demo_account2_transaction4)
    db.session.commit()

def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
