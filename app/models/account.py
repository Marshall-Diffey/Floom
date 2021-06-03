from .db import db


class Account(db.Model):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="accounts")
    transactions = db.relationship("Transaction", back_populates="account")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "user_id": self.user_id,
            "user": self.user.to_simple_dict(),
            "transactions": [
                transaction.to_simple_dict() for transaction in self.transactions],
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "user_id": self.user_id,
        }
