from django.contrib import admin
from .models import TodoNote, Category
# Register your models here.
admin.site.register(Category)

@admin.register(TodoNote)
class TodoNoteAdmin(admin.ModelAdmin):
    list_display = ['user', 'category', 'title']
    prepopulated_fields = {'slug': ['title']}
    list_filter = ['user']