from django.shortcuts import render
from .models import Room

# Create your views here.
def home(request):
    context = {'rooms': Room.objects.all()}
    return render(request, 'home.html', context)

def room(request, name):
    r = Room.objects.get(name=name)
    return render(request, 'room.html', {'room': r})

def create_room(request):
    context = {}
    return render(request, 'room_form.html', context)