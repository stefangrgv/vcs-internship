from django.urls import path
from kodjalist import views

urlpatterns = [
    path('', views.index, name='index'),
]