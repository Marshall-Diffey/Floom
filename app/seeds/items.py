from ..models import db, Item


def seed_items():
    demo_budget1_item1 = Item(
        name = "Medicine from pharmacy",
        amount = 200,
        budget_id = 1,
    )

    demo_budget1_item2 = Item(
        name = "Check up with doctor",
        amount = 20,
        budget_id = 1,
    )

    demo_budget1_item3 = Item(
        name = "Insurance",
        amount = 450,
        budget_id = 1,
    )

    demo_budget1_item4 = Item(
        name = "New glasses",
        amount = 65,
        budget_id = 1,
    )

    demo_budget2_item1 = Budget(
        name = "Grocery run",
        amount = 150,
        budget_id = 2,
    )

    demo_budget2_item2 = Budget(
        name = "Second grocery run",
        amount = 175,
        budget_id = 2,
    )

    demo_budget2_item3 = Budget(
        name = "Restaurant",
        amount = 25,
        budget_id = 2,
    )

    demo_budget2_item4 = Budget(
        name = "Ice cream",
        amount = 10,
        budget_id = 2,
    )

    demo_budget3_item1 = Budget(
        name = "Netflix",
        amount = 14,
        budget_id = 3,
    )

    demo_budget3_item2 = Budget(
        name = "Hulu with live TV",
        amount = 65,
        budget_id = 3,
    )

    demo_budget3_item3 = Budget(
        name = "Battlefield 6 video game",
        amount = 60,
        budget_id = 3,
    )

    demo_budget3_item4 = Budget(
        name = "Steam wallet deposit",
        amount = 20,
        budget_id = 3,
    )
