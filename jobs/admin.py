from django.contrib import admin

# Register your models here.
from .models import Job, JobImage

class JobImageInline(admin.TabularInline):
    model = JobImage
    extra = 3

class JobAdmin(admin.ModelAdmin):
    inlines = [ JobImageInline, ]

admin.site.register(Job, JobAdmin)