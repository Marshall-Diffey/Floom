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

    db.session.add(type1)
    db.session.add(type2)
    db.session.add(type3)
    db.session.add(type4)
    db.session.add(type5)
    db.session.commit()

def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
