from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='divertidamente'),
    # path('all', views.all, name='allcards'),    
    # path('<str:book_title>/', views.book, name='bookcards'),
    # path('card/<int:card_id>/', views.detail, name='carddetail'),
]