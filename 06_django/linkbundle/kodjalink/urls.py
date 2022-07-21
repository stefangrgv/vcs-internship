from django.urls import path
from . import views

urlpatterns = [
    path('links/', views.LinkListView.as_view(), name='linklist_view'),
    path('users/', views.UserView.as_view(), name='user_view'),
]