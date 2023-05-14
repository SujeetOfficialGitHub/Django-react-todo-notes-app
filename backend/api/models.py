from typing import Iterable, Optional
from django.db import models
from accounts.models import User
from django.utils.text import slugify
import uuid

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self) -> str:
        return self.title
    
class TodoNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250, blank=True, null=True)
    slug = models.SlugField( unique=True, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.title
    
    def save(self, *args, **kwargs):
        id = uuid.uuid4()
        value = self.title[0:250]
        self.slug = slugify(value+str(id), allow_unicode=True)
        super().save(*args, **kwargs)