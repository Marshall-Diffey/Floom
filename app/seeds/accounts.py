from ..models import db, Account


def seed_accounts():
    demo_account1 = Account(
        name = "Wells Fargo",
        amount = 16500,
        user_id = 1,
    )

    demo_account2 = Account(
        name = "Citigroup",
        amount = 7000,
        user_id = 1,
    )

    db.session.add(demo_account1)
    db.session.add(demo_account2)
    db.session.commit()

def undo_accounts():
    db.session.execute('TRUNCATE accounts RESTART IDENTITY CASCADE;')
    db.session.commit()
