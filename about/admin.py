from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin

# Register your models here.
from .models import WorkExperience, EducationExperience, Certification, Skill, Language

@admin.register(Skill)
class SkillAdmin(SortableAdminMixin, admin.ModelAdmin):
    pass

admin.site.register(WorkExperience)
admin.site.register(EducationExperience)
admin.site.register(Certification)
admin.site.register(Language)