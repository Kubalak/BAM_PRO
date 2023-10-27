from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import UserForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate

def index(request):
    return HttpResponse("Hello there from index!")

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            email = request.POST.get('email')
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')

            # check password
            if password1 != password2:
                return JsonResponse({'error': 'Passwords do not match', 'status': 400})

            # check username
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username is already taken', 'status': 401})

            # Create the user
            user = User.objects.create_user(username=username, email=email, password=password1)
            return JsonResponse({'message': 'User registered successfully.', 'status': 200})
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request,user)
                return JsonResponse({'message':'User logged in sucessfully'})
            else:
                return JsonResponse({'error':'Invalid username or password'}, status=400)
        except Exception as e:
            return JsonResponse({'error':str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
                