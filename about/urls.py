from django.urls import path
from . import views

urlpatterns = [
    path('', views.about, name='about'),
    path('pdf', views.generate_pdf, name='about_pdf'),
]