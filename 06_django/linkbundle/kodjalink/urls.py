from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.LinkListView.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetails.as_view()),
]