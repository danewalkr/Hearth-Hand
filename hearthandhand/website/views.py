# Create your views here.

from django.shortcuts import render, redirect
from django.shortcuts import render


def home(request):
    # pass any context your templates need, e.g. an about list
    return render(request, 'website/home.html')


def portfolio(request):
    # Portfolio page view
    return render(request, 'website/portfolio.html')


def shop(request):
    # Shop page view
    return render(request, 'website/shop.html')


def about(request):
    # About page view
    return render(request, 'website/about.html')


def contact(request):
    # Contact page view
    return render(request, 'website/contact.html')