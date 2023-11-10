from django.urls import path

from .views import register_view, login_view, authenticate_view

urlpatterns = [
    path("register/", register_view, name="register"),
    path("login/", login_view, name="login"),
    path("authenticate/", authenticate_view, name="authenticate")
]