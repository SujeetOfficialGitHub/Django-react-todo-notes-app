from django.urls import path, include
from .views import TodoNoteView
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('todonotes/',TodoNoteView.as_view() ),
    path('todonotes/<slug:slug>/',TodoNoteView.as_view() ),
]
