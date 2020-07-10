from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile

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

def generate_pdf(request):
    """Generate pdf."""
    # Model data
    workexp = WorkExperience.objects.order_by('-start_date')
    eduexp = EducationExperience.objects.order_by('-start_date')
    certs = Certification.objects.all
    skills = Skill.objects.all
    languages = Language.objects.all
    
    # Rendered
    html_string = render_to_string('about/pdf.html', {
        'workexp': workexp,
        'eduexp': eduexp,
        'certs': certs,
        'skills': skills,
        'languages': languages,
    })
    html = HTML(string=html_string, base_url=request.build_absolute_uri())
    doc = html.render()
    pdf = doc.write_pdf()

    # Creating http response
    response = HttpResponse(pdf, content_type='application/pdf;')
    #Download as attachment
    # response['Content-Disposition'] = 'attachment; filename=CV-{0}.pdf'.format("JHV-SoftwareDeveloper")
    # Display in browser
    response['Content-Disposition'] = 'inline; filename=list_people.pdf'
    
    # response['Content-Transfer-Encoding'] = 'binary'
    # with tempfile.NamedTemporaryFile(delete=True) as output:
    #     output.write(result)
    #     output.flush()
    #     output = open(output.name, 'r')
    #     response.write(output.read())

    return response