from ..models import db, Type


def seed_types():
    type1 = Type(
        name = "Deposit"
    )

    type2 = Type(
        name = "Withdrawal"
    )

    type3 = Type(
        name = "Incoming Transfer"
    )

    type4 = Type(
        name = "Outgoing Transfer"
    )

    type5 = Type(
        name = "Payment"
    )
