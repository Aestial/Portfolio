from django.urls import path
from . import views

urlpatterns = [
    path('', views.all, name='products'),
    path('<slug:slug>/', views.detail, name='product'),
    path('<slug:slug>/privacy', views.privacy, name='product-priv')
]
