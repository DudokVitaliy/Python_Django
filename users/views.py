from django.shortcuts import render, redirect
from .forms import CategoryForm
from .models import Category

def register(request):
    return render(request, 'users/register.html')
def create_category(request):
    form = CategoryForm()

    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')

    return render(request, 'users/create_category.html', {'form': form})

def category_list(request):
    categories = Category.objects.all()
    return render(request, 'users/category_list.html', {'categories': categories})