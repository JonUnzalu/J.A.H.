from django.contrib import admin

from jatetxea.models import Repartidor, Janariak, Janarimota


# Register your models here.
class BanatzaileaAdmin(admin.ModelAdmin):
    list_display=("izena","abizena")
    search_fields=("izena","abizena")

admin.site.register(Repartidor,BanatzaileaAdmin)
admin.site.register(Janariak)
admin.site.register(Janarimota)


