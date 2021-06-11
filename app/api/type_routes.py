from flask import Blueprint, jsonify, request, session
from app.models import db, Type

type_routes = Blueprint('types', __name__)


@type_routes.route('')
def get_types():
    types = Type.query.all()
    # accounts = Account.query.filter_by(user_id = id).all()
    return {'types': [
        type.to_simple_dict() for type in types
    ]}
