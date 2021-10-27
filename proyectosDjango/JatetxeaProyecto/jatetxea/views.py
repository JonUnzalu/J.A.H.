from django.core import mail
from django.http import request
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from jatetxea.models import Janariak, Janarimota, Banatzailea
from datetime import datetime
from django.contrib.auth.hashers import make_password

# Create your views here.

def index(request):
    return render(request, "index.html",)

def janaria(request):
    janariak=Janariak.objects.all()
    janarimotak=Janarimota.objects.all()
    return render(request, "lista.html", {"janariak":janariak, "janarimotak":janarimotak})

def kontaktua(request):

    if request.method=="POST":

        email=EmailMessage(
            'Hello',
            'Body goes here',
            'juanitoelgolondrina2021@gmail.com',
            ['juanitoelgolondrina2021@gmail.com'],
            reply_to=['juanitoelgolondrina2021@gmail.com'],
            headers={'Message-ID': 'foo'},
        )

        try:
            email.send()
            #return redirect( "index.html",)
            return render(request, "index.html",)


        except:
            #return redirect( "bai.html",)
            return render(request, "bai.html",)

        #send_mail('Asunto','El mensaje',settings.EMAIL_HOST_USER,['chetos1616@gmail.com'])

    return render(request, "Contact.html",)

def saskia(request):
    return render(request, "saskia.html",)

def banatzailea(request):
    if request.method=="POST":
        nan=request.POST["nan"]
        izena=request.POST["izena"]
        abizena=request.POST["abizena"]
        telefonoa=request.POST["telefonoa"]
        banatzailea=Banatzailea(None,nan, izena, abizena, telefonoa)
        banatzailea.save()

        return HttpResponseRedirect("/redirect/")
         
    return render(request, "banatzailea.html",)

def redirect(request):
    return render(request, "index.html",)

def register(request):
    if request.method=="POST":
        izena=request.POST["name"]
        abizena=request.POST["surname"]
        email=request.POST["email"]
        username=request.POST["username"]
        password=request.POST["password"]


        erabiltzailea=User(None,make_password(password),None,0,username,izena,abizena,email,0,1,datetime.now())
        erabiltzailea.save()
        return render(request, "index.html",)

def login(request):
    if request.method=="POST":
        username=request.POST["username"]
        password=request.POST["password"]

        erabiltzailea= authenticate(username=username, password=password)

        if erabiltzailea is not None:
            return render(request, 'index.html')
        else:
            return render(request, 'login.html')

    return render(request, "login.html",)


