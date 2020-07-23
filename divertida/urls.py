from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='divertidamente'),
    path('all', views.all, name='allcards'),    
    path('<int:grade_index>/', views.grade, name='grade-cards'),
    path('card/<int:card_id>/', views.detail, name='card-detail'),
]