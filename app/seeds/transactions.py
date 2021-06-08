from ..models import db, Transaction


def seed_transactions():
    demo_account1_transaction1 = Transaction(
        name = "Paycheck",
        description = "Biweekly funds received from job",
        amount = 2200,
        account_id = 1,
        type_id = 1,
    )

    demo_account1_transaction2 = Transaction(
        name = "Rent",
        description = "Monthly apartment expense",
        amount = 1100,
        account_id = 1,
        type_id = 5,
    )

    demo_account1_transaction3 = Transaction(
        name = "Bank transfer",
        description = "Money transfer from this account to Citigroup account",
        amount = 1000,
        account_id = 1,
        type_id = 4,
    )

    demo_account1_transaction4 = Transaction(
        name = "Electricity",
        description = "Monthly electric bill",
        amount = 140,
        account_id = 1,
        type_id = 5,
    )

    demo_account2_transaction1 = Transaction(
        name = "Bank transfer",
        description = "Money transfer from Wells Fargo account to this account",
        amount = 1000,
        account_id = 2,
        type_id = 3,
    )

    demo_account2_transaction2 = Transaction(
        name = "Clothes",
        description = "Shirts and shoes from local store",
        amount = 212,
        account_id = 2,
        type_id = 5,
    )

    demo_account2_transaction3 = Transaction(
        name = "Withdraw",
        description = "Keeping some cash with me",
        amount = 200,
        account_id = 2,
        type_id = 2,
    )

    demo_account2_transaction4 = Transaction(
        name = "TV Speaker",
        description = "Money spent buying new soundbar for television",
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
