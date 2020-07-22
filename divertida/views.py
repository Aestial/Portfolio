from django.shortcuts import render, get_object_or_404
from .models import Card, Interactive

# Create your views here.
def home(request):
    return render(request, 'divertida/home.html')

def all(request):
    cards = Card.objects.all
    return render(request, 'divertida/all.html', {'cards':cards})

def detail(request, card_id):
    card = get_object_or_404(Card, pk = card_id)
    return render(request, 'divertida/detail.html', {'card':card})