from django.shortcuts import render
from .models import WorkExperience, EducationExperience, Certification, Skill, Language

# Create your views here.
def about(request):
    workexp = WorkExperience.objects.order_by('-start_date')
    eduexp = EducationExperience.objects.order_by('-start_date')
    certs = Certification.objects.all
    skills = Skill.objects.all
    languages = Language.objects.all
    return render(request, 'about/about.html', 
    {
        'workexp': workexp,
        'eduexp': eduexp,
        'certs': certs,
        'skills': skills,
        'languages': languages,        
    })