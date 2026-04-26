import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'created_at', 'updated_at', 'image']
        read_only_fields = ['id', 'created_at', 'updated_at']
User = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'password', 'password2', 'avatar']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email вже використовується")
        return value

    def validate_phone(self, value):
        if value and not re.match(r'^\+?\d{10,15}$', value):
            raise serializers.ValidationError("Невірний формат телефону")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Пароль має бути мінімум 8 символів")

        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Пароль має містити велику літеру")

        if not re.search(r'[0-9]', value):
            raise serializers.ValidationError("Пароль має містити цифру")

        if not re.search(r'[@$!%*?&]', value):
            raise serializers.ValidationError("Пароль має містити спецсимвол")

        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Паролі не співпадають"
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        password = validated_data.pop('password')

        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        return user