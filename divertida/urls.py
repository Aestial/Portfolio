from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='divertidamente'),
    path('all', views.all, name='card-all'),
    path('<int:card_id>/', views.detail, name='card-detail')
]