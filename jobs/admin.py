from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin
# Register your models here.
from .models import Job, GalleryEmbed, GalleryImage

class JobEmbedInline(SortableInlineAdminMixin, admin.TabularInline):
    model = GalleryEmbed
    extra = 1

class JobImageInline(SortableInlineAdminMixin, admin.TabularInline):
    model = GalleryImage
    extra = 1

class JobAdmin(admin.ModelAdmin):
    inlines = [ JobImageInline, JobEmbedInline]
    ordering = ['-start_date']

admin.site.register(Job, JobAdmin)