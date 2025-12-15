from django import forms

class ConsultationForm(forms.Form):
    full_name = forms.CharField(max_length=100, label='Full name')
    phone = forms.CharField(max_length=30, label='Phone number')
    email = forms.EmailField(label='Email')
    service_requested = forms.CharField(max_length=200, label='Service requested')
    message = forms.CharField(widget=forms.Textarea, required=False, label='Message')
