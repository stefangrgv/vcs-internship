from django.shortcuts import render, redirect
from .models import Room
from .forms import RoomForm


# Create your views here.
def home(request):
    context = {'rooms': Room.objects.all()}
    return render(request, 'home.html', context)

def room(request, name):
    r = Room.objects.get(name=name)
    return render(request, 'room.html', {'room': r})

def create_room(request):
    form = RoomForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            return redirect('home')

    context = {'form': form}
    return render(request, 'room_form.html', context)

def update_room(request, pk):
    room = Room.objects.get(id=pk)
    form = RoomForm(instance=room)
    if request.method == 'POST':
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('home')
    
    context = {'form': form}
    return render(request, 'room_form.html', context)

def delete_room(request, pk):
    room = Room.objects.get(id=pk)
    if request.method == 'POST':
        room.delete()
        return redirect('home')
        
    return render(request, 'delete.html', {'obj': room})