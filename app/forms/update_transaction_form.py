from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UpdateTransactionForm(FlaskForm):
    amount = StringField('amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    type_id = IntegerField('type_id', validators=[DataRequired()])
