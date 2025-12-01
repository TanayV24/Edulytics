# app/schemas.py
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# ---------- User Schemas ----------

class UserBase(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    mobile_number: Optional[str] = None


class UserCreate(UserBase):
    password: str = Field(min_length=6, description="User password (will be hashed)")


class UserRead(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True


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

    class Config:
        orm_mode = True


class CoursesList(BaseModel):
    courses: List[CourseRead]
