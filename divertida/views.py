from django.shortcuts import render, get_object_or_404
# from .models import Book, Card, Interactive, YEAR_GRADE

# Create your views here.
def home(request):
    # books = Book.objects.all
    return render(request, 'divertida/home.html')

# def all(request):
#     cards = Card.objects.all
#     return render(request, 'divertida/allcards.html', {'cards':cards})
    
# def book(request, book_title):
#     book = get_object_or_404(Book, title = book_title)
#     cards = Card.objects.filter(book__title=book.title)
#     return render(request, 'divertida/allcards.html', {'book':book, 'cards':cards})

# def detail(request, card_id):
#     card = get_object_or_404(Card, pk = card_id)
#     return render(request, 'divertida/carddetail.html', {'card':card})