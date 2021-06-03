from .db import db


class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey("budgets.id"))

    budget = db.relationship("Budget", back_populates="items")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "budget_id": self.budget_id,
            "budget": self.budget.to_simple_dict(),
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "budget_id": self.budget_id,
        }
