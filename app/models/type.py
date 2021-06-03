from .db import db


class Type(db.Model):
    __tablename__ = "types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    transactions = db.relationship("Transaction", back_populates="type")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "transactions": [
                transaction.to_simple_dict() for transaction in self.transactions],
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
