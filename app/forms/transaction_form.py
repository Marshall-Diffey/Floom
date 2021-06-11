from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
    amount = StringField('amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    account_id = IntegerField('account_id', validators=[DataRequired()])
    type_id = IntegerField('type_id', validators=[DataRequired()])
