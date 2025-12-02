# app/schemas.py
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict


# ---------- User Schemas ----------

class UserBase(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    mobile_number: Optional[str] = None
    account_type: Optional[str] = None  # 'personal', 'student', 'teacher', 'admin'


class UserCreate(UserBase):
    password: str = Field(min_length=6, description="User password (will be hashed)")


class UserRead(UserBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ---------- Auth Schemas ----------

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[UUID] = None


# ---------- Course Schemas ----------

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None


class CourseCreate(CourseBase):
    pass


class CourseRead(CourseBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CoursesList(BaseModel):
    courses: List[CourseRead]


# ---------- Task Schemas ----------

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    course_id: Optional[UUID] = None
    due_at: Optional[datetime] = None
    estimated_minutes: Optional[int] = None
    priority: int = 0  # higher = more important


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    course_id: Optional[UUID] = None
    due_at: Optional[datetime] = None
    estimated_minutes: Optional[int] = None
    priority: Optional[int] = None
    status: Optional[str] = None  # 'pending', 'in_progress', 'completed', 'cancelled'


class TaskRead(TaskBase):
    id: UUID
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskList(BaseModel):
    tasks: List[TaskRead]


# ---------- Task Session Schemas ----------

class TaskSessionBase(BaseModel):
    start_at: datetime
    end_at: datetime
    source: Optional[str] = "manual"   # 'manual' or 'ai'
    status: Optional[str] = "planned"  # 'planned', 'completed', 'skipped'


class TaskSessionCreate(TaskSessionBase):
    pass


class TaskSessionRead(TaskSessionBase):
    id: UUID
    task_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskSessionList(BaseModel):
    sessions: List[TaskSessionRead]


# ---------- Institution Schemas ----------

class InstitutionBase(BaseModel):
    name: str
    code: Optional[str] = None


class InstitutionCreate(InstitutionBase):
    pass


class InstitutionRead(InstitutionBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class InstitutionUserRead(BaseModel):
    id: UUID
    role: str
    created_at: datetime
    institution: InstitutionRead

    model_config = ConfigDict(from_attributes=True)


class InstitutionMemberships(BaseModel):
    memberships: List[InstitutionUserRead]