from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin
# Register your models here.
from .models import Product, GalleryEmbed, GalleryImage

class ProductEmbedInline(SortableInlineAdminMixin, admin.StackedInline):
    model = GalleryEmbed
    extra = 1

class ProductImageInline(SortableInlineAdminMixin, admin.StackedInline):
    model = GalleryImage
    extra = 1

class ProductAdmin(admin.ModelAdmin):
    inlines = [ ProductEmbedInline, ProductImageInline ]
    ordering = ['-date']

admin.site.register(Product, ProductAdmin)