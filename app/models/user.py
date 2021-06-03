from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    accounts = db.relationship("Account", back_populates="user")
    budgets = db.relationship("Budget", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "accounts": [
                account.to_simple_dict() for account in self.accounts],
            "budgets": [
                budget.to_simple_dict() for budget in self.budgets],
        }

    def to_simple_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }
