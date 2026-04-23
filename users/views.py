from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import login, get_user_model
from django.contrib import messages
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Category
from .forms import LoginForm, CategoryForm, UserProfileForm, CustomUserCreationForm
from .serializers import UserRegisterSerializer

User = get_user_model()

RESET_TOKENS = {}

@api_view(['POST'])
def password_reset_api(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        user = User.objects.get(email=email)

        token = get_random_string(32)
        RESET_TOKENS[token] = user.id

        reset_link = f"http://localhost:5173/reset-password/{token}"

        send_mail(
            "Reset password",
            f"Click here: {reset_link}",
            "admin@test.com",  # Заміни на свій email
            [email],
            fail_silently=False,
        )

        return Response({"message": "Password reset email sent"}, status=200)

    except User.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=404)



class PasswordResetConfirmAPI(APIView):
    def post(self, request):
        token = request.data.get("token")
        password = request.data.get("password")

        if not token or not password:
            return Response({"error": "Token and password are required"}, status=400)

        user_id = RESET_TOKENS.get(token)

        if not user_id:
            return Response({"error": "Invalid token"}, status=400)

        user = User.objects.get(id=user_id)
        user.password = make_password(password)
        user.save()
        del RESET_TOKENS[token]

        return Response({"message": "Password updated successfully"}, status=200)

class ProfileAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        })


class UserRegisterAPI(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

@login_required
def profile_view(request):
    return render(request, 'users/profile.html', {'user': request.user})

@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = UserProfileForm(instance=request.user)
    return render(request, 'users/edit_profile.html', {'form': form})

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Реєстрація пройшла успішно!')
            return redirect('category_list')
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('category_list')
        else:
            messages.error(request, 'Неправильний логін або пароль')
    else:
        form = LoginForm()
    return render(request, 'users/login.html', {'form': form})

def create_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('category_list')
    else:
        form = CategoryForm()
    return render(request, 'users/create_category.html', {'form': form})

def category_list(request):
    categories = Category.objects.all()
    return render(request, 'users/category_list.html', {'categories': categories})

def edit_category(request, id):
    category = get_object_or_404(Category, id=id)
    if request.method == 'POST':
        form = CategoryForm(request.POST, request.FILES, instance=category)
        if form.is_valid():
            form.save()
            return redirect('category_list')
    else:
        form = CategoryForm(instance=category)
    return render(request, 'users/edit_category.html', {'form': form, 'category': category})

def delete_category(request, category_id):
    if request.method == 'POST':
        category = get_object_or_404(Category, id=category_id)
        category.delete()
    return redirect('category_list')