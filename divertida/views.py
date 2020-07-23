from django.shortcuts import render, get_object_or_404
from .models import Card, Interactive, YEAR_GRADE

# Create your views here.
def home(request):
    choices = YEAR_GRADE
    return render(request, 'divertida/home.html', {'choices':choices})

def all(request):
    cards = Card.objects.all
    return render(request, 'divertida/allcards.html', {'cards':cards})
    
def grade(request, grade_index):
    cards = Card.objects.filter(grade=grade_index)
    text = YEAR_GRADE[grade_index-1][1]
    return render(request, 'divertida/allcards.html', {'cards':cards, 'index':grade_index, 'text':text})

def detail(request, card_id):
    card = get_object_or_404(Card, pk = card_id)
    return render(request, 'divertida/carddetail.html', {'card':card})