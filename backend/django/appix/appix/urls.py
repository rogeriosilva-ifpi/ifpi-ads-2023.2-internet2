from django.contrib import admin
from django.urls import path
from vendas.views import hello

urlpatterns = [
    path('hello', hello),
    path('admin/', admin.site.urls),
]
