from django.contrib import admin

from jatetxea.models import Banatzailea,Janariak


# Register your models here.
class BanatzaileaAdmin(admin.ModelAdmin):
    list_display=("izena","abizena")
    search_fields=("izena","abizena")

admin.site.register(Banatzailea,BanatzaileaAdmin)
admin.site.register(Janariak)


