from flask import Blueprint, jsonify, request, session
from flask_login import current_user
from app.models import db, User, Account, Transaction
from app.forms import AccountForm

account_routes = Blueprint('accounts', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@account_routes.route('')
def get_accounts():
    accounts = current_user.accounts
    # accounts = Account.query.filter_by(user_id = id).all()
    print('------------')
    print(accounts)
    # return {'accounts': accountList}
    return {'accounts': [
        account.to_simple_dict() for account in accounts
    ]}

@account_routes.route('', methods=['POST'])
def create_account():
    form = AccountForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        account = Account(
            name = form.data['name'],
            amount = form.data['amount'],
            user_id = form.data['user_id'],
        )
        db.session.add(account)
        db.session.commit()
        return account.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}
