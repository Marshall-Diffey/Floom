from .db import db


class Budget(db.Model):
    __tablename__ = 'budgets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="budgets")
    items = db.relationship("Item", back_populates="budget")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "amount": self.amount,
            "user_id": self.user_id,
            "user": self.user.to_simple_dict(),
            "items": [
                item.to_simple_dict() for item in self.items],
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "amount": self.amount,
            "user_id": self.user_id,
        }
