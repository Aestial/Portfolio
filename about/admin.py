from django.contrib import admin

# Register your models here.
from .models import WorkExperience, EducationExperience, Certification, Skill, Idiom
admin.site.register(WorkExperience)
admin.site.register(EducationExperience)
admin.site.register(Certification)
admin.site.register(Skill)
admin.site.register(Idiom)