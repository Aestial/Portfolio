from django.contrib import admin

# Register your models here.
from .models import Card, Interactive, Instructions

class InteractiveInline(admin.StackedInline):
    model = Interactive

class InstructionsInline(admin.StackedInline):
    model = Instructions
    extra = 0

class CardAdmin(admin.ModelAdmin):
    inlines = [InstructionsInline]
    ordering = ['grade', 'index']

admin.site.register(Card, CardAdmin)
admin.site.register(Interactive)