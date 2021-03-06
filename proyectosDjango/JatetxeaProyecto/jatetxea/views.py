from django.core import mail
from django.http import request
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from jatetxea.models import Janariak, Janarimota, Repartidor, Saskia, Eskaera
from datetime import date, datetime
from django.contrib.auth.hashers import make_password
from django.template.loader import render_to_string
from JatetxeaProyecto.settings import EMAIL_HOST_USER
import json

# Create your views here.

def index(request):
    return render(request, "index.html",)

def janaria(request):
    janariak=Janariak.objects.all()
    janarimotak=Janarimota.objects.all()
    return render(request, "lista.html", {"janariak":janariak, "janarimotak":janarimotak})

def categoria(request, categoria_id):
    motak=Janarimota.objects.all()
    janariak=Janariak.objects.filter(janarimota=categoria_id)
    janarimotak=Janarimota.objects.filter(id=categoria_id)

    if janarimotak.count()>0:
        return render(request, "categoria.html", {"janariak":janariak, "janarimotak":janarimotak, "motak":motak})
    else:
        return HttpResponseRedirect("/janaria/")

def categoriaString(request, categoria):
    return HttpResponseRedirect("/janaria/")

def kontaktua(request):

    if request.method=="POST":
        nombre=request.POST["fname"]
        correo=request.POST["email"]
        telefono=request.POST["phone"]
        mensaje=request.POST["message"]

        email = EmailMessage(
            subject="J.A.H Contact",
            body=render_to_string( "email_template1.html",{"izena":nombre,"email":correo,"phone":telefono,"message":mensaje}),
            from_email=EMAIL_HOST_USER,
            to=[EMAIL_HOST_USER],
            reply_to=[EMAIL_HOST_USER],
        )

        try:
            email.content_subtype = "html"
            email.send()
            return render(request, "index.html",)


        except:
            return render(request, "bai.html",)

    return render(request, "Contact.html",)

def saskia(request):
    if request.method=="POST":    
        idjanaria=""
        codeskaera=""
        kopurua=""
        carrito=Saskia(None, idjanaria, codeskaera, kopurua)
        carrito.save()
        return render(request, "index.html",)

    return render(request, "saskia.html",)

def banatzailea(request):
    if request.method=="POST":
        nan=request.POST["nan"]
        izena=request.POST["izena"]
        abizena=request.POST["abizena"]
        telefonoa=request.POST["telefonoa"]
        urtebetetzea=request.POST["urtebetetzea"]
        banatzailea=Repartidor(None,nan, izena, abizena, telefonoa, urtebetetzea)
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

        #email
        mail = EmailMessage(
            subject="J.A.H Register",
            body=render_to_string( "email_template2.html",{"izena":izena,"abizena":abizena,"email":email,"password":password}),
            from_email=EMAIL_HOST_USER,
            to=[email],
            reply_to=[EMAIL_HOST_USER],
        )

        try:
            mail.content_subtype = "html"
            mail.send()


        except:
            return render(request, "bai.html",)
        #

        return render(request, "index.html")

    return render(request, "register.html")

def user_login(request):
    saskiItemArray = []

    if request.method=="POST":
        username=request.POST["username"]
        password=request.POST["password"]

        user= authenticate(request,username=username, password=password)

        if user is not None:
            login(request, user)

            janariak=Janariak.objects.all()
            janarimotak=Janarimota.objects.all()

            if Eskaera.objects.filter(bezeroErabiltzailea=username, baieztatua=0) is not None:
                eskaera=Eskaera.objects.filter(bezeroErabiltzailea=username, baieztatua=0)

                if eskaera.count() > 0:
                    idEskaera = eskaera[0].id
                    saskiItems = Saskia.objects.filter(codEskaera=idEskaera)
                    if saskiItems.count() >0:
                        for i in range(len(saskiItems)):
                            saskiItem = SaskiItem()
                            saskiItem.idJanaria = saskiItems[i].idJanaria
                            saskiItem.kopurua = saskiItems[i].kopurua

                            saskiItemArray.append(saskiItem)
                        return render(request, "index.html", {"saskiItems":saskiItemArray, "janariak":janariak, "janarimotak":janarimotak})
            
            return render(request, "index.html", {"janariak":janariak, "janarimotak":janarimotak})

        else:
            return render(request, 'login.html')   

    return render(request, "login.html",)

def user_logout(request):
    kopuruak = request.POST.get("kopuruakuwu")
    bezeroErabiltzailea=request.user.username

    if kopuruak != "[]":
        janarienLista = json.loads(kopuruak)
    
        eskaeraData = date.today()
        baieztatua = 0
        nanBanatzailea = "123456"
        prezioTotala = 0


        if Eskaera.objects.filter(bezeroErabiltzailea=bezeroErabiltzailea, baieztatua=0) is not None:
            eskaeraBusca=Eskaera.objects.filter(bezeroErabiltzailea=bezeroErabiltzailea, baieztatua=0)
            if eskaeraBusca.count() > 0:
                idEskaera = eskaeraBusca[0].id
                Saskia.objects.filter(codEskaera=idEskaera).delete()
                eskaeraBusca.delete()

        eskaera=Eskaera(None,bezeroErabiltzailea,eskaeraData ,baieztatua , prezioTotala, nanBanatzailea)
        eskaera.save()     
    
        idMetido=eskaera.id
        haGuardadoJanaris = 0
    
        if janarienLista is not None:
            for i in range(len(janarienLista)):
                saskiItem = Saskia(None, janarienLista[i]['idJanari'],idMetido, janarienLista[i]['kopurua'])
                saskiItem.save()
                haGuardadoJanaris = 1

            if(haGuardadoJanaris==0):
                eskaera.delete()

    else:
        eskaeraBusca=Eskaera.objects.filter(bezeroErabiltzailea=bezeroErabiltzailea, baieztatua=0)
        if eskaeraBusca is not None:
            if eskaeraBusca.count() > 0:
                idEskaera = eskaeraBusca[0].id
                Saskia.objects.filter(codEskaera=idEskaera).delete()
                eskaeraBusca.delete()

    logout(request)
    return HttpResponseRedirect("/redirect/")


def confirm_purchase(request):
    janariak=Janariak.objects.all()
    janarimotak=Janarimota.objects.all()

    kopuruak = request.POST.get("kopuruakuwu")
    bezeroErabiltzailea = request.user.username

    if kopuruak != "[]":
        janarienLista = json.loads(kopuruak)
        dineroTotal = 0.0

        for i in range(len(janarienLista)):
            precioUnidad = janarienLista[i]['prezioa']
            lenPrecio = len(precioUnidad)
            removeLast = precioUnidad[:lenPrecio-1]
            intpreciounidad = float(removeLast)

            cantidadUnidad = janarienLista[i]['kopurua']
            intcantidadunidad = int(cantidadUnidad)

            #Le quitamos el stock
            janariBusca = Janariak.objects.filter(id=int(janarienLista[i]['idJanari']))
            janariEncontrado = janariBusca[0]
            janariEncontrado.kopurua = int(janariEncontrado.kopurua) - intcantidadunidad
            janariEncontrado.save()

            precioTotal = intcantidadunidad * intpreciounidad

            dineroTotal = dineroTotal + precioTotal


        if Eskaera.objects.filter(bezeroErabiltzailea=bezeroErabiltzailea, baieztatua=0) is not None:
            eskaeraBusca=Eskaera.objects.filter(bezeroErabiltzailea=bezeroErabiltzailea, baieztatua=0)
            if eskaeraBusca.count() > 0:
                eskaeraEncontrado = eskaeraBusca[0]
                idEskaera = eskaeraEncontrado.id
                eskaeraEncontrado.baieztatua = 1
                eskaeraEncontrado.save()
                Saskia.objects.filter(codEskaera=idEskaera).delete()

            else:
                eskaeraNuevo=Eskaera(None,bezeroErabiltzailea,date.today() ,1 , 0, "123456")
                eskaeraNuevo.save() 

        email = EmailMessage(
            subject="J.A.H Erosketa",
            body=render_to_string("email_template3.html",{"kopuruak":janarienLista,"izena":bezeroErabiltzailea,"totala":dineroTotal}),
            from_email=EMAIL_HOST_USER,
            to=[EMAIL_HOST_USER],
            reply_to=[EMAIL_HOST_USER],
        )

        try:
            email.content_subtype = "html"
            email.send()

        except:
            aaaaa = "aaaa"

    return render(request, "index.html", {"janariak":janariak, "janarimotak":janarimotak})

class SaskiItem():
    def __init__(self):   # constructor function using self
        self.idJanaria = None  # variable using self.
        self.kopurua = None  # variable using self
