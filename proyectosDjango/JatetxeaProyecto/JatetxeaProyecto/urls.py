"""JatetxeaProyecto URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from jatetxea.views import index,janaria,kontaktua,saskia,banatzailea,redirect,register,user_login,user_logout,categoria, categoriaString

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="Index"),
    path('janaria/', janaria, name="Janaria"),
    path('kontaktua/', kontaktua, name="Kontaktua"),
    path('saskia/', saskia, name="Saskia"),
    path('banatzailea/', banatzailea, name="Banatzailea"),
    path('redirect/', redirect, name="Redirect"),
    path('register/', register, name="Register"),
    path('login/', user_login, name="Login"),
    path('logout/', user_logout, name="Logout"),
    path('categoria/<int:categoria_id>/', categoria, name="Categoria"),
    path('categoria/<str:categoria>/', categoriaString, name="Categoria"),

]
