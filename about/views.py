from django.shortcuts import render
from .models import WorkExperience, EducationExperience, Certification, Skill, Idiom

# Create your views here.
def about(request):
    workexp = WorkExperience.objects.order_by('-start_date')
    eduexp = EducationExperience.objects.order_by('-start_date')
    certs = Certification.objects.all
    skills = Skill.objects.all
    idioms = Idiom.objects.all
    return render(request, 'about/about.html', 
    {
        'workexp': workexp,
        'eduexp': eduexp,
        'certs': certs,
        'skills': skills,
        'idioms': idioms,        
    })