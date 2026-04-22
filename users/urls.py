from django.urls import path
from django.contrib.auth import views as auth_views
from .views import register, create_category, category_list, delete_category, edit_category, login_view

urlpatterns = [
    path('', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),

    path('create-category/', create_category, name='create_category'),
    path('categories/', category_list, name='category_list'),
    path('delete-category/<int:category_id>/', delete_category, name='delete_category'),
    path('category/<int:id>/edit/', edit_category, name='edit_category'),

    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'), name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_done.html'), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'), name='password_reset_confirm'),
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'), name='password_reset_complete'),
]