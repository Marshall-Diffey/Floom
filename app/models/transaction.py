from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"))
    type_id = db.Column(db.Integer, db.ForeignKey("types.id"))

    account = db.relationship("Account", back_populates="transactions")
    type = db.relationship("Type", back_populates="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "account_id": self.account_id,
            "type_id": self.type_id,
            "account": self.account.to_simple_dict(),
            "type": self.type.to_simple_dict(),
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "account_id": self.account_id,
            "type_id": self.type_id,
            "type": self.type.to_simple_dict(),
        }
