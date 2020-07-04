from django.contrib import admin

# Register your models here.
from .models import Job, JobEmbed, JobImage

class JobImageInline(admin.TabularInline):
    model = JobImage
    extra = 1

class JobEmbedInline(admin.TabularInline):
    model = JobEmbed
    extra = 1

class JobAdmin(admin.ModelAdmin):
    inlines = [ JobImageInline, JobEmbedInline]
    ordering = ['-start_date']

admin.site.register(Job, JobAdmin)