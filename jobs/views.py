from django.shortcuts import render, get_object_or_404
from .models import Job
from products.models import Product

# Create your views here.
def home(request):
    jobs = Job.objects.all
    products = Product.objects.all
    return render(request, 'jobs/home.html', {'jobs':jobs, 'products':products})

def detail(request, job_id):
    job = get_object_or_404(Job, pk=job_id)
    return render(request, 'jobs/detail.html', {'job':job})
    