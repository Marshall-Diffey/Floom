from flask import Blueprint, jsonify, request, session
from flask_login import current_user
from app.models import db, User, Account, Transaction
from app.forms import TransactionForm
from werkzeug.security import check_password_hash

transaction_routes = Blueprint('transactions', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

# @transaction_routes.route('')
# def get_transactions():
#     transactions = current_user.transactions
#     # transactions = transaction.query.filter_by(user_id = id).all()
#     print('------------')
#     print(transactions)
#     # return {'transactions': transactionList}
#     return {'transactions': [
#         transaction.to_dict() for transaction in transactions
#     ]}

@transaction_routes.route('', methods=['POST'])
def create_transaction():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    account = Account.query.get(int(form.data['account_id']))

    if form.validate_on_submit() and current_user.id == account.user_id:
        transaction = Transaction(
            description = form.data['description'],
            amount = form.data['amount'],
            account_id = form.data['account_id'],
            type_id = form.data['type_id'],
        )
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}

@transaction_routes.route('/<int:id>', methods=['POST'])
def delete_transaction(id):
    password = request.json
    check = check_password_hash(current_user.hashed_password, password)
    if(check):
        transaction = transaction.query.get(id)
        db.session.delete(transaction)
        db.session.commit()
        return {}
    # form['csrf_token'].data = request.cookies['csrf_token']

    return {'errors': ['The provided password did not match']}

@transaction_routes.route('', methods=['PUT'])
def update_transaction():
    form = UpdateTransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.json
    transaction = transaction.query.get(int(data['id']))
    print(transaction)
    if form.validate_on_submit() and transaction.user_id == current_user.id:
        transaction.name = form.data['name']
        transaction.amount = form.data['amount']
        transaction.user_id = current_user.id
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    # print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}
