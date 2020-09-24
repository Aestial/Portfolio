from django.shortcuts import render, get_object_or_404
from .models import Product

# Create your views here.
def all(request):
    products = Product.objects.all    
    return render(request, 'products/all.html', {'products':products})

def detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'products/detail.html', {'product':product})

def privacy(request, slug):
    product = get_object_or_404(Product, slug=slug)
    return render(request, 'products/privacy.html', {'product':product})
    