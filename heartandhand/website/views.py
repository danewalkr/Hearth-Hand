# Create your views here.

from django.shortcuts import render, redirect
from django.shortcuts import render


def home(request):
    # pass any context your templates need, e.g. an about list
    return render(request, 'website/home.html')