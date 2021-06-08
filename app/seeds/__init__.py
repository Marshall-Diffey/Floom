from flask.cli import AppGroup
from .users import seed_users, undo_users
from .accounts import seed_accounts, undo_accounts
from .budgets import seed_budgets, undo_budgets
from .items import seed_items, undo_items
from .transactions import seed_transactions, undo_transactions
from .types import seed_types, undo_types

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_types()
    seed_accounts()
    seed_budgets()
    seed_items()
    seed_transactions()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_accounts()
    undo_budgets()
    undo_items()
    undo_transactions()
    undo_types()
    # Add other undo functions here
