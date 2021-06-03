from ..models import db, Budget


def seed_budgets():
    demo_budget1 = Budget(
        name = "Healthcare",
        description = "Funds spent on doctor, dentist, optometrist, and medicine",
        amount = 1000,
        user_id = 1,
    )

    demo_budget2 = Budget(
        name = "Food",
        description = "Funds spent on groceries and restaurant visits",
        amount = 600,
        user_id = 1,
    )

    demo_budget3 = Budget(
        name = "Entertainment",
        description = "Funds spent on games, movies, and television subscriptions",
        amount = 175,
        user_id = 1,
    )
