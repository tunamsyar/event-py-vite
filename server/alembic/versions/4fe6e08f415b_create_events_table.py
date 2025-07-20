from alembic import op
import sqlalchemy as sa
import uuid
from sqlalchemy.dialects import postgresql
from sqlalchemy import inspect

# revision identifiers, used by Alembic.
revision = '4fe6e08f415b'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    bind = op.get_bind()
    inspector = inspect(bind)

    if 'events' not in inspector.get_table_names():
      op.create_table(
          'events',
          sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
          sa.Column('name', sa.String(), nullable=False),
          sa.Column('contact', sa.String(), nullable=False),
          sa.Column('venue', sa.String(), nullable=False),
          sa.Column('date', sa.DateTime(), nullable=False),
    )

def downgrade() -> None:
    op.drop_table('events')
