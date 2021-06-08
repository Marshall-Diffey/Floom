from flask import Blueprint, jsonify, request, session
from app.models import db, User, Account, Transaction

account_routes = Blueprint('accounts', __name__)


@account_routes.route('/<int:id>')
def get_accounts(id):
    accounts = Account.query.filter_by(user_id = id).all()
    print('------------')
    print(accounts)
    # return {'accounts': accountList}
    return {'accounts': [
        account.to_simple_dict() for account in accounts
    ]}
