"""add url, type, status columns to events

Revision ID: 03aeea35848b
Revises: 4fe6e08f415b
Create Date: 2025-07-20 10:39:36.892048

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '03aeea35848b'
down_revision: Union[str, Sequence[str], None] = '4fe6e08f415b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('events', sa.Column('url', sa.String(), nullable=True))
    op.add_column('events', sa.Column('type', sa.String(), nullable=True))
    op.add_column('events', sa.Column('status', sa.String(), nullable=True))

def downgrade() -> None:
    op.drop_column('events', 'status')
    op.drop_column('events', 'type')
    op.drop_column('events', 'url')
