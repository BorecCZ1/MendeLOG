from typing import Literal, Optional
from datetime import datetime

from pydantic import BaseModel


class SuspiciousActivity(BaseModel):
    name: str
    level: Literal["warning", "error"]
    timestamp: datetime
    description: Optional[str] = None
    solved: bool = False
