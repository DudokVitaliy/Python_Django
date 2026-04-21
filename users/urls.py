from django.urls import path
from .views import register, create_category, category_list

urlpatterns = [
    path('', register, name='register'),
    path('create-category/', create_category, name='create_category'),
    path('categories/', category_list, name='category_list'),
]