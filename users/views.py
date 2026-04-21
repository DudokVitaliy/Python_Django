from django.shortcuts import render, redirect
from .models import Category
from django.shortcuts import get_object_or_404

def register(request):
    return render(request, 'users/register.html')


def create_category(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        is_active = request.POST.get('is_active') == 'on'
        image = request.FILES.get('image')

        Category.objects.create(
            name=name,
            description=description,
            is_active=is_active,
            image=image
        )

        return redirect('/categories/')

    return render(request, 'users/create_category.html')


def category_list(request):
    categories = Category.objects.all()
    return render(request, 'users/category_list.html', {
        'categories': categories
    })

def delete_category(request, category_id):
    if request.method == 'POST':
        category = get_object_or_404(Category, id=category_id)
        category.delete()
    return redirect('category_list')