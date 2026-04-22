from django.urls import path
from .views import register, create_category, category_list, delete_category, edit_category

urlpatterns = [
    path('', register, name='register'),
    path('create-category/', create_category, name='create_category'),
    path('categories/', category_list, name='category_list'),
    path('delete-category/<int:category_id>/', delete_category, name='delete_category'),
    path('category/<int:id>/edit/', edit_category, name='edit_category'),
]