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
