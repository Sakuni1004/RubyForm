export async function submitForm(formData: FormData) {
    try {
      const res = await fetch('http://localhost:3001/api/v1/submit_form', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Unknown error occurred');
      }
  
      return { success: true, message: 'Form submitted successfully!' };
    } catch (error: any) {
      console.error('Error submitting form:', error);
      return { success: false, message: error.message || 'There was an error submitting the form.' };
    }
  }
  