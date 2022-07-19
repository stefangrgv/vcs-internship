from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('kl/<int:pk>/', views.kl, name='kl'),
]